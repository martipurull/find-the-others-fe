import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IGig, IGigDetails, IInitialState, IMiniProject } from '../types'
import { FormControlLabel, Switch } from '@mui/material'
import useAxios from '../hooks/useAxios'
import { notifyError, notifySuccess } from '../hooks/useNotify'
import { useNavigate } from 'react-router-dom'
import UserGigs from '../components/UserGigs'

export default function CreateGig() {
    const { axiosRequest } = useAxios()
    const navigate = useNavigate()
    const instruments = ['guitar', 'bass', 'drums', 'keys', 'wind', 'brass', 'strings', 'other']
    const userProjects = useSelector((state: IInitialState) => state.user.currentUser!.projects)
    const [userGigs, setUserGigs] = useState<IGig[]>([])
    const [selectedInstrument, setSelectedInstrument] = useState<string>('')
    const [selectedProjectId, setSelectedProjectId] = useState<string>('')

    const [gigDetails, setGigDetails] = useState({
        title: '',
        description: '',
        genre: '',
        hours: 1,
        otherInstrument: '',
        specifics: '',
        isGigAvailable: true
    })

    const handleInput = (field: string, value: string) => {
        setGigDetails(details => ({
            ...details,
            [field]: value
        }))
    }

    const handleChangeSelectedInstrument = (e: SelectChangeEvent) => {
        setSelectedInstrument(e.target.value)
    }

    const handleChangeSelectedProject = (e: SelectChangeEvent) => {
        setSelectedProjectId(e.target.value)
    }

    const handleIsAvailable = (e: ChangeEvent<HTMLInputElement>) => {
        setGigDetails({ ...gigDetails, isGigAvailable: e.target.checked })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const detailsToAxios: IGigDetails = { ...gigDetails, instrument: selectedInstrument, projectId: selectedProjectId }
        const response = await axiosRequest('/gigs', 'POST', detailsToAxios)
        if (response.status === 400) notifyError('Gig could not be posted.')
        if (response.status === 201) {
            notifySuccess('Gig posted successfully!')
            navigate('/gigs')
        }
    }

    const fetchUserGigs = async () => {
        const response = await axiosRequest('/gigs/my-gigs', 'GET')
        setUserGigs(response.data)
    }

    useEffect(() => {
        fetchUserGigs()
    }, [])

    return (
        <Container maxWidth='md' sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', alignItems: 'flex-start' }}>
            <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={12} md={8}>
                    <Typography component='h1' variant='h3' sx={{ my: 5, textAlign: 'center' }}>Create a gig for other musicians to help you with your project</Typography>
                    <Box component='form' noValidate autoComplete='off'>
                        <Grid container spacing={6} >
                            <Grid item xs={12} md={3}>
                                <TextField required label='Gig Title' variant='standard' placeholder='Drums for dance project' value={gigDetails.title} onChange={e => handleInput('title', e.target.value)} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControl required variant='standard' sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id='project-select'>Gig Project</InputLabel>
                                    <Select labelId='project-select' id='project-select' value={selectedProjectId} onChange={handleChangeSelectedProject}>
                                        {userProjects.map((project) => (
                                            <MenuItem key={project._id} value={project._id}>{project.title}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <FormControl required variant='standard' sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id='instrument-select'>Gig Instrument</InputLabel>
                                    <Select labelId='instrument-select' id='instrument-select' value={selectedInstrument} onChange={handleChangeSelectedInstrument}>
                                        {instruments.map((instrument, i) => (
                                            <MenuItem key={i} value={instrument}>{instrument}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {selectedInstrument === 'other' && <TextField required label='Please specify' variant='standard' placeholder='xylophone' value={gigDetails.otherInstrument} onChange={e => handleInput('otherInstrument', e.target.value)} />}
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField required label='Instrument specifications' variant='standard' placeholder='Electric guitar' value={gigDetails.specifics} onChange={e => handleInput('specifics', e.target.value)} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField required label='Project Genre' variant='standard' placeholder='Alternative, rock, pop...' value={gigDetails.genre} onChange={e => handleInput('genre', e.target.value)} />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <TextField sx={{ width: '100%' }} required label='Gig Description' variant='standard' multiline rows={3} placeholder='Briefly describe what the gig is about: i.e. rhythm guitar for a fast-paced rock song.' value={gigDetails.description} onChange={e => handleInput('description', e.target.value)} />
                            </Grid>
                            <Grid item xs={12} md={2} sx={{ alignSelf: 'flex-end', display: 'flex', justifyContent: 'center' }}>
                                <FormControlLabel sx={{ ml: 'auto' }} control={<Switch sx={{ mr: 1 }} checked={gigDetails.isGigAvailable} onChange={handleIsAvailable} color='success' />} label='Make gig available?' />
                            </Grid>
                            <Grid item xs={12} md={2} sx={{ alignSelf: 'flex-end', display: 'flex', justifyContent: 'center' }}>
                                <Button variant='contained' color='success' type='submit' onClick={handleSubmit}>Create New Gig</Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <UserGigs gigs={userGigs} />
                </Grid>
            </Grid>
        </Container>
    )
}
