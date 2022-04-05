import Button from '@mui/material/Button'
import { ChangeEvent, FormEvent, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import Typography from '@mui/material/Typography'
import { IInitialState } from '../types'
import { useSelector } from 'react-redux'
import useAxios from '../hooks/useAxios'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'
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
    hasApplied: boolean
    gigId: string
}

export default function GigApplication({ hasApplied, gigId }: IProps) {
    const { axiosRequest } = useAxios()
    const loggedUser = useSelector((state: IInitialState) => state.user.currentUser)
    const [openApply, setOpenApply] = useState(false)
    const handleOpenApply = () => setOpenApply(true)
    const handleCloseApply = () => setOpenApply(false)
    const [openWithdraw, setOpenWithdraw] = useState(false)
    const handleOpenWithdraw = () => setOpenWithdraw(true)
    const handleCloseWithdraw = () => setOpenWithdraw(false)
    const [audioPreview, setAudioPreview] = useState<string>('')
    const [audioFile, setAudioFile] = useState<File>()

    const handleUploadTrackToDateAudio = (e: ChangeEvent<HTMLInputElement>) => {
        setAudioFile(e.target.files![0])
        const audioUrl = URL.createObjectURL(e.target.files![0])
        setAudioPreview(audioUrl)
    }

    const handleRemoveTrackToDateAudio = () => {
        setAudioFile(undefined)
        URL.revokeObjectURL(audioPreview)
        setAudioPreview('')
    }

    const [notes, setNotes] = useState('')

    const handleApply = async (e: FormEvent) => {
        e.preventDefault()
        const dataToAxios = new FormData()
        dataToAxios.append('notes', notes)
        audioFile && dataToAxios.append('audioFile', audioFile)
        const response = await axiosRequest(`/gigs/${gigId}/applications/apply`, 'POST', dataToAxios)
        if (response.status === 200) {
            notifySuccess('You applied for the gig!')
            handleCloseApply()
        } else {
            notifyError('Something went wrong, please try again.')
        }
    }

    const handleWithdraw = async (e: FormEvent) => {
        e.preventDefault()
        const response = await axiosRequest(`/gigs/${gigId}/applications/withdraw`, 'POST')
        if (response.status === 200) {
            notifySuccess('You have successfully withdrawn your application.')
            handleCloseWithdraw()
        } else {
            notifyError('Something went wrong, please try again.')
        }
    }

    return (
        <Box>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                {
                    hasApplied
                        ? <Button variant='outlined' size='small' color='error' onClick={handleOpenWithdraw}>CANCEL</Button>
                        : <Button variant='outlined' size='small' color='success' onClick={handleOpenApply}>APPLY</Button>
                }
            </Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openApply}
                onClose={handleCloseApply}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Box component='form' noValidate autoComplete='off' sx={modalStyle}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', my: 2 }}>
                        <Typography variant='h4' sx={{ my: 2, fontWeight: 'bold' }}>Add a track to show off your talent.</Typography>
                        <Typography variant='body1' sx={{ my: 2 }}>Both the quality of your playing and your production are important!</Typography>
                        {
                            audioFile ?
                                <Box sx={{ my: 4 }}>
                                    <Button size='small' variant='contained' color='error' onClick={handleRemoveTrackToDateAudio} endIcon={<HighlightOffSharpIcon />}>Remove Track</Button>
                                </Box>
                                :
                                <Button component='label' sx={{ my: 4, display: 'flex', justifyContent: 'space-around' }} size='medium' variant='outlined' color='success' endIcon={<AudiotrackIcon />}>
                                    Add Audio
                                    <input hidden type="file" onChange={e => handleUploadTrackToDateAudio(e)} />
                                </Button>
                        }
                        <TextField sx={{ width: '100%', my: 2 }} required label='Application notes' variant='standard' multiline rows={5} placeholder='Anything you have in mind regarding the gig goes here.'
                            value={notes}
                            onChange={e => setNotes(e.target.value)} />
                        <Button sx={{ mt: 2 }} variant='contained' type='submit' color='success' onClick={handleApply}>Apply For Gig</Button>
                    </Box>
                </Box>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openWithdraw}
                onClose={handleCloseWithdraw}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Box component='form' noValidate autoComplete='off' sx={modalStyle}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', my: 2 }}>
                        <Typography variant='h5' sx={{ my: 2 }}>Are you sure?</Typography>
                        <Typography variant='body1' sx={{ my: 2 }}>If you withdraw your application for a gig, you will be removed from the list of candidates.</Typography>
                        <Button sx={{ my: 2 }} variant='contained' color='error' type='submit' onClick={handleWithdraw}>Withdraw Application</Button>
                        <Button color='warning' variant='contained' onClick={handleCloseWithdraw}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}