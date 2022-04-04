import Button from '@mui/material/Button'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Avatar from '@mui/material/Avatar'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import WAvatar from '../assets/WAvatar.jpeg'
import AlbumIcon from '@mui/icons-material/Album'
import Badge from '@mui/material/Badge'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { ITrackToSend } from '../types'
import MusicMiniPlayer from './MusicMiniPlayer'
import useAxios from '../hooks/useAxios'
import { notifyError } from '../hooks/useNotify'

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '55%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}

const modalStyle2 = { ...modalStyle, boxShadow: '0 0 20px rgba(229,242,255,0.25)', borderRadius: 1 }

interface IProps {
    readyTracks: ITrackToSend[]
    bandId: string
}

export default function TracksToPublish({ readyTracks, bandId }: IProps) {
    const { axiosRequest } = useAxios()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const noOfTracks = readyTracks.length
    const [openWarningModal, setOpenWarningModal] = useState(false)
    const [open2, setOpen2] = useState(false)

    const handleOpenWarningModal = () => {
        setOpenWarningModal(true)
    }

    const handleCloseWarningModal = () => {
        setOpenWarningModal(false)
    }

    const handleRelease = async (trackId: string) => {
        const response = await axiosRequest(`/bands/${bandId}/release-track`, 'POST', { trackId })
        if (response.status === 200) {
            setOpenWarningModal(false)
            setOpen(false)
            setOpen2(true)
            setTimeout(() => { setOpen2(false) }, 3000)
        } else {
            notifyError('Something went wrong. Please try again.')
        }
    }

    return (
        <Box>
            <Button sx={{ mx: 1 }} variant='outlined' color='primary' onClick={handleOpen} endIcon={<Badge badgeContent={noOfTracks} color='error'><AlbumIcon /></Badge>}>Tracks To Publish</Button>
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
                    <Typography id="transition-modal-title" variant="h4" component="h2">Release your next song</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <List>
                            {
                                readyTracks.map(track => (
                                    <ListItem key={track._id} sx={{ border: '1px solid #f5faff', my: 2 }}>
                                        <Avatar sx={{ mx: 1 }} src={track.cover.image} />
                                        <Typography sx={{ mx: 1 }} id="transition-modal-title" variant="h6" component="p">{track.trackName}</Typography>
                                        <MusicMiniPlayer audioFile={track.track.audiofile} />
                                        <Button sx={{ mx: 1 }} variant='contained' size='small' endIcon={<CheckCircleOutlineOutlinedIcon />} color='success' onClick={handleOpenWarningModal}>Release Song</Button>
                                        <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            open={openWarningModal}
                                            onClose={handleCloseWarningModal}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{ timeout: 500 }}
                                        >
                                            <Box sx={modalStyle}>
                                                <Typography sx={{ my: 1 }} id="transition-modal-title" variant="h4" component="h3">Release Track?</Typography>
                                                <Typography sx={{ my: 1 }} variant='h6' component='h4'>Are you ready to share your track with the community?</Typography>
                                                <Typography sx={{ my: 1 }} variant='body1' component='p'>Once you do, it will appear on your band profile, under Latest Releases.</Typography>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                                    {
                                                        track._id && <Button color='success' variant='contained' onClick={() => handleRelease(track._id!)}>Release Track</Button>
                                                    }
                                                    <Button color='warning' variant='outlined' onClick={handleCloseWarningModal}>Cancel</Button>
                                                </Box>
                                            </Box>
                                        </Modal>
                                    </ListItem>

                                ))
                            }
                        </List>
                    </Box>
                    <Button color='primary' variant='outlined' onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open2}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Box sx={modalStyle2}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Typography sx={{ mx: 1, p: 5, borderRadius: 5 }} id="transition-modal-title" variant="h2" component="h2">Your track is now available to your fans!<DoneAllIcon sx={{ fontSize: 60, color: '#66bb6a', ml: 5 }} /></Typography>
                    </Box>
                </Box>
            </Modal>
        </Box >
    )
}