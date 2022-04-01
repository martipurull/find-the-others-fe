import Button from '@mui/material/Button'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Select from '@mui/material/Select'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import useAxios from '../hooks/useAxios'
import { IGig, IInitialState } from '../types'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { notifyError, notifySuccess } from '../hooks/useNotify'

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

interface IProps {
    gig: IGig
}

export default function EditGig({ gig }: IProps) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const instruments = ['guitar', 'bass', 'drums', 'keys', 'wind', 'brass', 'strings', 'other']
    const userProjects = useSelector((state: IInitialState) => state.user.currentUser!.projects)
    const { axiosRequest } = useAxios()
    const navigate = useNavigate()
    const [selectedInstrument, setSelectedInstrument] = useState<string>('')
    const [selectedProjectTitle, setSelectedProjectTitle] = useState<string>('')

    const findSelectedProject = () => {
        return userProjects.find(({ title }) => title === selectedProjectTitle)
    }

    const selectedProject = findSelectedProject()

    useEffect(() => {
        findSelectedProject()
    }, [selectedProjectTitle])

    const [gigDetails, setGigDetails] = useState<IGig>({
        title: gig.title || '',
        project: gig.project || selectedProject,
        bands: gig.bands || selectedProject?.bands,
        description: gig.description || '',
        genre: gig.genre || '',
        hours: gig.hours || 1,
        instrument: gig.instrument || selectedInstrument,
        otherInstrument: gig.otherInstrument || '',
        specifics: gig.specifics || '',
        isGigAvailable: gig.isGigAvailable || true
    })

    const handleInput = (field: string, value: string) => {
        setGigDetails(details => ({
            ...details,
            [field]: value
        }))
    }

    const handleIsAvailable = (e: ChangeEvent<HTMLInputElement>) => {
        setGigDetails({ ...gigDetails, isGigAvailable: e.target.checked })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const response = await axiosRequest('/gigs', 'POST', gigDetails)
        if (response.status === 400) notifyError('Gig could not be posted.')
        if (response.status === 201) {
            navigate('/gigs')
            notifySuccess('Gig posted successfully!')
        }
    }


    return (
        <Box>
            <Button sx={{ mx: 1 }} variant='outlined' size='small' color='warning' onClick={handleOpen} endIcon={<EditOutlinedIcon />}>EDIT GIG</Button>
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
                        <TextField sx={{ my: 2 }} required label='Gig Title' variant='standard' placeholder='Rhythm guitar for rock project' value={gigDetails.title} onChange={e => handleInput('title', e.target.value)} />
                        <FormControl required variant='standard' sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id='project-select'>Gig Project</InputLabel>
                            <Select labelId='project-select' id='project-select' value={selectedProjectTitle} onChange={(e) => setSelectedProjectTitle(e.target.value)}>
                                {userProjects.map((project) => (
                                    <MenuItem key={project._id} value={project.title}>{project.title}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl required variant='standard' sx={{ my: 2, minWidth: 200 }}>
                            <InputLabel id='category-select'>Gig Instrument</InputLabel>
                            <Select labelId='category-select' id='category-select' value={selectedInstrument} onChange={(e) => setSelectedInstrument(e.target.value)}>
                                {instruments.map((instrument, i) => (
                                    <MenuItem key={i} value={instrument}>{instrument}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {selectedInstrument === 'other' && <TextField required label='Please specify' variant='standard' placeholder='xylophone' value={gigDetails.otherInstrument} onChange={e => handleInput('otherInstrument', e.target.value)} />}
                        <TextField sx={{ my: 2 }} required label='Instrument specifications' variant='standard' placeholder='Electric guitar' value={gigDetails.specifics} onChange={e => handleInput('specifics', e.target.value)} />
                        <TextField required label='Project Genre' variant='standard' placeholder='Alternative, rock, pop...' value={gigDetails.genre} onChange={e => handleInput('genre', e.target.value)} />
                        <TextField sx={{ width: '100%', my: 2 }} required label='Gig Description' variant='standard' multiline rows={3} placeholder='Briefly describe what the gig is about: i.e. rhythm guitar for a fast-paced rock song.' value={gigDetails.description} onChange={e => handleInput('description', e.target.value)} />
                        <FormControlLabel sx={{ ml: 'auto' }} control={<Switch sx={{ mr: 1 }} checked={gigDetails.isGigAvailable} onChange={handleIsAvailable} color='success' />} label='Make gig available?' />

                        <Button sx={{ mt: 2 }} variant='contained' color='success' type='submit' onClick={handleSubmit}>Edit Gig</Button>
                    </Box> for rock project
                </Box>
            </Modal>
        </Box>
    )
}