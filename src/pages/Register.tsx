import { Container, Alert, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar'
import UseOAuth from '../components/UseOAuth'

export default function Register() {
    const navigate = useNavigate()

    return (
        <Container maxWidth='md' sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} md={8} style={{ textAlign: 'center' }}>
                    <Typography component='h1' variant='h2' style={{ marginBottom: '3rem' }}>Register now to <span className='app-name'>find the others</span>...</Typography>

                    {/* ALERTS ON FORM SUBMISSION ERRORS/VALIDATION GO HERE */}

                    <Box component='form' noValidate autoComplete='off'>
                        <Grid container spacing={3} style={{ marginBottom: '3rem' }}>
                            <Grid item xs={12} md={6}>
                                <TextField label='First Name' variant='standard' required InputLabelProps={{ style: { color: '#F5F6F7' } }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label='Last Name' variant='standard' required InputLabelProps={{ style: { color: '#F5F6F7' } }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label='Username' variant='standard' required InputLabelProps={{ style: { color: '#F5F6F7' } }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label='Email Address' variant='standard' required type='email' InputLabelProps={{ style: { color: '#F5F6F7' } }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label='Password' variant='standard' required type='password' InputLabelProps={{ style: { color: '#F5F6F7' } }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label='Confirm Password' variant='standard' required type='password' InputLabelProps={{ style: { color: '#F5F6F7' } }} />
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '1rem' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Box>
                                        <FormControl>
                                            <FormLabel sx={{ color: '#f5faff' }}>Are you a musician or a fan?</FormLabel>
                                            <RadioGroup row>
                                                <FormControlLabel value='musician' control={<Radio />} label='musician' />
                                                <FormControlLabel value='fan' control={<Radio />} label='fan' />
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <Button variant='outlined' sx={{ p: 1.25 }}>Add photo <Avatar sx={{ ml: 2 }}><PersonOutlineIcon /></Avatar></Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mx: 15 }}>
                            <Button variant='outlined' type='submit' onClick={() => navigate('/login')} >Log in</Button>
                            <Button variant='outlined'>Register</Button>
                        </Box>
                        <UseOAuth />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
