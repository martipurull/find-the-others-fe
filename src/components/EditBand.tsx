import Button from '@mui/material/Button'
import { ChangeEvent, FormEvent, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import { Theme, useTheme } from '@mui/material/styles'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { notifyError } from '../hooks/useNotify'
import useAxios from '../hooks/useAxios'
import { useNavigate } from 'react-router-dom'
import { IBand, IBandDetails, IInitialState } from '../types'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto'
import IconButton from '@mui/material/IconButton'
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp'
import { useSelector } from 'react-redux'

function addSelectedStyle(name: string, collaborators: string[], theme: Theme) {
    return { fontWeight: collaborators.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightBold }
}

interface IProps {
    band: IBand
}

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

export default function EditBand({ band }: IProps) {
    const { axiosRequest } = useAxios()
    const navigate = useNavigate()
    const loggedUser = useSelector((state: IInitialState) => state.user.currentUser)
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const theme = useTheme()
    const [bandAdminId, setBandAdminId] = useState<string[]>([])
    const [bandMemberId, setBandMemberId] = useState<string[]>([])
    const [avatarFile, setAvatarFile] = useState<File>()
    const [avatarPreview, setAvatarPreview] = useState<string>('')

    const bandAdminIds = band.bandAdmins.map(admin => admin._id)
    const bandMemberIds = band.members.map(member => member._id)

    const [bandDetails, setBandDetails] = useState<IBandDetails>({
        name: band.name || '',
        bandAdminIds: bandAdminIds || bandAdminId,
        memberIds: bandMemberIds || bandMemberId,
        bio: band.bio || '',
        blurb: band.blurb || ''
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
        for (let i = 0; i < bandDetails.bandAdminIds.length; i++) {
            dataToAxios.append('bandAdmins[]', bandDetails.bandAdminIds[i])
        }
        for (let i = 0; i < bandDetails.memberIds.length; i++) {
            dataToAxios.append('members[]', bandDetails.memberIds[i])
        }
        avatarFile && dataToAxios.append('bandAvatar', avatarFile)

        const response = await axiosRequest(`/bands/${band._id}`, 'PUT', dataToAxios)
        if (response.status === 200) {
            navigate('/')
        } else {
            notifyError('Something went wrong, please try again.')
        }
    }

    return (
        <Box sx={{ mx: 1 }}>
            <Button sx={{ mr: 2 }} variant='outlined' endIcon={<EditOutlinedIcon />} onClick={handleOpen}>Edit Band</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Box component='form' noValidate autoComplete='off' sx={modalStyle}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <TextField sx={{ my: 1 }} required label='Band Name' variant='standard' value={bandDetails.name} onChange={e => handleInput('name', e.target.value)} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            {
                                !avatarFile &&
                                <Button variant='contained' sx={{ p: 1.25 }} component='label'>
                                    Add Project Photo
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
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id='multiple-collaborators-select'>Band Admins</InputLabel>
                            <Select labelId='multiple-collaborators-select' id='multiple-bandAdmins-input' multiple value={bandAdminId} onChange={handleChangeBandAdmins} input={<OutlinedInput label='Project Collaborators' />}>
                                {loggedUser?.connections.map((connection) => (
                                    <MenuItem key={connection._id} value={connection._id} style={addSelectedStyle(`${connection.firstName} ${connection.lastName}`, bandAdminId, theme)}>{connection.firstName} {connection.lastName}</MenuItem>
                                ))}
                            </Select>
                            <Typography variant='caption'>by creating a band, you will be one of its admins</Typography>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 200 }}>
                            <InputLabel id='multiple-collaborators-select'>Band Members</InputLabel>
                            <Select labelId='multiple-collaborators-select' id='multiple-collaborators-input' multiple value={bandMemberId} onChange={handleChangeBandMembers} input={<OutlinedInput label='Project Collaborators' />}>
                                {loggedUser?.connections.map((connection) => (
                                    <MenuItem key={connection._id} value={connection._id} style={addSelectedStyle(`${connection.firstName} ${connection.lastName}`, bandMemberId, theme)}>{connection.firstName} {connection.lastName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField fullWidth id="new-band-blurb" label="Band Latest" multiline rows={6} placeholder='We are currently working on this... become a supporter to listen to our work in progress!' value={bandDetails.blurb} onChange={e => handleInput('blurb', e.target.value)} />
                        <TextField fullWidth id="new-band-bio" label="Band Bio" multiline rows={6} placeholder='Write a brief and exciting bio for your band.' value={bandDetails.bio} onChange={e => handleInput('bio', e.target.value)} />
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
                                        <Box component='img' src={avatarPreview} sx={{ ml: 2, maxWidth: '250px', objectFit: 'cover', borderRadius: '5px' }} />
                                    </Box>
                                    :
                                    <Box><InsertPhotoIcon sx={{ fontSize: 150 }} /></Box>
                            }
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Button variant='contained' color='success' fullWidth type='submit' onClick={handleSubmit}>Edit Band</Button>
                            <Button variant='contained' color='warning' fullWidth onClick={handleClose}>Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}