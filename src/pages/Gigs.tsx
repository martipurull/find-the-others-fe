import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'
import GigApplication from '../components/GigApplication'

const gigs = [
    { gigName: 'A gig', instrumentRequired: 'drums', expectedHours: 4, userHasApplied: false },
    { gigName: 'Another gig', instrumentRequired: 'bass', expectedHours: 2, userHasApplied: true },
    { gigName: 'Yet another gig', instrumentRequired: 'rhythm guitar', expectedHours: 1, userHasApplied: false },
    { gigName: 'Choir for rock song', instrumentRequired: 'singer', expectedHours: 2, userHasApplied: false }
]


export default function Gigs() {
    const navigate = useNavigate()

    return (
        <Container maxWidth="xl" sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                    <Typography component='h1' variant='h3' sx={{ mt: 3 }}>Find collaboration opportunities</Typography>

                    <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <Grid item xs={9}>
                            <FormControl variant='standard' fullWidth>
                                <InputLabel htmlFor='gig-search-field'>Search for gigs</InputLabel>
                                <Input id='gig-search-field' startAdornment={<InputAdornment position='start'><SearchIcon /></InputAdornment>} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={9}>
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
                                            <GigApplication hasApplied={gig.userHasApplied} />
                                        </ListItem>
                                    </Box>
                                ))}
                            </List>
                            <Typography component='h3' variant='h6' sx={{ mt: 3 }}>Looking for musicians for your own project?</Typography>
                            <Button color='primary' size='large' variant='contained' sx={{ mt: 3, mb: 3 }} onClick={() => navigate('/new-gig')}>OFFER A GIG</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
