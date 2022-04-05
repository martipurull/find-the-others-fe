import Button from '@mui/material/Button'
import { ChangeEvent, FormEvent, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { CalendarPicker } from '@mui/lab'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'
import { Theme, useTheme } from '@mui/material/styles'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import useAxios from '../hooks/useAxios'
import { IInitialState, IProject, IProjectDetails } from '../types'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { notifyError } from '../hooks/useNotify'

function addSelectedStyle(name: string, collaborators: string[], theme: Theme) {
    return { fontWeight: collaborators.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightBold }
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    maxHeight: '85%',
    overflow: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}

interface IProps {
    project: IProject
}

export default function EditProject({ project }: IProps) {
    const { axiosRequest } = useAxios()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const theme = useTheme()
    const loggedUser = useSelector((state: IInitialState) => state.user.currentUser)
    const [collaboratorId, setCollaboratorId] = useState<string[]>([])
    const [userBandId, setUserBandId] = useState<string[]>([])
    const [adminId, setAdminId] = useState<string[]>([])
    const [dateValue, setDateValue] = useState<Date | null>(new Date())
    const [projectImgFile, setProjectImgFile] = useState<File>()
    const [imgPreview, setImgPreview] = useState<string>('')

    const projectMemberIds = project.members.map(member => member._id)
    const projectBandIds = project.bands.map(band => band._id)

    const [projectDetails, setProjectDetails] = useState<IProjectDetails>({
        title: project.title || '',
        projectAdminIds: project.projectAdmins || adminId,
        memberIds: projectMemberIds || collaboratorId,
        bandIds: projectBandIds || userBandId,
        description: project.description || '',
        dueDate: project.dueDate || dateValue
    })

    const handleInput = (field: string, value: string) => {
        setProjectDetails(details => ({
            ...details,
            [field]: value
        }))
    }

    const handleProjectImgUpload = (e: ChangeEvent<HTMLInputElement>) => {
        setProjectImgFile(e.target.files![0])
        const imgUrl = URL.createObjectURL(e.target.files![0])
        setImgPreview(imgUrl)
    }

    const handleRemoveProjectImg = () => {
        setProjectImgFile(undefined)
        URL.revokeObjectURL(imgPreview)
        setImgPreview('')
    }

    const handleChangeBands = (e: SelectChangeEvent<typeof userBandId>) => {
        const { target: { value } } = e
        setUserBandId(typeof value === 'string' ? value.split(',') : value)
    }

    const handleChangeCollaborators = (event: SelectChangeEvent<typeof collaboratorId>) => {
        const { target: { value } } = event
        setCollaboratorId(typeof value === 'string' ? value.split(',') : value)
    }

    const handleChangeAdmins = (event: SelectChangeEvent<typeof adminId>) => {
        const { target: { value } } = event
        setAdminId(typeof value === 'string' ? value.split(',') : value)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const dataToAxios = new FormData()
        dataToAxios.append('title', projectDetails.title)
        dataToAxios.append('description', projectDetails.description)
        dataToAxios.append('projectAdminIds', JSON.stringify(projectDetails.projectAdminIds))
        dataToAxios.append('memberIds', JSON.stringify(projectDetails.memberIds))
        dataToAxios.append('bandIds', JSON.stringify(projectDetails.bandIds))
        projectImgFile && dataToAxios.append('projectImage', projectImgFile)
        const response = await axiosRequest('projects', 'PUT', dataToAxios)
        if (response.status === 403) notifyError('Only a project leader can edit a project.')
        if (response.status === 200) {
            handleClose()
        } else {
            notifyError('Something went wrong, please try again.')
        }
    }

    return (
        <Box sx={{ mx: 1 }}>
            <Button sx={{ mr: 2 }} variant='outlined' endIcon={<EditOutlinedIcon />} onClick={handleOpen}>Edit Project</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Box component='form' noValidate autoComplete='off' sx={modalStyle}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <TextField sx={{ my: 1 }} required label='Project Title' variant='standard' value={projectDetails.title} onChange={e => handleInput('title', e.target.value)} />
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id='multiple-bands-select'>Project Bands</InputLabel>
                            <Select labelId='multiple-bands-select' id='multiple-bands-input' multiple value={userBandId} onChange={handleChangeBands} input={<OutlinedInput label='Project bands' />}>
                                {loggedUser?.memberOf.map((band) => (
                                    <MenuItem key={band._id} value={band._id} style={addSelectedStyle(band.name, userBandId, theme)}>{band.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id='multiple-admins-select'>Project Admins</InputLabel>
                            <Select labelId='multiple-admins-select' id='multiple-admins-input' multiple value={adminId} onChange={handleChangeAdmins} input={<OutlinedInput label='Project Admins' />}>
                                {loggedUser?.connections.map((connection) => (
                                    <MenuItem key={connection._id} value={connection._id} style={addSelectedStyle(`${connection.firstName} ${connection.lastName}`, adminId, theme)}>{connection.firstName} {connection.lastName}</MenuItem>
                                ))}
                            </Select>
                            <Typography variant='caption'>by creating the project, you will be one of its admins</Typography>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id='multiple-collaborators-select'>Project Collaborators</InputLabel>
                            <Select labelId='multiple-collaborators-select' id='multiple-collaborators-input' multiple value={collaboratorId} onChange={handleChangeCollaborators} input={<OutlinedInput label='Project Collaborators' />}>
                                {loggedUser?.connections.map((connection) => (
                                    <MenuItem key={connection._id} value={connection._id} style={addSelectedStyle(`${connection.firstName} ${connection.lastName}`, collaboratorId, theme)}>{connection.firstName} {connection.lastName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField fullWidth id="new-project-description" label="Project Description" multiline rows={6} placeholder='Write down the main ideas for the project: make it exciting for your collaborators!' value={projectDetails.description} onChange={e => handleInput('description', e.target.value)} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            {
                                !projectImgFile &&
                                <Button variant='contained' sx={{ p: 1.25 }} component='label'>
                                    Add Project Photo
                                            <input type="file" hidden onChange={e => handleProjectImgUpload(e)} />
                                </Button>
                            }
                            {
                                projectImgFile
                                    ?
                                    <Box sx={{ position: 'relative' }}>
                                        <IconButton sx={{ position: 'absolute', left: '85%', top: '-3%' }} onClick={handleRemoveProjectImg} ><HighlightOffSharpIcon /></IconButton>
                                        <Box component='img' src={imgPreview} sx={{ ml: 2, maxWidth: '250px', objectFit: 'cover', borderRadius: '5px' }} />
                                    </Box>
                                    :
                                    <Box><InsertPhotoIcon sx={{ fontSize: 150 }} /></Box>
                            }
                        </Box>
                        <Box sx={{ display: 'flex', direction: 'column' }}>
                            <Stack spacing={10}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    {/* <DatePicker views={['day', 'month', 'year']} label='Project Due Date' value={dateValue} onChange={(newValue) => setDateValue(newValue)} renderInput={(params) => <TextField {...params} helperText={null} />} /> */}
                                    <CalendarPicker date={dateValue} onChange={(newValue) => setDateValue(newValue)} />
                                </LocalizationProvider>
                            </Stack>
                        </Box>
                        <TextField sx={{ my: 1 }} id="new-project-description" label="Project Description" multiline rows={6} placeholder='Write down the main ideas for the project: make it exciting for your collaborators!' />
                        <Box sx={{ mt: 2 }}>
                            <Button variant='contained' color='success' fullWidth type='submit' onClick={handleSubmit}>Edit Project</Button>
                            <Button variant='contained' color='warning' fullWidth onClick={handleClose}>Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}