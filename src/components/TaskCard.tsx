import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import CardActions from '@mui/material/CardActions'
import NotesIcon from '@mui/icons-material/Notes'
import Paper from '@mui/material/Paper'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import EditTaskModal from './EditTaskModal'
import MAvatar from '../assets/MAvatar.jpeg'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Draggable } from 'react-beautiful-dnd'
import { IInitialState, ITask } from '../types'
import MusicMiniPlayer from './MusicMiniPlayer'
import { KeyboardEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import { notifyError, notifySuccess } from '../hooks/useNotify'
import useAxios from '../hooks/useAxios'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'

const ariaLabel = { 'aria-label': 'description' }

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

interface IProps {
    task: ITask,
    index: number
}

export default function TaskCard({ task, index }: IProps) {
    const [isAddingNotes, setIsAddingNotes] = useState(false)
    const { axiosRequest } = useAxios()
    const loggedUser = useSelector((state: IInitialState) => state.user.currentUser)
    const currentProject = useSelector((state: IInitialState) => state.userProjects.currentProject)
    const [noteText, setNoteText] = useState('')
    const [editNote, setEditNote] = useState(false)
    const [editedNoteText, setEditedNoteText] = useState('')
    const [openDeleteTask, setOpenDeleteTask] = useState(false)

    const handleOpenDeleteTask = () => {
        setOpenDeleteTask(true)
    }
    const handleCloseDeleteTask = () => {
        setOpenDeleteTask(false)
    }

    const handleDeleteTask = async (taskId: string) => {
        const response = await axiosRequest(`/projects/${currentProject?._id}/tasks/${taskId}`, 'DELETE')
        if (response.status === 400 || response.status === 404 || response.status === 401) notifyError('Something went wrong!')
        if (response.status === 403) notifyError("You cannot delete somebody else's task unless you're a project admin.")
        if (response.status === 200) {
            notifySuccess('Task deleted.')
        }
    }

    const handlePostNote = async (e: KeyboardEvent, taskId: string) => {
        if (e.key === 'Enter') {
            const response = await axiosRequest(`/projects/${currentProject?._id}/tasks/${taskId}/notes`, 'POST', { text: noteText })
            if (response.status === 400 || response.status === 404 || response.status === 401) {
                notifyError('Something went wrong!')
            }
            if (response.status === 200) {
                notifySuccess('Note posted.')
                setNoteText('')
            }
        }
    }

    const handleEditNote = async (e: KeyboardEvent, taskId: string, noteId: string) => {
        if (e.key === 'Enter') {
            const response = await axiosRequest(`/projects/${currentProject?._id}/tasks/${taskId}/notes/${noteId}`, 'PUT', { text: editedNoteText })
            if (response.status === 400 || response.status === 404 || response.status === 401) notifyError('Something went wrong!')
            if (response.status === 403) notifyError("You cannot edit somebody else's note.")
            if (response.status === 200) {
                notifySuccess('Note edited.')
                setNoteText('')
            }
        }
    }

    const handleDeleteNote = async (taskId: string, noteId: string) => {
        const response = await axiosRequest(`/projects/${currentProject?._id}/tasks/${taskId}/notes/${noteId}`, 'DELETE')
        if (response.status === 400 || response.status === 404 || response.status === 401) notifyError('Something went wrong!')
        if (response.status === 403) notifyError("You cannot delete somebody else's note.")
        if (response.status === 200) {
            notifySuccess('Note deleted.')
            setNoteText('')
        }
    }

    return (
        <Draggable draggableId={task._id} index={index}>
            {(provided, snapshot) => (
                <Card
                    sx={{ minWidth: 200, maxWidth: 300, my: 2, ml: -1, boxShadow: `${snapshot.isDragging && '0 0 20px rgba(229,242,255,0.25)'}` }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography mb={2} variant='h6'>{task.title}</Typography>
                            {
                                task.musicians.map(musician => (
                                    <Avatar src={musician.avatar} />
                                ))
                            }
                        </Box>
                        <Typography variant='body2'>{task.description}</Typography>
                        {
                            task.notes &&
                            <Box>
                                <Typography variant='subtitle1' sx={{ mt: 2 }}>Notes</Typography>
                                <Button sx={{ my: 1, display: 'flex', justifyContent: 'space-around' }} size='medium' variant='outlined' color='primary' endIcon={<NotesIcon />} onClick={() => setIsAddingNotes(!isAddingNotes)}>Add a note</Button>
                                {
                                    isAddingNotes &&
                                    <Paper elevation={3} square sx={{ display: 'flex', py: 2, px: 1, mb: 1.5, justifyContent: 'space-around', bgcolor: 'rgba(0,0,0,1)' }}>
                                        <Avatar alt='user avatar' src={loggedUser?.avatar} sx={{ mt: 1 }} />
                                        <Input multiline placeholder='Add a note' inputProps={ariaLabel} value={noteText} onChange={e => setNoteText(e.target.value)} onKeyPress={(e) => handlePostNote(e, task._id)} />
                                    </Paper>
                                }
                                {
                                    task.notes.map(note => (
                                        <Paper elevation={3} square sx={{ display: 'flex', py: 2, px: 1, mb: 1.5, justifyContent: 'space-around', bgcolor: 'rgba(0,0,0,1)' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Avatar alt='user avatar' src={note.sender.avatar} sx={{ mt: 1 }} />
                                                <Typography variant='body2'>{note.sender.firstName} {note.sender.lastName}</Typography>
                                                {
                                                    editNote && note.sender._id === loggedUser?._id ?
                                                        <Input multiline inputProps={ariaLabel} value={note.text} onChange={e => setEditedNoteText(e.target.value)} onKeyPress={(e) => handleEditNote(e, task._id, note._id)} />
                                                        :
                                                        <Typography variant='body1'>{note.text}</Typography>
                                                }
                                            </Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <IconButton size='small' onClick={() => setEditNote(true)}><EditOutlinedIcon /></IconButton>
                                                    <IconButton size='small' onClick={() => handleDeleteNote(task._id, note._id)}><DeleteOutlineIcon /></IconButton>
                                                </Box>
                                            </Box>
                                        </Paper>
                                    ))
                                }
                            </Box>
                        }
                        {
                            task.audioFile &&
                            <Box>
                                <Typography variant='subtitle1'>Uploaded Task Track</Typography>
                                <MusicMiniPlayer audioFile={task.audioFile} />
                            </Box>
                        }
                    </CardContent>
                    {
                        task.musicians.map(({ _id }) => _id).includes(loggedUser!._id) &&
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <EditTaskModal task={task} />
                            {/* ADD DELETE TASK FUNCTIONALITY!!!! WITH WARNING MODAL!!!!!!! */}
                            <IconButton size='small' onClick={handleOpenDeleteTask}><DeleteOutlineIcon /></IconButton>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={openDeleteTask}
                                onClose={handleCloseDeleteTask}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{ timeout: 500 }}
                            >
                                <Box sx={modalStyle}>
                                    <Typography sx={{ my: 1 }} id="transition-modal-title" variant="h4" component="h3">Delete Task?</Typography>
                                    <Typography sx={{ my: 1 }} variant='h6' component='h4'>Are you sure you want to delete this task?</Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                        <Button color='error' variant='contained' onClick={() => handleDeleteTask(task._id)}>Delete Task</Button>
                                        <Button color='warning' variant='outlined' onClick={handleCloseDeleteTask}>Cancel</Button>
                                    </Box>
                                </Box>
                            </Modal>
                        </CardActions>
                    }
                </Card>
            )}
        </Draggable>
    )
}
