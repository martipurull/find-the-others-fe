import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import bandLogo from '../assets/bandLogo.png'
import Typography from '@mui/material/Typography'

const likedBands = [
    {
        bandName: 'The Bloody Foreigners',
        bandMembers: ['Marti', 'Andrew', 'Uri'],
        bandAvatar: bandLogo,
        releasedSongs: 5,
        activeProjects: 2
    },
    {
        bandName: 'Shitty Tits',
        bandMembers: ['Tony', 'Lars', 'Casey', 'Judit', 'Meghan'],
        bandAvatar: bandLogo,
        releasedSongs: 10,
        activeProjects: 0
    },
    {
        bandName: 'Tender Tantrums',
        bandMembers: ['Lyobert', 'Caroline', 'Ashley', 'June'],
        bandAvatar: bandLogo,
        releasedSongs: 5,
        activeProjects: 2
    }
]

export default function BandRecommendations() {
    return (
        <>
            {/* INCLUDE SEARCH BAND BY NAME AND GENRE: RESULTS SHOULD REPLACE DEFAULT RECOMMENDATIONS */}
            <Typography variant='h6' component='h2' sx={{ pl: 1 }}>Discover More Artists</Typography>
            <List component='nav'>
                {
                    likedBands.map(band => (
                        <ListItem sx={{ bgcolor: 'rgba(0,0,0,0.8)', width: '75%' }}>
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: 'rgba(0,0,0,0.8)' }}>
                                        <img src={band.bandAvatar} alt={`${band.bandName} logo`} style={{ width: '50px', objectFit: 'cover' }} />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={band.bandName} />
                            </ListItemButton>
                            <ListItemIcon>
                                <ListItemButton>
                                    Latest
                                <PlayArrowOutlinedIcon />
                                </ListItemButton>
                            </ListItemIcon>
                        </ListItem>
                    ))
                }
            </List>
        </>
    )
}
