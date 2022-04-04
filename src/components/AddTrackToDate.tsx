import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import { ChangeEvent, FormEvent, useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import ArtTrackOutlinedIcon from '@mui/icons-material/ArtTrackOutlined'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import useAxios from '../hooks/useAxios'
import { useParams } from 'react-router-dom'
import { notifyError, notifySuccess } from '../hooks/useNotify'
import TextField from '@mui/material/TextField'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'
import MusicMiniPlayer from './MusicMiniPlayer'
import { useDispatch } from 'react-redux'
import { addCurrentProjectInfoAction } from '../redux/actions/actions'

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
    trackName: string
}

export default function AddTrackToDate({ trackName }: IProps) {
    const { axiosRequest } = useAxios()
    const { projectId } = useParams()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [openRemoveTrack, setOpenRemoveTrack] = useState(false)
    const handleOpenRemoveTrack = () => setOpenRemoveTrack(true)
    const handleCloseRemoveTrack = () => setOpenRemoveTrack(false)
    const [openRemoveArtwork, setOpenRemoveArtwork] = useState(false)
    const handleOpenRemoveArtwork = () => setOpenRemoveArtwork(true)
    const handleCloseRemoveArtwork = () => setOpenRemoveArtwork(false)
    const [audioFile, setAudioFile] = useState<File>()
    const [coverFile, setCoverFile] = useState<File>()
    const [coverPreview, setCoverPreview] = useState<string>('')
    const [trackToDateName, setTrackToDateName] = useState(trackName)
    const [audioPreview, setAudioPreview] = useState<string>('')

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

    const handleCoverUpload = (e: ChangeEvent<HTMLInputElement>) => {
        setCoverFile(e.target.files![0])
        const imgUrl = URL.createObjectURL(e.target.files![0])
        setCoverPreview(imgUrl)
    }

    const handleCoverRemove = () => {
        setCoverFile(undefined)
        URL.revokeObjectURL(coverPreview)
        setCoverPreview('')
    }

    const handleFileSubmission = async (e: FormEvent) => {
        e.preventDefault()
        if (audioFile) {
            const audioToAxios = new FormData()
            audioToAxios.append('audioFile', audioFile)
            audioToAxios.append('trackName', trackToDateName)
            const response = await axiosRequest(`/projects/${projectId}/add-trackToDate`, 'POST', audioToAxios)
            if (response.status === 403) notifyError('Only a project leader can upload a project track to date.')
            if (response.status === 400) notifyError('Something went wrong.')
            if (response.status === 200) notifySuccess('Track uploaded successfully!')
        }
        if (coverFile) {
            const imageToAxios = new FormData()
            imageToAxios.append('coverFile', coverFile)
            imageToAxios.append('trackName', trackToDateName)
            const response = await axiosRequest(`projects/${projectId}/add-trackCover`, 'POST', imageToAxios)
            if (response.status === 403) notifyError('Only a project leader can upload a track cover.')
            if (response.status === 400) notifyError('Something went wrong.')
            if (response.status === 200) notifySuccess('Cover uploaded successfully!')
        }
        const response = await axiosRequest(`/projects/${projectId}`, 'GET')
        dispatch(addCurrentProjectInfoAction(response.data))
        handleClose()
    }

    const handleRemoveTrack = async () => {
        const response = await axiosRequest(`projects/${projectId}/remove-TrackToDate`, 'DELETE')
        if (response.status === 204) notifySuccess('Track removed successfully!')
        if (response.status === 403) notifyError('Only a project leader can remove a track.')
        handleCloseRemoveTrack()
    }

    const handleRemoveArtwork = async () => {
        const response = await axiosRequest(`/projects/${projectId}/remove-trackCover`, 'DELETE')
        if (response.status === 204) notifySuccess('Cover removed successfully!')
        if (response.status === 403) notifyError('Only a project leader can remove a track cover.')
        handleCloseRemoveArtwork()
    }


    return (
        <Box sx={{ mt: 4 }}>
            <Button size='large' variant='contained' color='success' onClick={handleOpen} endIcon={<ArtTrackOutlinedIcon />}>Add / Remove Track & Artwork</Button>

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
                    <Typography sx={{ mb: 2 }} id="transition-modal-title" variant="h5" component="h2">Add The Latest Version Of The Project's Track & Artwork</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <TextField sx={{ mt: 4 }} label='Track name' value={trackToDateName} onChange={(e) => setTrackToDateName(e.target.value)} />
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
                        <Button size='small' variant='outlined' color='error' onClick={handleOpenRemoveTrack}>Remove current track</Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={openRemoveTrack}
                            onClose={handleCloseRemoveTrack}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{ timeout: 500 }}
                        >
                            <Box sx={modalStyle}>
                                <Typography sx={{ my: 4 }} id="transition-modal-title" variant="h4" component="h3">Remove Current Track To Date</Typography>
                                <Typography sx={{ my: 4 }} variant='h6' component='h4'>Are you sure you want to remove this track?</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                    <Button color='error' variant='contained' onClick={handleRemoveTrack}>Remove Track</Button>
                                    <Button color='warning' variant='outlined' type='submit' onClick={handleCloseRemoveTrack}>Cancel</Button>
                                </Box>
                            </Box>
                        </Modal>
                        {
                            !coverFile &&
                            <Button sx={{ my: 4, display: 'flex', justifyContent: 'space-around' }} size='small' variant='outlined' color='success' component='label'>
                                Add Cover <ImageOutlinedIcon />
                                <input hidden type="file" onChange={e => handleCoverUpload(e)} />
                            </Button>
                        }
                        {
                            coverFile &&
                            <Box sx={{ position: 'relative', my: 4 }}>
                                <IconButton sx={{ position: 'absolute', left: '85%', top: '-3%' }} onClick={handleCoverRemove} ><HighlightOffSharpIcon /></IconButton>
                                <Box component='img' src={coverPreview} sx={{ ml: 2, maxWidth: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                            </Box>
                        }

                        <Button size='small' variant='outlined' color='error' onClick={handleOpenRemoveArtwork}>Remove current artwork</Button>
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={openRemoveArtwork}
                            onClose={handleCloseRemoveArtwork}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{ timeout: 500 }}
                        >
                            <Box sx={modalStyle}>
                                <Typography sx={{ my: 4 }} id="transition-modal-title" variant="h4" component="h3">Remove Current Cover</Typography>
                                <Typography sx={{ my: 4 }} variant='h6' component='h4'>Are you sure you want to remove this image?</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                    <Button color='error' variant='contained' onClick={handleRemoveArtwork}>Remove Artwork</Button>
                                    <Button color='warning' variant='outlined' type='submit' onClick={handleCloseRemoveArtwork}>Cancel</Button>
                                </Box>
                            </Box>
                        </Modal>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                        <Button color='success' variant='outlined' type='submit' onClick={handleFileSubmission}>Add Track / Artwork</Button>
                        <Button color='warning' variant='outlined' type='submit' onClick={handleClose}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}
