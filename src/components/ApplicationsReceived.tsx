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
import ApprovalOutlinedIcon from '@mui/icons-material/ApprovalOutlined'
import Badge from '@mui/material/Badge';

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

export default function ApplicationsReceived() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const noOfApplications = 1

    return (
        <Box>
            <Button sx={{ mx: 1 }} variant='outlined' color='primary' onClick={handleOpen} endIcon={<Badge badgeContent={noOfApplications} color='error'><ApprovalOutlinedIcon /></Badge>}>Received Applications</Button>
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
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <List>
                            <ListItem sx={{ border: '1px solid #f5faff', my: 2 }}>
                                <Avatar sx={{ mx: 1 }} src={WAvatar} />
                                <Typography sx={{ mx: 1 }} id="transition-modal-title" variant="h6" component="p">Applicant Name</Typography>
                                <Typography sx={{ mx: 1 }} id="transition-modal-title" variant="subtitle1" component="p">Instrument + specifics</Typography>
                                <Button sx={{ mx: 1 }} variant='outlined' size='small' endIcon={<PlayCircleFilledWhiteOutlinedIcon />}>Play Submitted Track</Button>
                                <Button sx={{ mx: 1 }} variant='contained' size='small' endIcon={<CheckCircleOutlineOutlinedIcon />} color='success'>Give Gig</Button>
                                <Button sx={{ mx: 1 }} variant='contained' size='small' endIcon={<CancelOutlinedIcon />} color='error'>Reject Application</Button>
                            </ListItem>
                        </List>
                    </Box>
                    <Button color='primary' variant='outlined' onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </Box>
    )
}