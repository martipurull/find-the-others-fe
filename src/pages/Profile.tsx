import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

export default function MusicianProfile() {
    const navigate = useNavigate()
    return (
        <Container maxWidth='md' sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
            <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} md={8} style={{ textAlign: 'center' }}>
                    <Typography component='h1' variant='h2' sx={{ mb: 10, mt: 10 }}>Your profile</Typography>

                    {/* ALERTS ON FORM SUBMISSION ERRORS/VALIDATION GO HERE */}

                    <Box component='form' noValidate autoComplete='off'>
                        <Grid container spacing={3} style={{ marginBottom: '3rem' }}>
                            <Grid item xs={12} md={6}>
                                <TextField label='First Name' variant='standard' required InputLabelProps={{ style: { color: '#F5F6F7' } }} value='Marti' />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label='Last Name' variant='standard' required InputLabelProps={{ style: { color: '#F5F6F7' } }} value='Purull' />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label='Username' variant='standard' required InputLabelProps={{ style: { color: '#F5F6F7' } }} value='martipurull' />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label='Email Address' variant='standard' required type='email' InputLabelProps={{ style: { color: '#F5F6F7' } }} value='marti____@hotmail.com' />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label='New Password' variant='standard' required type='password' InputLabelProps={{ style: { color: '#F5F6F7' } }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label='Confirm New Password' variant='standard' required type='password' InputLabelProps={{ style: { color: '#F5F6F7' } }} />
                            </Grid>
                        </Grid>
                        <Button color='success' variant='outlined' type='submit' style={{ marginRight: '2.5rem' }}>Save Changes</Button>
                        <Button color='warning' variant='outlined' type='submit' style={{ marginRight: '2.5rem' }} onClick={() => navigate('/')}>Cancel</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
