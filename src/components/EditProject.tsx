import Button from '@mui/material/Button'
import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MemberList from '../components/MemberList'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack'
import { Theme, useTheme } from '@mui/material/styles'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

const connections = [
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
];

const bandsUserIsMemberOf = ['Tender Tantrums', 'The Bloody Foreigners']

function addSelectedStyle(name: string, collaborators: string[], theme: Theme) {
    return { fontWeight: collaborators.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightBold }
}

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

export default function EditProject() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const theme = useTheme()
    const [collaborators, setCollaborators] = useState<string[]>([])
    const [dateValue, setDateValue] = useState<Date | null>(new Date())
    const [selectedBand, setSelectedBand] = useState<string>('')

    const handleChange = (event: SelectChangeEvent<typeof collaborators>) => {
        const { target: { value } } = event
        setCollaborators(typeof value === 'string' ? value.split(',') : value)
    }

    return (
        <Box sx={{ ml: 'auto', mb: 1 }}>
            <Button variant='outlined' endIcon={<EditOutlinedIcon />} onClick={handleOpen}>Edit Project</Button>
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
                        <TextField sx={{ my: 1 }} required label='Project Leader' inputProps={{ readOnly: true }} variant='standard' defaultValue='LoggedIn User' />
                        <TextField sx={{ my: 1 }} required label='Project Title' variant='standard' />
                        <FormControl required variant='standard' sx={{ my: 2, minWidth: 200 }}>
                            <InputLabel id='band-select'>Band</InputLabel>
                            <Select labelId='band-select' id='band-select' value={selectedBand} onChange={(e) => setSelectedBand(e.target.value)}>
                                {bandsUserIsMemberOf.map((band, i) => (
                                    <MenuItem key={i} value={band}>{band}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box sx={{ display: 'flex', direction: 'column', my: 1 }}>
                            <Stack spacing={10}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker views={['day', 'month', 'year']} label='Project Due Date' value={dateValue} onChange={(newValue) => setDateValue(newValue)} renderInput={(params) => <TextField {...params} helperText={null} />} />
                                </LocalizationProvider>
                            </Stack>
                        </Box>
                        <TextField sx={{ my: 1 }} id="new-project-description" label="Project Description" multiline rows={6} placeholder='Write down the main ideas for the project: make it exciting for your collaborators!' />
                        <FormControl sx={{ my: 1, width: 250 }}>
                            <InputLabel id='multiple-collaborators-select'>Project Collaborators</InputLabel>
                            <Select labelId='multiple-collaborators-select' id='multiple-collaborators-input' multiple value={collaborators} onChange={handleChange} input={<OutlinedInput label='Project Collaborators' />}>
                                {connections.map((connection, i) => (
                                    <MenuItem key={i} value={connection} style={addSelectedStyle(connection, collaborators, theme)}>{connection}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box sx={{ mt: 2 }}>
                            <Button variant='contained' color='success' fullWidth>Create New Project</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}