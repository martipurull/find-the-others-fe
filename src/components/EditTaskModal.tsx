import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Theme, useTheme } from '@mui/material/styles'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import { ChangeEvent, FormEvent, useState } from 'react'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import WAvatar from '../assets/WAvatar.jpeg'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import { ITaskDetails, IInitialState, ITask } from '../types'
import { useSelector } from 'react-redux'
import useAxios from '../hooks/useAxios'
import { notifyError, notifySuccess } from '../hooks/useNotify'
import MusicMiniPlayer from './MusicMiniPlayer'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}

function addSelectedStyle(name: string, collaborators: string[], theme: Theme) {
    return { fontWeight: collaborators.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightBold }
}

interface IProps {
    task: ITask
}

export default function EditTaskModal({ task }: IProps) {
    const { axiosRequest } = useAxios()
    const currentProject = useSelector((state: IInitialState) => state.userProjects.currentProject)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const theme = useTheme()
    const [musicianId, setMusicianId] = useState<string[]>([])
    const [selectedStatus, setSelectedStatus] = useState('todo')
    const statuses = ['todo', 'doing', 'done']
    const [taskAudioFile, setTaskAudioFile] = useState<File>()
    const [audioPreview, setAudioPreview] = useState<string>('')

    const musicianIds = task.musicians.map(({ _id }) => _id)

    const [taskDetails, setTaskDetails] = useState<ITaskDetails>({
        title: task.title || '',
        description: task.description || '',
        musicians: musicianIds || musicianId,
        status: task.status || selectedStatus
    })

    const handleInput = (field: string, value: string) => {
        setTaskDetails(details => ({
            ...details,
            [field]: value
        }))
    }

    const handleTaskAudioUpload = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskAudioFile(e.target.files![0])
        const imgUrl = URL.createObjectURL(e.target.files![0])
        setAudioPreview(imgUrl)
    }

    const handleRemoveTaskAudio = () => {
        setTaskAudioFile(undefined)
        URL.revokeObjectURL(audioPreview)
        setAudioPreview('')
    }

    const handleChangeMembers = (event: SelectChangeEvent<typeof musicianId>) => {
        const { target: { value } } = event
        setMusicianId(typeof value === 'string' ? value.split(',') : value)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const dataToAxios = new FormData()
        dataToAxios.append('title', taskDetails.title)
        taskDetails.description && dataToAxios.append('description', taskDetails.description)
        for (let i = 0; i < taskDetails.musicians.length; i++) {
            dataToAxios.append('musicians[]', taskDetails.musicians[i])
        }
        taskAudioFile && dataToAxios.append('audioFile', taskAudioFile)

        const response = await axiosRequest(`/projects/${currentProject?._id}/tasks/${task._id}`, 'PUT', dataToAxios)
        if (response.status === 403) notifyError("You cannot edit someone else's task")
        if (response.status === 200) {
            notifySuccess('Task edited!')
        } else {
            notifyError('Something went wrong, please try again.')
        }
    }

    return (
        <>
            <Button size='small' variant='outlined' onClick={handleOpen}>Details <KeyboardArrowUpOutlinedIcon sx={{ ml: 0.5, pb: 0.25 }} /></Button>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Box sx={modalStyle}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">Task Details</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <TextField sx={{ my: 1 }} label='Title' variant='standard' placeholder='Enter task title' value={taskDetails.title} onChange={e => handleInput('title', e.target.value)} />
                        <TextField sx={{ my: 1 }} label='Description' variant='standard' multiline rows={4} placeholder='briefly describe the task' value={taskDetails.description} onChange={e => handleInput('description', e.target.value)} />
                        <FormControl sx={{ my: 1 }}>
                            <InputLabel id='multiple-members-select'>Tasked Musicians</InputLabel>
                            <Select labelId='multiple-members-select' id='multiple-members-input' multiple value={musicianId} onChange={handleChangeMembers} input={<OutlinedInput label='Tasked Musicians' />}>
                                {currentProject?.members.map((member) => (
                                    <MenuItem key={member._id} value={member._id} style={addSelectedStyle(`${member.firstName} ${member.lastName}`, musicianId, theme)}>{`${member.firstName} ${member.lastName}`}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl required variant='standard' sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id='status-select'>Gig Instrument</InputLabel>
                            <Select labelId='status-select' id='status-select' value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                {statuses.map((status, i) => (
                                    <MenuItem key={i} value={status}>{status}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {
                            taskAudioFile ?
                                <Box>
                                    <MusicMiniPlayer audioFile={audioPreview} />
                                    <Button size='small' variant='contained' color='error' onClick={handleRemoveTaskAudio} endIcon={HighlightOffSharpIcon}>Remove Task Audio</Button>
                                </Box>
                                :
                                <Button sx={{ my: 1, display: 'flex', justifyContent: 'space-around' }} size='medium' variant='outlined' color='success' endIcon={<AudiotrackIcon />}>
                                    Add Audio
                                    <input type="file" onChange={e => handleTaskAudioUpload(e)} />
                                </Button>
                        }
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                        <Button color='success' variant='outlined' type='submit' onClick={handleSubmit}>Edit Task</Button>
                        <Button color='warning' variant='outlined' onClick={handleClose}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}
