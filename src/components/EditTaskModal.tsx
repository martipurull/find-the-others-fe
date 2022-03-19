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
import Button from '@mui/material/Button'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import WAvatar from '../assets/WAvatar.jpeg'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'

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

export default function EditTaskModal() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const theme = useTheme()
    const [isAddingNotes, setIsAddingNotes] = useState(false)
    const [collaborators, setCollaborators] = useState<string[]>([])

    const handleChange = (event: SelectChangeEvent<typeof collaborators>) => {
        const { target: { value } } = event
        setCollaborators(typeof value === 'string' ? value.split(',') : value)
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
                        <TextField sx={{ my: 1 }} label='Title' variant='standard' value='Whatever Title' />
                        <TextField sx={{ my: 1 }} label='Description' variant='standard' multiline value='lorem etc whatever description, blah, blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah' />
                        <FormControl sx={{ my: 1 }}>
                            <InputLabel id='multiple-collaborators-select'>Tasked Musician</InputLabel>
                            <Select labelId='multiple-collaborators-select' id='multiple-collaborators-input' multiple value={collaborators} onChange={handleChange} input={<OutlinedInput label='Tasked Musician' />}>
                                {projectMembers.map((member, i) => (
                                    <MenuItem key={i} value={member} style={addSelectedStyle(member, collaborators, theme)}>{member}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button sx={{ my: 1, display: 'flex', justifyContent: 'space-around' }} size='small' variant='outlined' color='success'>Add Audio <AudiotrackIcon /></Button>
                        <Typography variant='h6'>Task Notes</Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary='First note' secondary='by Member Name on 03/05/2022 at 22:34' />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary='Second note' secondary='by Member Name on 03/05/2022 at 22:56' />
                            </ListItem>
                        </List>
                        <Button sx={{ my: 1, display: 'flex', justifyContent: 'space-around' }} size='small' variant='outlined' color='primary' onClick={() => setIsAddingNotes(!isAddingNotes)}>Add note <NotesIcon /></Button>
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
        </>
    )
}
