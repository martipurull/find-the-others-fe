import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined'
import EditGig from '../components/EditGig'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'

const categories = ['guitar', 'bass', 'drums', 'keys', 'wind', 'brass', 'strings', 'other']

const gigs = [
    { gigName: 'A gig', instrumentRequired: 'drums', expectedHours: 4 },
    { gigName: 'Another gig', instrumentRequired: 'bass', expectedHours: 2 },
    { gigName: 'Yet another gig', instrumentRequired: 'rhythm guitar', expectedHours: 1 },
    { gigName: 'Choir for rock song', instrumentRequired: 'singer', expectedHours: 2 }
]

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

export default function CreateGig() {
    const [selectedCategory, setSelectedCategory] = useState<string>('select category')
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <Container maxWidth='md' sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', alignItems: 'flex-start' }}>
            <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Grid item xs={12} md={6} textAlign='center' sx={{ pb: 10 }}>
                    <Typography component='h1' variant='h3'>Create a gig for other musicians to help you with your project</Typography>
                </Grid>
                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={12} md={6}>
                        <Box component='form' noValidate autoComplete='off'>
                            <Grid container spacing={6} >
                                <Grid item xs={12} md={3}>
                                    <TextField required label='Gig Title' variant='standard' placeholder='Rhythm guitar' />
                                </Grid>
                                <Grid item xs={12} md={3}>
                                    <FormControl required variant='standard' sx={{ m: 1, minWidth: 200 }}>
                                        <InputLabel id='category-select'>Gig Category</InputLabel>
                                        <Select labelId='category-select' id='category-select' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                            {categories.map((category, i) => (
                                                <MenuItem key={i} value={category}>{category}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {
                                    selectedCategory === 'other' &&
                                    <Grid item xs={12} md={3}>
                                        <TextField required label='Please specify' variant='standard' placeholder='xylophone' />
                                    </Grid>
                                }
                                <Grid item xs={12} md={3}>
                                    <TextField required label='Instrument specifications' variant='standard' placeholder='Electric guitar' />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField sx={{ width: '100%' }} required label='Gig Description' variant='standard' multiline rows={3} placeholder='Briefly describe what the gig is about: i.e. rhythm guitar for a fast-paced rock song.' />
                                </Grid>
                                <Grid item xs={12} md={6} sx={{ alignSelf: 'flex-end', display: 'flex', justifyContent: 'center' }}>
                                    <Button variant='contained' color='success'>Create New Gig</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} textAlign='center' sx={{ pb: 4, mx: 50 }}>
                    <Typography component='h2' variant='h4' sx={{ mt: 15, pt: 4, borderTop: '1px solid #f5faff' }}>Gigs you are currently offering</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <List sx={{ width: '100%' }}>
                        {gigs.map(gig => (
                            <Box sx={{ borderBottom: '1px solid #f5faff', mb: 2, bgcolor: 'rgba(0,0,0,0.6)' }}>
                                <ListItem>
                                    {/* FIND BETTER ICONS FOR INSTRUMENTS AND CREATE FUNCTION TO CHOOSE THE RIGHT ONE */}
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MusicNoteOutlinedIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={`WANTED: ${gig.instrumentRequired} for ${gig.gigName.toLowerCase()}.`} secondary={`Expected duration: ${gig.expectedHours}${gig.expectedHours > 1 ? ` hours` : ` hour`}`} />
                                    <EditGig />
                                    <Button sx={{ mx: 1 }} variant='outlined' size='small' color='error' endIcon={<DeleteOutlineOutlinedIcon />} onClick={handleOpen}>DELETE GIG</Button>
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
                                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                                                <Typography sx={{ my: 2 }} variant='h6'>Are you sure you want to delete this gig?</Typography>
                                                <Typography sx={{ my: 2 }} variant='body1'>The gig will no longer be available for musicians to apply for it.</Typography>
                                                <Button sx={{ my: 2 }} variant='contained' size='small' color='error' endIcon={<DeleteOutlineOutlinedIcon />}>DELETE GIG</Button>
                                            </Box>
                                        </Box>
                                    </Modal>
                                </ListItem>
                            </Box>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </Container>
    )
}
