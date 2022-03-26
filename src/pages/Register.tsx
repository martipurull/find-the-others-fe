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
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { IUserDetails } from '../types'
import { userLoginAction } from '../redux/actions/actions'
import { useDebounce } from 'use-debounce'

export default function Register() {
    const navigate = useNavigate()
    const { axiosRequest } = useAxios()
    const dispatch = useDispatch()

    const [userError, setUserError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [badRequestError, setBadRequestError] = useState(false)
    const [emailTakenError, setEmailTakenError] = useState(false)
    const [emailAvailable, setEmailAvailable] = useState(false)
    const [avatarFile, setAvatarFile] = useState<File>()
    const [avatarPreview, setAvatarPreview] = useState<string>('')
    const [userDetails, setUserDetails] = useState<IUserDetails>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        musicianOrFan: ''
    })
    const [formFieldError, setFormFieldError] = useState({
        firstName: false,
        lastName: false,
        username: false,
        email: false,
        password: false,
        confirmPassword: false
    })
    const [debouncedEmail] = useDebounce(userDetails.email, 1000)

    const handleCheckEmail = async (emailDebounced: string) => {
        const response = await axiosRequest('/user/access/check-email', 'POST', { email: emailDebounced })
        if (response.status === 400) {
            setEmailAvailable(false)
            setEmailTakenError(true)
        }
        if (response.status === 200) {
            setEmailTakenError(false)
            setEmailAvailable(true)
        }
    }

    useEffect(() => {
        handleCheckEmail(debouncedEmail)
    }, [debouncedEmail])

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
        if (!firstName || !lastName || !username || !email || !password || !confirmPassword) setUserError(true)
        if (password !== confirmPassword) setPasswordError(true)



        const dataToAxios = new FormData()
        dataToAxios.append('firstName', userDetails.firstName)
        dataToAxios.append('lastName', userDetails.lastName)
        dataToAxios.append('username', userDetails.username)
        dataToAxios.append('email', userDetails.email)
        dataToAxios.append('password', userDetails.password)
        dataToAxios.append('musicianOrFan', userDetails.musicianOrFan)
        avatarFile && dataToAxios.append('userAvatar', avatarFile)

        const response = await axiosRequest('/user/access/register', 'POST', dataToAxios)
        if (response.status === 400) setBadRequestError(true)
        if (response.status === 201) {
            dispatch(userLoginAction())
            navigate('/')
        }
    }

    const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
        setAvatarFile(e.target.files![0])
        const imgUrl = URL.createObjectURL(e.target.files![0])
        setAvatarPreview(imgUrl)
    }

    return (
        <Container maxWidth='md' sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} md={8} style={{ textAlign: 'center' }}>
                    <Typography component='h1' variant='h2' style={{ marginBottom: '3rem' }}>Register now to <span className='app-name'>find the others</span>...</Typography>

                    {userError && <Alert sx={{ mb: 5 }} variant='outlined' severity='error'>Please make sure you have entered correct information for all required fields.</Alert>}
                    {passwordError && <Alert sx={{ mb: 5 }} variant='outlined' severity='error'>Please make sure your passwords match!</Alert>}
                    {badRequestError && <Alert sx={{ mb: 5 }} variant='outlined' severity='error'>Something went wrong with your request. Please try again.</Alert>}
                    {debouncedEmail && emailTakenError && <Alert sx={{ mb: 5 }} variant='outlined' severity='error'>This email is already taken. Please use a new one.</Alert>}
                    {debouncedEmail && emailAvailable && <Alert sx={{ mb: 5 }} variant='outlined' severity='success'>Great, this email is available!</Alert>}

                    <Box component='form' noValidate autoComplete='off' onSubmit={handleSubmit}>
                        <Grid container spacing={3} style={{ marginBottom: '3rem' }}>
                            <Grid item xs={12} md={6}>
                                <TextField label='First Name' variant='standard' required InputLabelProps={{ style: { color: '#F5F6F7' } }} value={userDetails.firstName} onChange={e => handleInput('firstName', e.target.value)} error={formFieldError.firstName} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label='Last Name' variant='standard' required InputLabelProps={{ style: { color: '#F5F6F7' } }} value={userDetails.lastName} onChange={e => handleInput('lastName', e.target.value)} error={formFieldError.lastName} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label='Username' variant='standard' required InputLabelProps={{ style: { color: '#F5F6F7' } }} value={userDetails.username} onChange={e => handleInput('username', e.target.value)} error={formFieldError.username} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label='Email Address' variant='standard' required type='email' InputLabelProps={{ style: { color: '#F5F6F7' } }} value={userDetails.email} onChange={e => handleInput('email', e.target.value)} error={formFieldError.email} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label='Password' variant='standard' required type='password' InputLabelProps={{ style: { color: '#F5F6F7' } }} value={userDetails.password} onChange={e => handleInput('password', e.target.value)} error={formFieldError.password} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField label='Confirm Password' variant='standard' required type='password' InputLabelProps={{ style: { color: '#F5F6F7' } }} value={userDetails.confirmPassword} onChange={e => handleInput('confirmPassword', e.target.value)} error={formFieldError.confirmPassword} />
                            </Grid>
                            <Grid item xs={12} sx={{ marginTop: '1rem' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Box>
                                        <FormControl>
                                            <FormLabel sx={{ color: '#f5faff' }}>Are you a musician or a fan?</FormLabel>
                                            <RadioGroup row value={userDetails.musicianOrFan} onChange={e => handleInput('musicianOrFan', e.target.value)}>
                                                <FormControlLabel value='musician' control={<Radio />} label='musician' />
                                                <FormControlLabel value='fan' control={<Radio />} label='fan' />
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                    <Box>
                                        <Button variant='outlined' sx={{ p: 1.25 }} component='label'>
                                            Add photo
                                            <Avatar sx={{ ml: 2 }}>{avatarFile ? <img src={avatarPreview} style={{ width: '50px', objectFit: 'cover' }} /> : <PersonOutlineIcon />}</Avatar>
                                            <input type="file" hidden onChange={e => handleAvatarUpload(e)} />
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mx: 15 }}>
                            <Button variant='outlined' onClick={() => navigate('/login')} >Log in</Button>
                            <Button variant='outlined' type='submit'>Register</Button>
                        </Box>
                        <UseOAuth />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
