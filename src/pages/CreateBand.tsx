import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import useAxios from '../hooks/useAxios'
import { useNavigate } from 'react-router-dom'
import { IBandDetails, IInitialState } from '../types'
import { useSelector } from 'react-redux'
import { notifyError } from '../hooks/useNotify'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import IconButton from '@mui/material/IconButton'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'

function addSelectedStyle(name: string, bandMembers: string[], theme: Theme) {
    return { fontWeight: bandMembers.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightBold }
}

export default function CreateBand() {
    const { axiosRequest } = useAxios()
    const navigate = useNavigate()
    const loggedUser = useSelector((state: IInitialState) => state.user.currentUser)
    const theme = useTheme()
    const [bandAdminId, setBandAdminId] = useState<string[]>([])
    const [bandMemberId, setBandMemberId] = useState<string[]>([])
    const [avatarFile, setAvatarFile] = useState<File>()
    const [avatarPreview, setAvatarPreview] = useState<string>('')

    const [bandDetails, setBandDetails] = useState<IBandDetails>({
        name: '',
        bio: '',
        blurb: ''
    })

    const handleInput = (field: string, value: string) => {
        setBandDetails(details => ({
            ...details,
            [field]: value
        }))
    }

    const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
        setAvatarFile(e.target.files![0])
        const imgUrl = URL.createObjectURL(e.target.files![0])
        setAvatarPreview(imgUrl)
    }

    const handleRemoveAvatarImg = () => {
        setAvatarFile(undefined)
        URL.revokeObjectURL(avatarPreview)
        setAvatarPreview('')
    }

    const handleChangeBandMembers = (event: SelectChangeEvent<typeof bandMemberId>) => {
        const { target: { value } } = event
        setBandMemberId(typeof value === 'string' ? value.split(',') : value)
        console.log(bandMemberId);
    }

    const handleChangeBandAdmins = (event: SelectChangeEvent<typeof bandAdminId>) => {
        const { target: { value } } = event
        setBandAdminId(typeof value === 'string' ? value.split(',') : value)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const dataToAxios = new FormData()
        dataToAxios.append('name', bandDetails.name)
        dataToAxios.append('blurb', bandDetails.blurb)
        dataToAxios.append('bio', bandDetails.bio)
        dataToAxios.append('bandAdminIds', JSON.stringify(bandAdminId))
        dataToAxios.append('memberIds', JSON.stringify(bandMemberId))
        avatarFile && dataToAxios.append('bandAvatar', avatarFile)

        const response = await axiosRequest('bands', 'POST', dataToAxios)
        if (response.status === 201) {
            navigate('/')
        } else {
            notifyError('Something went wrong, please try again.')
        }
    }

    return (
        <Container maxWidth='md' sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', justifyContent: 'flex-start' }}>
            <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} md={8}>
                    <Typography component='h1' variant='h2' sx={{ mt: 5, mb: 5, textAlign: 'center', fontWeight: 'bold' }}>Start your new band!</Typography>
                    <Box component='form' noValidate autoComplete='off'>
                        <Grid container spacing={8} sx={{ display: 'flex', alignItems: 'space-between' }}>
                            <Grid item xs={12} md={6}>
                                <TextField required label='Band Name' variant='standard' value={bandDetails.name} onChange={e => handleInput('name', e.target.value)} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    {
                                        !avatarFile &&
                                        <Button variant='contained' sx={{ p: 1.25 }} component='label'>
                                            Add Band Logo
                                            <input type="file" hidden onChange={e => handleAvatarUpload(e)} />
                                        </Button>
                                    }
                                    {
                                        avatarFile
                                            ?
                                            <Box sx={{ position: 'relative' }}>
                                                <IconButton sx={{ position: 'absolute', left: '85%', top: '-3%' }} onClick={handleRemoveAvatarImg} ><HighlightOffSharpIcon /></IconButton>
                                                <Box component='img' src={avatarPreview} sx={{ ml: 2, maxWidth: '125px', objectFit: 'cover', borderRadius: '5px' }} />
                                            </Box>
                                            :
                                            <Box><InsertPhotoIcon sx={{ fontSize: 150 }} /></Box>
                                    }
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id='multiple-bandAdmins-select'>Band Admins</InputLabel>
                                    <Select labelId='multiple-bandAdmins-select' id='multiple-bandAdmins-input' multiple value={bandAdminId} onChange={handleChangeBandAdmins} input={<OutlinedInput label='Band admins' />}>
                                        {loggedUser?.connections.map((connection) => (
                                            <MenuItem key={connection._id} value={connection._id} style={addSelectedStyle(`${connection.firstName} ${connection.lastName}`, bandAdminId, theme)}>{connection.firstName} {connection.lastName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl sx={{ m: 1, minWidth: 200 }}>
                                    <InputLabel id='multiple-bandAdmins-select'>Band Members</InputLabel>
                                    <Select labelId='multiple-bandAdmins-select' id='multiple-bandAdmins-input' multiple value={bandMemberId} onChange={handleChangeBandMembers} input={<OutlinedInput label='Band admins' />}>
                                        {loggedUser?.connections.map((connection) => (
                                            <MenuItem key={connection._id} value={connection._id} style={addSelectedStyle(`${connection.firstName} ${connection.lastName}`, bandMemberId, theme)}>{connection.firstName} {connection.lastName}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth id="new-band-blurb" label="Band Latest" multiline rows={6} placeholder='We are currently working on this... become a supporter to listen to our work in progress!' value={bandDetails.blurb} onChange={e => handleInput('blurb', e.target.value)} />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <TextField fullWidth id="new-band-bio" label="Band Bio" multiline rows={6} placeholder='Write a brief and exciting bio for your band.' value={bandDetails.bio} onChange={e => handleInput('bio', e.target.value)} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='contained' color='success' fullWidth type='submit' onClick={handleSubmit}>Create New Band</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
