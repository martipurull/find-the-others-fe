import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import KeyIcon from '@mui/icons-material/Key'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import MemberRequests from '../components/MemberRequests'
import MemberConnections from '../components/MemberConnections'
import YourBands from '../components/YourBands'
import YourProjects from '../components/YourProjects'
import ApplicationsSent from '../components/ApplicationsSent'

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

export default function MusicianProfile() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Container maxWidth='lg' sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
            <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                    <Typography component='h1' variant='h2' sx={{ mb: 8, mt: 10 }}>Your profile</Typography>

                    {/* ALERTS ON FORM SUBMISSION ERRORS/VALIDATION GO HERE */}

                    <Box component='form' noValidate autoComplete='off'>
                        <Grid container spacing={3} sx={{ mb: 7 }}>
                            <Grid item xs={12} md={3}>
                                <TextField label='First Name' variant='standard' required InputLabelProps={{ style: { color: '#F5F6F7' } }} value='Marti' />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField label='Last Name' variant='standard' required InputLabelProps={{ style: { color: '#F5F6F7' } }} value='Purull' />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField label='Username' variant='standard' required InputLabelProps={{ style: { color: '#F5F6F7' } }} value='martipurull' />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField label='Email Address' variant='standard' required type='email' InputLabelProps={{ style: { color: '#F5F6F7' } }} value='marti____@hotmail.com' />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button fullWidth variant='outlined' sx={{ p: 1, mt: 1 }} onClick={handleOpen}>Change Password <Avatar sx={{ ml: 2 }}><KeyIcon /></Avatar></Button>
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
                                        <Typography id="transition-modal-title" variant="h6" component="h2">
                                            Enter your new password
                                        </Typography>
                                        <TextField label='New Password' variant='standard' required type='password' InputLabelProps={{ style: { color: '#F5F6F7' } }} />
                                        <TextField label='Confirm New Password' variant='standard' required type='password' InputLabelProps={{ style: { color: '#F5F6F7' } }} />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                            <Button color='success' variant='outlined' onClick={handleClose}>Save New Password</Button>
                                            <Button color='warning' variant='outlined' type='submit' onClick={handleClose}>Cancel</Button>
                                        </Box>
                                    </Box>
                                </Modal>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button fullWidth variant='outlined' sx={{ p: 1, mt: 1 }}>Add Avatar <Avatar sx={{ ml: 2 }}><PersonOutlineIcon /></Avatar></Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>Your Connections</Typography>
                                <MemberConnections />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>Connection Requests</Typography>
                                <MemberRequests />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>Your Bands</Typography>
                                <YourBands />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>Your Projects</Typography>
                                <YourProjects />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>Applications Sent</Typography>
                                <ApplicationsSent />
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mx: 15 }}>
                            <Button color='success' variant='outlined' type='submit'>Save Changes</Button>
                            <Button color='warning' variant='outlined' type='submit' onClick={() => navigate('/')}>Cancel</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
