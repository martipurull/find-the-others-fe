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
import { useState } from 'react'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import TaskList from './TaskList'
import { ITask } from './TaskList'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

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

export default function ProjectWorkspace() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [toDoTasks, setToDoTasks] = useState<ITask[]>(fakeTasks.filter(task => task.status === 'todo'))
    const [doingTasks, setDoingTasks] = useState<ITask[]>(fakeTasks.filter(task => task.status === 'doing'))
    const [doneTasks, setDoneTasks] = useState<ITask[]>(fakeTasks.filter(task => task.status === 'done'))


    //add to onDragEnd: fetch to change status of task based on which TaskList it sits
    const onDragEnd = (result: DropResult) => {
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
        } else if (destination.droppableId === 'DoingList') {
            doing.splice(destination.index, 0, add)
        } else {
            done.splice(destination.index, 0, add)
        }
        setToDoTasks(todos)
        setDoingTasks(doing)
        setDoneTasks(done)
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Grid item xs={12} sm={6} md={3} spacing={2} >
                <TaskList droppableId={'TodoList'} listTitle={'To Do'} icon={<CreateTaskModal />} tasks={toDoTasks} setterFunction={setToDoTasks} />

            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={2}>
                <TaskList droppableId={'DoingList'} listTitle={'Doing'} icon={<FastForwardOutlinedIcon fontSize='large' sx={{ ml: 1, mt: 1 }} />} tasks={doingTasks} setterFunction={setDoingTasks} />

            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={2}>
                <TaskList droppableId={'DoneList'} listTitle={'Done'} icon={<DoneOutlinedIcon fontSize='large' sx={{ ml: 1, mt: 1 }} />} tasks={doneTasks} setterFunction={setDoneTasks} />

            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography variant='h5' pt={1.25}>Track So Far</Typography> <BarChartOutlinedIcon fontSize='large' sx={{ ml: 1, my: 1.25 }} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: -2 }}>
                    <MusicPlayer />
                    <AddTrackToDate />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={2} mt={3}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                    <Button variant='outlined' size='large' color='error'>LEAVE PROJECT</Button>
                    <Button variant='contained' size='large' color='success' onClick={handleOpen}>COMPLETE PROJECT</Button>

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
                            <Typography sx={{ my: 1 }} id="transition-modal-title" variant="h4" component="h3">Complete Project And Send Final Track</Typography>
                            <Typography sx={{ my: 1 }} variant='h6' component='h4'>Are you sure you want to complete this project?</Typography>
                            <Typography sx={{ my: 1 }} variant='body1' component='p'>Once you do, it will no longer be active and the current "Track So Far" will be sent to the project's bands.</Typography>
                            <Typography sx={{ my: 1 }} variant='body2' component='p'>The song won't be automatically published, but it will be available for the band admins to release.</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                <Button color='success' variant='contained' onClick={handleClose}>Complete Project</Button>
                                <Button color='warning' variant='outlined' type='submit' onClick={handleClose}>Cancel</Button>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            </Grid>
        </DragDropContext>
    )
}