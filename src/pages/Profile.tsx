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
import { FormEvent, useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import MemberRequests from '../components/MemberRequests'
import MemberConnections from '../components/MemberConnections'
import YourBands from '../components/YourBands'
import YourProjects from '../components/YourProjects'
import ApplicationsSent from '../components/ApplicationsSent'
import { IInitialState, IEditDetails } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import useAxios from '../hooks/useAxios'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import Alert from '@mui/material/Alert'
import { notifyError, notifySuccess } from '../hooks/useNotify'
import { fetchUserAndAddInfoAction } from '../redux/actions/actions'

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
    const loggedUser = useSelector((state: IInitialState) => state.user.currentUser)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const { axiosRequest } = useAxios()
    const dispatch = useDispatch()

    const [userError, setUserError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [badRequestError, setBadRequestError] = useState(false)
    const [usernameTaken, setUsernameTakenError] = useState(false)
    const [usernameAvailable, setUsernameAvailable] = useState(false)
    const [avatarFile, setAvatarFile] = useState<File>()
    const [avatarPreview, setAvatarPreview] = useState<string>('')
    const [editDetails, setEditDetails] = useState<IEditDetails>({
        firstName: loggedUser?.firstName || '',
        lastName: loggedUser?.lastName || '',
        username: loggedUser?.username || '',
        email: loggedUser?.email || '',
        musicianOrFan: loggedUser?.musicianOrFan || ''
    })
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const [formFieldError, setFormFieldError] = useState({
        firstName: false,
        lastName: false,
        username: false,
        email: false,
    })
    const [passwordFieldError, setPasswordFieldError] = useState({
        newPassword: false,
        confirmNewPassword: false
    })
    const [debouncedUsername] = useDebounce(editDetails.username, 1000)

    const handleCheckUsername = async (usernameDebounced: string) => {
        const response = await axiosRequest('/user/access/check-username', 'POST', { username: usernameDebounced })
        if (response.status === 400) {
            setUsernameAvailable(false)
            setUsernameTakenError(true)
        }
        if (response.status === 200) {
            setUsernameTakenError(false)
            setUsernameAvailable(true)
        }
    }

    useEffect(() => {
        if (editDetails.username !== loggedUser?.username) {
            handleCheckUsername(debouncedUsername)
        } else {
            setUsernameAvailable(false)
            setUsernameTakenError(false)
        }

    }, [debouncedUsername])



    const handleInput = (field: string, value: string) => {
        setEditDetails(details => ({
            ...details,
            [field]: value
        }))
    }

    const handleSubmit = async () => {
        setUserError(false)
        setFormFieldError({ firstName: false, lastName: false, username: false, email: false })

        const { firstName, lastName, username, email } = editDetails
        if (!firstName) setFormFieldError(errors => ({ ...errors, firstName: true }))
        if (!lastName) setFormFieldError(errors => ({ ...errors, lastName: true }))
        if (!username) setFormFieldError(errors => ({ ...errors, username: true }))
        if (!email) setFormFieldError(errors => ({ ...errors, email: true }))
        if (!firstName || !lastName || !username || !email) setUserError(true)

        const dataToAxios = new FormData()
        dataToAxios.append('firstName', editDetails.firstName)
        dataToAxios.append('lastName', editDetails.lastName)
        dataToAxios.append('username', editDetails.username)
        dataToAxios.append('email', editDetails.email)
        dataToAxios.append('musicianOrFan', editDetails.musicianOrFan)
        avatarFile && dataToAxios.append('userAvatar', avatarFile)

        const response = await axiosRequest('/user/me', 'PUT', dataToAxios)
        if (response.status === 400) {
            setBadRequestError(true)
            notifyError('Something went wrong!')
        }
        if (response.status === 404) notifyError('User not found!')
        if (response.status === 200) {
            notifySuccess('Profile successfully updated!')
            dispatch(fetchUserAndAddInfoAction())
        }
    }

    const handlePasswordChange = async () => {
        setPasswordError(false)
        setPasswordFieldError({ newPassword: false, confirmNewPassword: false })
        if (!newPassword) setPasswordFieldError(errors => ({ ...errors, newPassword: true }))
        if (!confirmNewPassword) setPasswordFieldError(errors => ({ ...errors, confirmNewPassword: true }))
        if (!newPassword || !confirmNewPassword || newPassword !== confirmNewPassword) setPasswordError(true)

        const response = await axiosRequest('/user/me/access-password', 'PUT', { password: newPassword })
        if (response.status === 400 || response.status === 404) notifyError('Password could not be updated.')
        if (response.status === 200) notifySuccess('Password successfully updated!')
    }

    return (
        <Container maxWidth='lg' sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
            <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <Grid item xs={12} md={10} style={{ textAlign: 'center' }}>
                    <Typography component='h1' variant='h2' sx={{ mb: 8, mt: 10 }}>Your profile</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {userError && <Alert sx={{ mb: 5 }} variant='outlined' severity='error'>Please make sure you have entered correct information.</Alert>}
                        {passwordError && <Alert sx={{ mb: 5 }} variant='outlined' severity='error'>Please make sure your passwords match!</Alert>}
                        {badRequestError && <Alert sx={{ mb: 5 }} variant='outlined' severity='error'>Something went wrong with your request. Please try again.</Alert>}
                        {debouncedUsername && usernameTaken && <Alert sx={{ mb: 5 }} variant='outlined' severity='error'>This username is already taken. Please use a new one.</Alert>}
                        {debouncedUsername && usernameAvailable && <Alert sx={{ mb: 5 }} variant='outlined' severity='success'>This username is available!</Alert>}
                    </Box>

                    <Box component='form' noValidate autoComplete='off'>
                        <Grid container spacing={3} sx={{ mb: 5, justifyContent: 'center' }}>
                            <Grid item xs={12} md={2}>
                                <TextField label='First Name' variant='standard' required InputLabelProps={{ style: { color: '#F5F6F7' } }} value={editDetails.firstName} onChange={(e) => handleInput('firstName', e.target.value)} error={formFieldError.firstName} />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <TextField label='Last Name' variant='standard' required InputLabelProps={{ style: { color: '#F5F6F7' } }} value={editDetails.lastName} onChange={(e) => handleInput('lastName', e.target.value)} error={formFieldError.lastName} />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <TextField label='Username' variant='standard' required InputLabelProps={{ style: { color: '#F5F6F7' } }} value={editDetails.username} onChange={(e) => handleInput('username', e.target.value)} error={formFieldError.username} />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <TextField label='Email Address' variant='standard' required type='email' InputLabelProps={{ style: { color: '#F5F6F7' } }} value={editDetails.email} onChange={(e) => handleInput('email', e.target.value)} error={formFieldError.email} />
                            </Grid>
                            <Grid item xs={12} md={2}>
                                <Box sx={{ mt: -1 }}>
                                    <FormControl>
                                        <FormLabel sx={{ color: '#f5faff' }}>Musician or fan?</FormLabel>
                                        <RadioGroup row value={editDetails.musicianOrFan} onChange={e => handleInput('musicianOrFan', e.target.value)}>
                                            <FormControlLabel checked={editDetails.musicianOrFan === 'musician'} value='musician' control={<Radio />} label='musician' />
                                            <FormControlLabel checked={editDetails.musicianOrFan === 'fan'} value='fan' control={<Radio />} label='fan' />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
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
                                        <TextField label='New Password' variant='standard' required type='password' InputLabelProps={{ style: { color: '#F5F6F7' } }} onChange={e => setNewPassword(e.target.value)} error={passwordFieldError.newPassword} />
                                        <TextField label='Confirm New Password' variant='standard' required type='password' InputLabelProps={{ style: { color: '#F5F6F7' } }} onChange={e => setConfirmNewPassword(e.target.value)} error={passwordFieldError.confirmNewPassword} />
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                            <Button color='success' variant='outlined' onClick={handleClose}>Change Password</Button>
                                            <Button color='warning' variant='outlined' type='submit' onClick={handlePasswordChange}>Cancel</Button>
                                        </Box>
                                    </Box>
                                </Modal>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button fullWidth variant='outlined' sx={{ p: 1, mt: 1 }}>Change Avatar <Avatar sx={{ ml: 2 }}>{loggedUser?.avatar ? <Box component='img' sx={{ maxHeight: '45px', objectFit: 'cover' }} src={loggedUser.avatar} /> : <PersonOutlineIcon />}</Avatar></Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>Your Connections</Typography>
                                <MemberConnections connections={loggedUser!.connections} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>Connection Requests</Typography>
                                <MemberRequests requests={loggedUser!.connectionsReceived} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>Your Bands</Typography>
                                <YourBands bands={loggedUser!.memberOf} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>Your Projects</Typography>
                                <YourProjects projects={loggedUser!.projects} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>Applications Sent</Typography>
                                <ApplicationsSent applications={loggedUser!.applications} />
                            </Grid>
                        </Grid>
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mx: 15 }}>
                            <Button color='warning' variant='outlined' type='submit' onClick={() => navigate('/')}>Cancel</Button>
                            <Button color='success' variant='outlined' type='submit' onClick={handleSubmit}>Save Changes</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
