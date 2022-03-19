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
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import MusicPlayer from './MusicPlayer'
import { Button } from '@mui/material'
import { useState } from 'react'
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
import NotesIcon from '@mui/icons-material/Notes'
import Paper from '@mui/material/Paper'
import Input from '@mui/material/Input'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

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

const projectMembers = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
]

function addSelectedStyle(name: string, collaborators: string[], theme: Theme) {
    return { fontWeight: collaborators.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightBold }
}

export default function ProjectCards() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [collaborators, setCollaborators] = useState<string[]>([])
    const theme = useTheme()
    const [isAddingNotes, setIsAddingNotes] = useState(false)

    const handleChange = (event: SelectChangeEvent<typeof collaborators>) => {
        const { target: { value } } = event
        setCollaborators(typeof value === 'string' ? value.split(',') : value)
    }

    return (
        <>
            <Grid item xs={12} sm={6} md={3} spacing={2} >
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography variant='h5' pt={1.25}>To Do</Typography>
                    <IconButton size='small' sx={{ pl: 2, mb: 0.75 }}><AddIcon fontSize='large' /></IconButton>
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
                                <Box>
                                    <TextField label='Title' variant='standard' value='Whatever Title' />
                                    <TextField label='Description' variant='standard' multiline value='lorem etc whatever description, blah, blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah' />
                                    <FormControl sx={{ m: 1, width: 250 }}>
                                        <InputLabel id='multiple-collaborators-select'>Tasked Musician</InputLabel>
                                        <Select labelId='multiple-collaborators-select' id='multiple-collaborators-input' multiple value={collaborators} onChange={handleChange} input={<OutlinedInput label='Tasked Musician' />}>
                                            {projectMembers.map((member, i) => (
                                                <MenuItem key={i} value={member} style={addSelectedStyle(member, collaborators, theme)}>{member}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <Button size='small' variant='outlined' color='success'>Add Audio <AudiotrackIcon /></Button>
                                    <Typography variant='h6'>Task Notes</Typography>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary='First note' secondary='by Member Name on 03/05/2022 at 22:34' />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText primary='Second note' secondary='by Member Name on 03/05/2022 at 22:56' />
                                        </ListItem>
                                    </List>
                                    <Button size='small' variant='outlined' color='primary' onClick={() => setIsAddingNotes(!isAddingNotes)}>Add note <NotesIcon /></Button>
                                    {
                                        isAddingNotes &&
                                        <Paper elevation={3} square sx={{ display: 'flex', py: 2, px: 1, mb: 1.5, justifyContent: 'space-around', bgcolor: 'rgba(0,0,0,1)' }}>
                                            <Avatar alt='user name' src={WAvatar} sx={{ mt: 1 }} />
                                            <Input multiline placeholder='Add a note' inputProps={ariaLabel} />
                                        </Paper>
                                    }
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                    <Button color='success' variant='outlined' onClick={handleClose}>Save</Button>
                                    <Button color='warning' variant='outlined' type='submit' onClick={handleClose}>Cancel</Button>
                                </Box>
                            </Box>
                        </Modal>

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
                        <Button size='small' variant='outlined'>Details <KeyboardArrowUpOutlinedIcon sx={{ ml: 0.5, pb: 0.25 }} /></Button>
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
                        <Button size='small' variant='outlined'>Details <KeyboardArrowUpOutlinedIcon sx={{ ml: 0.5, pb: 0.25 }} /></Button>
                        <IconButton size='small'><DeleteOutlineIcon /></IconButton>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography variant='h5' pt={1.25}>In Progress</Typography>
                    <IconButton sx={{ pl: 2 }}><FastForwardOutlinedIcon fontSize='large' /></IconButton>
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
                        <Button size='small' variant='outlined'>Details <KeyboardArrowUpOutlinedIcon sx={{ ml: 0.5, pb: 0.25 }} /></Button>
                        <IconButton size='small'><DeleteOutlineIcon /></IconButton>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography variant='h5' pt={1.25}>Done</Typography>
                    <IconButton sx={{ pl: 2 }}><DoneOutlinedIcon fontSize='large' /></IconButton>
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
                        <Button size='small' variant='outlined'>Details <KeyboardArrowUpOutlinedIcon sx={{ ml: 0.5, pb: 0.25 }} /></Button>
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
                        <Button size='small' variant='outlined'>Details <KeyboardArrowUpOutlinedIcon sx={{ ml: 0.5, pb: 0.25 }} /></Button>
                        <IconButton size='small'><DeleteOutlineIcon /></IconButton>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                    <Typography variant='h5' pl={2} pt={1.25}>Mixed Track</Typography>
                    <IconButton sx={{ pl: 2 }}><BarChartOutlinedIcon fontSize='large' /></IconButton>
                </Box>
                <MusicPlayer />
            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={2} mt={3}>
                <Button variant='outlined' size='large' color='error'>LEAVE PROJECT</Button>
            </Grid>
        </>
    )
}
