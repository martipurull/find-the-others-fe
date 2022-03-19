import { Container, Alert } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import UseOAuth from '../components/UseOAuth'

export default function Login() {
    const navigate = useNavigate()

    return (
        <Container maxWidth='md' sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} md={8} sx={{ textAlign: 'center' }}>
                    <Typography component='h1' variant='h2' sx={{ marginBottom: '3rem' }}>Login to <span className='app-name'>find the others</span>...</Typography>

                    {/* ALERTS ON FORM SUBMISSION ERRORS/VALIDATION GO HERE */}

                    <Box component='form' noValidate autoComplete='off' >
                        <Grid container spacing={3} sx={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Grid item xs={12} md={3}>
                                <TextField label='Email Address' InputLabelProps={{ sx: { color: '#F5F6F7' } }} variant='standard' required type='email' />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField label='Password' InputLabelProps={{ sx: { color: '#F5F6F7' } }} variant='standard' required type='password' />
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mx: 15 }}>
                            <Button variant='outlined' type='submit' >Log in</Button>
                            <Button variant='outlined' onClick={() => navigate('/register')} >Register</Button>
                        </Box>
                        <UseOAuth />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
