import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MemberList from '../components/MemberList'
import { Theme, useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { ChangeEvent, useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'

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


export default function CreateProject() {
    const theme = useTheme()
    const [collaborators, setCollaborators] = useState<string[]>([])
    const [dateValue, setDateValue] = useState<Date | null>(new Date())
    const [selectedBand, setSelectedBand] = useState<string>('')
    const [projectImgFile, setProjectImgFile] = useState<File>()
    const [imgPreview, setImgPreview] = useState<string>('')

    const handleProjectImgUpload = (e: ChangeEvent<HTMLInputElement>) => {
        setProjectImgFile(e.target.files![0])
        const imgUrl = URL.createObjectURL(e.target.files![0])
        setImgPreview(imgUrl)
    }

    const handleRemoveProjectImg = () => {
        setProjectImgFile(undefined)
        setImgPreview('')
        URL.revokeObjectURL(imgPreview)
    }

    const handleChange = (event: SelectChangeEvent<typeof collaborators>) => {
        const { target: { value } } = event
        setCollaborators(typeof value === 'string' ? value.split(',') : value)
    }

    return (
        <Container maxWidth='md' sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', justifyContent: 'flex-start' }}>
            <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} textAlign='center'>
                    <Typography component='h1' variant='h3' sx={{ mt: 5, mb: 1 }}>Start building your new collaboration</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box component='form' noValidate autoComplete='off' sx={{ mt: 3, mb: 1 }}>
                        <Grid container spacing={8} sx={{ display: 'flex', alignItems: 'space-between' }}>
                            <Grid item xs={12} md={3}>
                                <TextField required label='Project Leader' inputProps={{ readOnly: true }} variant='standard' defaultValue='LoggedIn User' />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField required label='Project Title' variant='standard' />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControl required variant='standard' sx={{ minWidth: 200 }}>
                                    <InputLabel id='band-select'>Band</InputLabel>
                                    <Select labelId='band-select' id='band-select' value={selectedBand} onChange={(e) => setSelectedBand(e.target.value)}>
                                        {bandsUserIsMemberOf.map((band, i) => (
                                            <MenuItem key={i} value={band}>{band}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box sx={{ display: 'flex', direction: 'column' }}>
                                    <Stack spacing={10}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker views={['day', 'month', 'year']} label='Project Due Date' value={dateValue} onChange={(newValue) => setDateValue(newValue)} renderInput={(params) => <TextField {...params} helperText={null} />} />
                                        </LocalizationProvider>
                                    </Stack>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth id="new-project-description" label="Project Description" multiline rows={6} placeholder='Write down the main ideas for the project: make it exciting for your collaborators!' />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    {
                                        projectImgFile
                                            ? <Button variant='contained' sx={{ p: 1.25 }} component='label' color='warning' onClick={handleRemoveProjectImg}>
                                                Remove Project Photo
                                            </Button>
                                            : <Button variant='contained' sx={{ p: 1.25 }} component='label'>
                                                Add Project Photo
                                            <input type="file" hidden onChange={e => handleProjectImgUpload(e)} />
                                            </Button>
                                    }
                                    {
                                        projectImgFile
                                            ? <Box component='img' src={imgPreview} sx={{ ml: 2, maxWidth: '250px', objectFit: 'cover', borderRadius: '5px' }} />
                                            : <Box><InsertPhotoIcon sx={{ fontSize: 150 }} /></Box>
                                    }
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl sx={{ m: 1, width: 250 }}>
                                    <InputLabel id='multiple-collaborators-select'>Project Collaborators</InputLabel>
                                    <Select labelId='multiple-collaborators-select' id='multiple-collaborators-input' multiple value={collaborators} onChange={handleChange} input={<OutlinedInput label='Project Collaborators' />}>
                                        {connections.map((connection, i) => (
                                            <MenuItem key={i} value={connection} style={addSelectedStyle(connection, collaborators, theme)}>{connection}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {/* ADDED COLLABORATORS SHOULD BE PASSED AS PROP SO IT CAN MAP THROUGH THE APPROPRIATE */}
                                <MemberList />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='contained' color='success' fullWidth>Create New Project</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
