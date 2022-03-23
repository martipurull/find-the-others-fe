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
import useAxios from '../hooks/useAxios'
import { useDispatch } from 'react-redux'
import { FormEvent, useState } from 'react'
import { IUserDetails } from '../types'
import { userLoginAction } from '../redux/actions/actions'

export default function Register() {
    const navigate = useNavigate()
    const { axiosRequest } = useAxios()
    const dispatch = useDispatch()

    const [userError, setUserError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [badRequestError, setBadRequestError] = useState(false)
    const [userDetails, setUserDetails] = useState<IUserDetails>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [formFieldError, setFormFieldError] = useState({
        firstName: false,
        lastName: false,
        username: false,
        email: false,
        password: false,
        confirmPassword: false
    })

    const handleInput = (field: string, value: string) => {
        setUserDetails(details => ({
            ...details,
            [field]: value
        }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setUserError(false)
        setPasswordError(false)
        setFormFieldError({ firstName: false, lastName: false, username: false, email: false, password: false, confirmPassword: false })

        const { firstName, lastName, username, email, password, confirmPassword } = userDetails
        if (!firstName) setFormFieldError(errors => ({ ...errors, firstName: true }))
        if (!lastName) setFormFieldError(errors => ({ ...errors, lastName: true }))
        if (!username) setFormFieldError(errors => ({ ...errors, username: true }))
        if (!email) setFormFieldError(errors => ({ ...errors, email: true }))
        if (!password) setFormFieldError(errors => ({ ...errors, password: true }))
        if (!confirmPassword) setFormFieldError(errors => ({ ...errors, confirmPassword: true }))
        if (password !== confirmPassword) setPasswordError(true)

        const response = await axiosRequest('/user/access/register', 'POST', userDetails)
        if (response.status === 400) setBadRequestError(true)
        if (response.status === 201) {
            dispatch(userLoginAction())
            navigate('/')
        }
    }

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
