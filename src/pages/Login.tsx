import { Container, Alert } from '@mui/material'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import UseOAuth from '../components/UseOAuth'
import { useDispatch } from 'react-redux'
import useAxios from '../hooks/useAxios'
import { FormEvent, useState } from 'react'
import { IUserCredentials } from '../types'
import { userLoginAction } from '../redux/actions/actions'

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { axiosRequest } = useAxios()

    const [loading, setLoading] = useState(false)
    const [userError, setUserError] = useState(false)
    const [invalidDetails, setInvalidDetails] = useState(false)
    const [userCredentials, setUserCredentials] = useState<IUserCredentials>({
        email: '',
        password: ''
    })
    const [loginError, setLoginError] = useState({
        email: false,
        password: false
    })

    const handleInput = (field: string, value: string) => {
        setUserCredentials(credentials => ({
            ...credentials,
            [field]: value
        }))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setUserError(false)
        setInvalidDetails(false)
        setLoginError({ email: false, password: false })
        if (!userCredentials.email) setLoginError(errors => ({ ...errors, email: true }))
        if (!userCredentials.password) setLoginError(errors => ({ ...errors, password: true }))
        if (!userCredentials.email || !userCredentials.password) setUserError(true)

        if (!userError) {
            setLoading(true)
            const response = await axiosRequest('/user/access/login', 'POST', userCredentials)
            if (response.status === 400) {
                setInvalidDetails(true)
                setLoading(false)
            }
            if (response.status === 200) {
                dispatch(userLoginAction())
                setLoading(false)
                navigate('/')
            }
        }
    }

    return (
        <Container maxWidth='md' sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} md={8} sx={{ textAlign: 'center' }}>
                    <Typography component='h1' variant='h2' sx={{ marginBottom: '3rem' }}>Login to <span className='app-name'>find the others</span>...</Typography>

                    {/* ALERTS ON FORM SUBMISSION ERRORS/VALIDATION GO HERE */}

                    <Box component='form' noValidate autoComplete='off' onSubmit={handleSubmit} >
                        <Grid container spacing={3} sx={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Grid item xs={12} md={3}>
                                <TextField label='Email Address' InputLabelProps={{ sx: { color: '#F5F6F7' } }} variant='standard' required type='email' value={userCredentials.email} onChange={e => handleInput('email', e.target.value)} />
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <TextField label='Password' InputLabelProps={{ sx: { color: '#F5F6F7' } }} variant='standard' required type='password' value={userCredentials.password} onChange={e => handleInput('password', e.target.value)} />
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
