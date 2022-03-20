import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ArtTrackOutlinedIcon from '@mui/icons-material/ArtTrackOutlined'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'

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

export default function AddTrackToDate() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)



    return (
        <Box sx={{ mt: 4 }}>
            <Button size='large' variant='contained' color='success' onClick={handleOpen} endIcon={<ArtTrackOutlinedIcon />}>Add New Track / Artwork</Button>

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
                    <Typography id="transition-modal-title" variant="h6" component="h2">Add The Latest Version Of The Project's Track</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <Button sx={{ my: 1, display: 'flex', justifyContent: 'space-around' }} size='small' variant='outlined' color='success'>Add Audio <AudiotrackIcon /></Button>
                        <Button sx={{ my: 1, display: 'flex', justifyContent: 'space-around' }} size='small' variant='outlined' color='success'>Add Cover <ImageOutlinedIcon /></Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                        <Button color='success' variant='outlined' onClick={handleClose}>Add Track</Button>
                        <Button color='warning' variant='outlined' type='submit' onClick={handleClose}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}
