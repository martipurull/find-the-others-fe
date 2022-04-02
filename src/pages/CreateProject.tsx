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

function addSelectedStyle(name: string, collaborators: string[], theme: Theme) {
    return { fontWeight: collaborators.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightBold }
}


export default function CreateProject() {
    const { axiosRequest } = useAxios()
    const navigate = useNavigate()
    const theme = useTheme()
    const loggedUser = useSelector((state: IInitialState) => state.user.currentUser)
    const [collaboratorId, setCollaboratorId] = useState<string[]>([])
    const [userBandId, setUserBandId] = useState<string[]>([])
    const [adminId, setAdminId] = useState<string[]>([])
    const [dateValue, setDateValue] = useState<Date | null>(new Date())
    const [projectImgFile, setProjectImgFile] = useState<File>()
    const [imgPreview, setImgPreview] = useState<string>('')

    const [projectDetails, setProjectDetails] = useState<IProjectDetails>({
        title: '',
        projectAdminIds: adminId,
        memberIds: collaboratorId,
        bandIds: userBandId,
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

    const handleChangeBands = (e: SelectChangeEvent<typeof userBandId>) => {
        const { target: { value } } = e
        setUserBandId(typeof value === 'string' ? value.split(',') : value)
    }

    const handleChangeCollaborators = (event: SelectChangeEvent<typeof collaboratorId>) => {
        const { target: { value } } = event
        setCollaboratorId(typeof value === 'string' ? value.split(',') : value)
    }

    const handleChangeAdmins = (event: SelectChangeEvent<typeof adminId>) => {
        const { target: { value } } = event
        setAdminId(typeof value === 'string' ? value.split(',') : value)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const dataToAxios = new FormData()
        dataToAxios.append('title', projectDetails.title)
        dataToAxios.append('description', projectDetails.description)
        for (let i = 0; i < projectDetails.projectAdminIds.length; i++) {
            dataToAxios.append('projectAdminIds[]', projectDetails.projectAdminIds[i])
        }
        for (let i = 0; i < projectDetails.memberIds.length; i++) {
            dataToAxios.append('memberIds[]', projectDetails.memberIds[i])
        }
        for (let i = 0; i < projectDetails.bandIds.length; i++) {
            dataToAxios.append('bandIds[]', projectDetails.bandIds[i])
        }
        projectImgFile && dataToAxios.append('projectImage', projectImgFile)

        const response = await axiosRequest('/projects', 'POST', dataToAxios)
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
                                    <Select labelId='multiple-bands-select' id='multiple-bands-input' multiple value={userBandId} onChange={handleChangeBands} input={<OutlinedInput label='Project bands' />}>
                                        {loggedUser?.memberOf.map((band) => (
                                            <MenuItem key={band._id} value={band._id} style={addSelectedStyle(band.name, userBandId, theme)}>{band.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id='multiple-projectAdmins-select'>Project Admins</InputLabel>
                                    <Select labelId='multiple-projectAdmins-select' id='multiple-projectAdmins-input' multiple value={adminId} onChange={handleChangeAdmins} input={<OutlinedInput label='Project Admins' />}>
                                        {loggedUser?.connections.map((connection) => (
                                            <MenuItem key={connection._id} value={`${connection._id} ${connection.lastName}`} style={addSelectedStyle(`${connection.firstName} ${connection.lastName}`, adminId, theme)}>{connection.firstName} {connection.lastName}</MenuItem>
                                        ))}
                                    </Select>
                                    <Typography variant='caption'>by creating the project, you will be one of its admins</Typography>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id='multiple-collaborators-select'>Project Collaborators</InputLabel>
                                    <Select labelId='multiple-collaborators-select' id='multiple-collaborators-input' multiple value={collaboratorId} onChange={handleChangeCollaborators} input={<OutlinedInput label='Project Collaborators' />}>
                                        {loggedUser?.connections.map((connection) => (
                                            <MenuItem key={connection._id} value={`${connection._id} ${connection.lastName}`} style={addSelectedStyle(`${connection.firstName} ${connection.lastName}`, collaboratorId, theme)}>{connection.firstName} {connection.lastName}</MenuItem>
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
                                    {/* {
                                        !projectImgFile &&
                                        <Button variant='contained' sx={{ p: 1.25 }} component='label'>
                                            Add Project Photo
                                            <input type="file" hidden onChange={e => handleProjectImgUpload(e)} />
                                        </Button>
                                    } */}
                                    {
                                        projectImgFile
                                            ?
                                            <Box sx={{ position: 'relative' }}>
                                                <IconButton sx={{ position: 'absolute', left: '85%', top: '-3%' }} onClick={handleRemoveProjectImg} ><HighlightOffSharpIcon /></IconButton>
                                                <Box component='img' src={imgPreview} sx={{ ml: 2, maxWidth: '250px', objectFit: 'cover', borderRadius: '5px' }} />
                                            </Box>
                                            :
                                            <Box>
                                                <Button variant='contained' sx={{ p: 1.25 }} component='label' endIcon={<InsertPhotoIcon sx={{ fontSize: 150 }} />}>
                                                    Add Project Photo
                                                    <input type="file" hidden onChange={e => handleProjectImgUpload(e)} />
                                                </Button>
                                            </Box>
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
