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
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import MusicPlayer from './MusicPlayer'
import Button from '@mui/material/Button'
import EditTaskModal from './EditTaskModal'
import CreateTaskModal from './CreateTaskModal'

export default function ProjectCards() {




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
                    <Typography variant='h5' pl={2} pt={1.25}>Mixed Track</Typography>
                    <IconButton sx={{ px: 1 }}><BarChartOutlinedIcon fontSize='large' /></IconButton>
                </Box>
                <MusicPlayer />
            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={2} mt={3}>
                <Button variant='outlined' size='large' color='error'>LEAVE PROJECT</Button>
            </Grid>
        </>
    )
}
