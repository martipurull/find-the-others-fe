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
import { ChangeEvent, FormEvent, useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import IconButton from '@mui/material/IconButton'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'
import { IProjectDetails, IInitialState, IMiniUser, IMiniBand } from '../types'
import { useSelector } from 'react-redux'
import BandList from '../components/BandList'
import BandListMini from '../components/BandListMini'
import { CalendarPicker } from '@mui/lab'
import useAxios from '../hooks/useAxios'
import { useNavigate } from 'react-router-dom'
import { notifyError } from '../hooks/useNotify'

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
    const { axiosRequest } = useAxios()
    const navigate = useNavigate()
    const theme = useTheme()
    const loggedUser = useSelector((state: IInitialState) => state.user.currentUser)
    const [collaboratorName, setCollaboratorName] = useState<string[]>([])
    const [userBandName, setUserBandName] = useState<string[]>([])
    const [adminName, setAdminName] = useState<string[]>([])
    const [dateValue, setDateValue] = useState<Date | null>(new Date())
    const [projectImgFile, setProjectImgFile] = useState<File>()
    const [imgPreview, setImgPreview] = useState<string>('')

    const [projectDetails, setProjectDetails] = useState<IProjectDetails>({
        title: '',
        projectAdmins: adminName,
        members: collaboratorName,
        bands: userBandName,
        description: '',
        dueDate: dateValue
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

    const handleChangeBands = (e: SelectChangeEvent<typeof userBandName>) => {
        const { target: { value } } = e
        setUserBandName(typeof value === 'string' ? value.split(',') : value)
    }

    const handleChangeCollaborators = (event: SelectChangeEvent<typeof collaboratorName>) => {
        const { target: { value } } = event
        setCollaboratorName(typeof value === 'string' ? value.split(',') : value)
    }

    const handleChangeAdmins = (event: SelectChangeEvent<typeof adminName>) => {
        const { target: { value } } = event
        setAdminName(typeof value === 'string' ? value.split(',') : value)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const dataToAxios = new FormData()
        dataToAxios.append('title', projectDetails.title)
        dataToAxios.append('description', projectDetails.description)
        for (let i = 0; i < projectDetails.projectAdmins.length; i++) {
            dataToAxios.append('projectAdmins[]', projectDetails.projectAdmins[i])
        }
        for (let i = 0; i < projectDetails.members.length; i++) {
            dataToAxios.append('members[]', projectDetails.members[i])
        }
        for (let i = 0; i < projectDetails.projectAdmins.length; i++) {
            dataToAxios.append('projectAdmins[]', projectDetails.bands[i])
        }
        projectImgFile && dataToAxios.append('projectImage', projectImgFile)

        const response = await axiosRequest('projects', 'POST', dataToAxios)
        if (response.status === 201) {
            navigate('/')
        } else {
            notifyError('Something went wrong, please try again.')
        }
    }

    return (
        <Container maxWidth='md' sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', justifyContent: 'flex-start' }}>
            <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} md={8}>
                    <Typography component='h1' variant='h2' sx={{ mt: 5, mb: 5, textAlign: 'center', fontWeight: 'bold' }}>Start building your new collaboration</Typography>
                    <Box component='form' noValidate autoComplete='off' sx={{ mt: 3, mb: 1 }}>
                        <Grid container spacing={6}>
                            <Grid item xs={12} md={3}>
                                <TextField required label='Project Title' variant='standard' value={projectDetails.title} onChange={e => handleInput('title', e.target.value)} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id='multiple-bands-select'>Project Bands</InputLabel>
                                    <Select labelId='multiple-bands-select' id='multiple-bands-input' multiple value={userBandName} onChange={handleChangeBands} input={<OutlinedInput label='Project bands' />}>
                                        {loggedUser?.memberOf.map((band) => (
                                            <MenuItem key={band._id} value={band.name} style={addSelectedStyle(band.name, userBandName, theme)}>{band.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id='multiple-collaborators-select'>Project Admins</InputLabel>
                                    <Select labelId='multiple-collaborators-select' id='multiple-collaborators-input' multiple value={adminName} onChange={handleChangeAdmins} input={<OutlinedInput label='Project Collaborators' />}>
                                        {loggedUser?.connections.map((connection) => (
                                            <MenuItem key={connection._id} value={`${connection.firstName} ${connection.lastName}`} style={addSelectedStyle(`${connection.firstName} ${connection.lastName}`, adminName, theme)}>{connection.firstName} {connection.lastName}</MenuItem>
                                        ))}
                                    </Select>
                                    <Typography variant='caption'>by creating the project, you will be one of its admins</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id='multiple-collaborators-select'>Project Collaborators</InputLabel>
                                    <Select labelId='multiple-collaborators-select' id='multiple-collaborators-input' multiple value={collaboratorName} onChange={handleChangeCollaborators} input={<OutlinedInput label='Project Collaborators' />}>
                                        {loggedUser?.connections.map((connection) => (
                                            <MenuItem key={connection._id} value={`${connection.firstName} ${connection.lastName}`} style={addSelectedStyle(`${connection.firstName} ${connection.lastName}`, adminName, theme)}>{connection.firstName} {connection.lastName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <BandListMini bands={loggedUser!.memberOf} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MemberList connections={loggedUser!.connections} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth id="new-project-description" label="Project Description" multiline rows={6} placeholder='Write down the main ideas for the project: make it exciting for your collaborators!' value={projectDetails.description} onChange={e => handleInput('description', e.target.value)} />
                            </Grid>
                            <Grid item xs={12} md={6}>
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
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant='h3'>Set a due date for your project:</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ display: 'flex', direction: 'column' }}>
                                    <Stack spacing={10}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            {/* <DatePicker views={['day', 'month', 'year']} label='Project Due Date' value={dateValue} onChange={(newValue) => setDateValue(newValue)} renderInput={(params) => <TextField {...params} helperText={null} />} /> */}
                                            <CalendarPicker date={dateValue} onChange={(newValue) => setDateValue(newValue)} />
                                        </LocalizationProvider>
                                    </Stack>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='contained' color='success' fullWidth type='submit' onClick={handleSubmit}>Create New Project</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
