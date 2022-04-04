import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import MusicPlayer from './MusicPlayer'
import Button from '@mui/material/Button'
import CreateTaskModal from './CreateTaskModal'
import AddTrackToDate from './AddTrackToDate'
import { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import TaskList from './TaskList'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { IProject, ITask } from '../types'
import useAxios from '../hooks/useAxios'
import { notifyError } from '../hooks/useNotify'
import albumCover from '../assets/albumCover.jpeg'
import { useNavigate } from 'react-router-dom'


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

const fakeTasks = [
    { id: '1a', status: 'done', title: 'Drums for the base track', description: 'Planning on programming the drums at the desired temp: 127bpm. Will be done tomorrow.' },
    { id: '2b', status: 'doing', title: 'Acoustic guitars', description: 'Fast chords, avoid funking, crisp recording.' },
    { id: '3c', status: 'doing', title: 'Bass', description: 'Double bass to go with the fast drums, make sure the mic picks up the lows.' },
    { id: '4d', status: 'todo', title: 'Record live drums once basic instrumentation is done', description: 'Book studio time, have two people at least to set up mics, etc.' }
]

interface IProps {
    project: IProject
}

export default function ProjectWorkspace({ project }: IProps) {
    const navigate = useNavigate()
    const { axiosRequest } = useAxios()
    const [openCompleteProject, setOpenCompleteProject] = useState(false)
    const handleOpenCompleteProject = () => setOpenCompleteProject(true)
    const handleCloseCompleteProject = () => setOpenCompleteProject(false)
    const [openLeaveProject, setOpenLeaveProject] = useState(false)
    const handleOpenLeaveProject = () => setOpenLeaveProject(true)
    const handleCloseLeaveProject = () => setOpenLeaveProject(false)

    const [toDoTasks, setToDoTasks] = useState<ITask[]>([])
    const [doingTasks, setDoingTasks] = useState<ITask[]>([])
    const [doneTasks, setDoneTasks] = useState<ITask[]>([])

    const handleEditTaskStatus = async (taskId: string, newStatus: string) => {
        const response = await axiosRequest(`/projects/${project._id}/tasks/${taskId}/drag`, 'PUT', { status: newStatus })
        if (response.status === 200) {
            fetchProjectTasks()
        } else {
            notifyError('Something went wrong :(')
        }
    }

    const onDragEnd = async (result: DropResult) => {
        const { source, destination } = result
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        let add,
            todos = toDoTasks,
            doing = doingTasks,
            done = doneTasks;
        if (source.droppableId === 'TodoList') {
            add = todos[source.index]
            todos.splice(source.index, 1)
        } else if (source.droppableId === 'DoingList') {
            add = doing[source.index]
            doing.splice(source.index, 1)
        } else {
            add = done[source.index]
            done.splice(source.index, 1)
        }
        if (destination.droppableId === 'TodoList') {
            todos.splice(destination.index, 0, add)
            const draggedTask = todos.find(({ _id }) => _id === result.draggableId)
            draggedTask && handleEditTaskStatus(draggedTask._id, 'todo')
        } else if (destination.droppableId === 'DoingList') {
            doing.splice(destination.index, 0, add)
            const draggedTask = doing.find(({ _id }) => _id === result.draggableId)
            draggedTask && handleEditTaskStatus(draggedTask._id, 'doing')
        } else {
            done.splice(destination.index, 0, add)
            const draggedTask = done.find(({ _id }) => _id === result.draggableId)
            draggedTask && handleEditTaskStatus(draggedTask._id, 'done')
        }
    }

    const fetchProjectTasks = async () => {
        const response = await axiosRequest(`/projects/${project._id}/tasks`, 'GET')
        const projectTasks: ITask[] = response.data
        setToDoTasks(projectTasks ? projectTasks.filter(task => task.status === 'todo') : [])
        setDoingTasks(projectTasks ? projectTasks.filter(task => task.status === 'doing') : [])
        setDoneTasks(projectTasks ? projectTasks.filter(task => task.status === 'done') : [])
    }

    useEffect(() => {
        fetchProjectTasks()
    }, [])

    const handleCompleteProject = async () => {
        const response = await axiosRequest(`/projects/${project._id}/complete-project`, 'POST')
        if (response.status === 403) notifyError('Only a project leader can complete a project.')
        if (response.status === 400 || response.status === 404 || response.status === 401) notifyError('Something went wrong.')
        if (response.status === 200 && project.trackToDate?.audiofile && project.trackCover?.image) {
            const sendTrackToBands = await axiosRequest(`/projects/${project._id}/send-track-to-band`, 'POST')
            if (sendTrackToBands.status === 403) notifyError('Only a project leader can complete a project.')
        }
        navigate('/')
    }

    const handleLeaveProject = async () => {
        const response = await axiosRequest(`/projects/${project._id}/leave-project`, 'DELETE')
        if (response.status === 400 || response.status === 404 || response.status === 401) notifyError('Something went wrong.')
        navigate('/')
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Grid container spacing={2} sx={{ height: '80%' }}>
                <Grid item xs={12} sm={6} md={3}  >
                    <TaskList droppableId={'TodoList'} listTitle={'To Do'} icon={<CreateTaskModal fetcherFunction={fetchProjectTasks} />} tasks={toDoTasks} setterFunction={setToDoTasks} />

                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                    <TaskList droppableId={'DoingList'} listTitle={'Doing'} icon={<FastForwardOutlinedIcon fontSize='large' sx={{ ml: 1, mt: 1 }} />} tasks={doingTasks} setterFunction={setDoingTasks} />

                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                    <TaskList droppableId={'DoneList'} listTitle={'Done'} icon={<DoneOutlinedIcon fontSize='large' sx={{ ml: 1, mt: 1 }} />} tasks={doneTasks} setterFunction={setDoneTasks} />

                </Grid>
                <Grid item xs={12} sm={6} md={3} >
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Typography variant='h5' pt={1.25}>Track So Far</Typography> <BarChartOutlinedIcon fontSize='large' sx={{ ml: 1, my: 1.25 }} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: -2 }}>
                        {project.trackToDate && <MusicPlayer trackToDate={project.trackToDate.audiofile} trackCover={project.trackCover ? project.trackCover.image : albumCover} projectBands={project.bands} trackName={project.title} />}
                        <AddTrackToDate trackName={project.title} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3} mt={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                        <Button variant='outlined' size='large' color='error' onClick={handleOpenLeaveProject}>LEAVE PROJECT</Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={openLeaveProject}
                            onClose={handleCloseLeaveProject}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{ timeout: 500 }}
                        >
                            <Box sx={modalStyle}>
                                <Typography sx={{ my: 1 }} id="transition-modal-title" variant="h4" component="h3">Leave Project</Typography>
                                <Typography sx={{ my: 1 }} variant='h6' component='h4'>Are you sure you want to leave this project?</Typography>
                                <Typography sx={{ my: 1 }} variant='body1' component='p'>Once you do, you won't be able to contribute or see its progress.</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                    <Button color='success' variant='contained' onClick={handleLeaveProject}>Leave Project</Button>
                                    <Button color='warning' variant='outlined' type='submit' onClick={handleCloseLeaveProject}>Cancel</Button>
                                </Box>
                            </Box>
                        </Modal>

                        <Button variant='contained' size='large' color='success' onClick={handleOpenCompleteProject}>COMPLETE PROJECT</Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={openCompleteProject}
                            onClose={handleCloseCompleteProject}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{ timeout: 500 }}
                        >
                            <Box sx={modalStyle}>
                                <Typography sx={{ my: 1 }} id="transition-modal-title" variant="h4" component="h3">Complete Project And Send Final Track</Typography>
                                <Typography sx={{ my: 1 }} variant='h6' component='h4'>Are you sure you want to complete this project?</Typography>
                                <Typography sx={{ my: 1 }} variant='body1' component='p'>Once you do, it will no longer be active and the current "Track So Far" will be sent to the project's bands.</Typography>
                                <Typography sx={{ my: 1 }} variant='body2' component='p'>The song won't be automatically published, but it will be available for the band admins to release.</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                    <Button color='success' variant='contained' onClick={handleCompleteProject}>Complete Project</Button>
                                    <Button color='warning' variant='outlined' type='submit' onClick={handleCloseCompleteProject}>Cancel</Button>
                                </Box>
                            </Box>
                        </Modal>
                    </Box>
                </Grid>
            </Grid>
        </DragDropContext>
    )
}