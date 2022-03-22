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

export default function TracksToPublish() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const noOfTracks = 1

    const [open2, setOpen2] = useState(false)

    const handleReleaseModal = () => {
        // here goes the fetch to release the song, upon success:
        setOpen(false)
        setOpen2(true)
        setTimeout(() => { setOpen2(false) }, 3000)
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
                            <ListItem sx={{ border: '1px solid #f5faff', my: 2 }}>
                                <Avatar sx={{ mx: 1 }} src={WAvatar} />
                                <Typography sx={{ mx: 1 }} id="transition-modal-title" variant="h6" component="p">Track Title</Typography>
                                <Button sx={{ mx: 1 }} variant='outlined' size='small' endIcon={<PlayCircleFilledWhiteOutlinedIcon />}>Play Track</Button>
                                <Button sx={{ mx: 1 }} variant='contained' size='small' endIcon={<CheckCircleOutlineOutlinedIcon />} color='success' onClick={handleReleaseModal}>Release Song</Button>
                            </ListItem>
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