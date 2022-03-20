import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import WAvatar from '../assets/WAvatar.jpeg'
import MAvatar from '../assets/MAvatar.jpeg'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import MusicPlayer from './MusicPlayer'
import Button from '@mui/material/Button'
import EditTaskModal from './EditTaskModal'
import CreateTaskModal from './CreateTaskModal'
import AddTrackToDate from './AddTrackToDate'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import { useState } from 'react'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'

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

export default function ProjectCards() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <Grid item xs={12} sm={6} md={3} spacing={2} >
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography variant='h5' pt={1.25}>To Do</Typography>
                    <CreateTaskModal />
                    {/* <IconButton size='small' sx={{ mb: 0.75, px: 1 }}><AddOutlinedIcon fontSize='large' /></IconButton> */}
                </Box>
                {/* MAP THROUGH TO-DO TASKS HERE */}
                <Card sx={{ minWidth: 200, maxWidth: 300, my: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6'>Task Title</Typography>
                            <Avatar src={MAvatar} />
                        </Box>
                        <Typography variant='body2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab vero excepturi saepe at soluta quisquam, expedita optio fuga.</Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <EditTaskModal />
                        <IconButton size='small'><DeleteOutlineIcon /></IconButton>
                    </CardActions>
                </Card>
                <Card sx={{ minWidth: 200, maxWidth: 300, my: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6'>Task Title</Typography>
                            <Avatar src={WAvatar} />
                        </Box>
                        <Typography variant='body2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab vero excepturi saepe at soluta quisquam, expedita optio fuga.</Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <EditTaskModal />
                        <IconButton size='small'><DeleteOutlineIcon /></IconButton>
                    </CardActions>
                </Card>
                <Card sx={{ minWidth: 200, maxWidth: 300, my: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6'>Task Title</Typography>
                            <Avatar src={WAvatar} />
                        </Box>
                        <Typography variant='body2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab vero excepturi saepe at soluta quisquam, expedita optio fuga.</Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <EditTaskModal />
                        <IconButton size='small'><DeleteOutlineIcon /></IconButton>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography variant='h5' pt={1.25}>In Progress</Typography>
                    <IconButton sx={{ px: 1 }}><FastForwardOutlinedIcon fontSize='large' /></IconButton>
                </Box>
                {/* MAP THROUGH IN PROGRESS TASKS HERE */}
                <Card sx={{ minWidth: 200, maxWidth: 300, my: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6'>Task Title</Typography>
                            <Avatar src={MAvatar} />
                        </Box>
                        <Typography variant='body2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab vero excepturi saepe at soluta quisquam, expedita optio fuga.</Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <EditTaskModal />
                        <IconButton size='small'><DeleteOutlineIcon /></IconButton>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography variant='h5' pt={1.25}>Done</Typography>
                    <IconButton sx={{ px: 1 }}><DoneOutlinedIcon fontSize='large' /></IconButton>
                </Box>
                {/* MAP THROUGH DONE TASKS HERE */}
                <Card sx={{ minWidth: 200, maxWidth: 300, my: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6'>Task Title</Typography>
                            <Avatar src={WAvatar} />
                        </Box>
                        <Typography variant='body2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab vero excepturi saepe at soluta quisquam, expedita optio fuga.</Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <EditTaskModal />
                        <IconButton size='small'><DeleteOutlineIcon /></IconButton>
                    </CardActions>
                </Card>
                <Card sx={{ minWidth: 200, maxWidth: 300, my: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6'>Task Title</Typography>
                            <Avatar src={MAvatar} />
                        </Box>
                        <Typography variant='body2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab vero excepturi saepe at soluta quisquam, expedita optio fuga.</Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <EditTaskModal />
                        <IconButton size='small'><DeleteOutlineIcon /></IconButton>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                    <Typography variant='h5' pl={2} pt={1.25}>Track So Far</Typography>
                    <IconButton sx={{ px: 1 }}><BarChartOutlinedIcon fontSize='large' /></IconButton>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        </>
    )
}
