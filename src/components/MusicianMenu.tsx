import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import SpeakerGroupOutlinedIcon from '@mui/icons-material/SpeakerGroupOutlined'
import { useNavigate } from 'react-router-dom'

export default function MusicianMenu() {
    const navigate = useNavigate()

    return (
        <List component='nav'>
            <ListItem sx={{ bgcolor: 'rgba(0,0,0,0.8)', maxWidth: '80%' }}>
                <ListItemButton onClick={() => navigate('/bands')}>
                    <ListItemIcon>
                        <SpeakerGroupOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary='Band Pages' />
                </ListItemButton>
            </ListItem>
            <ListItem sx={{ bgcolor: 'rgba(0,0,0,0.8)', maxWidth: '80%' }}>
                <ListItemButton onClick={() => navigate('/new-project')}>
                    <ListItemIcon>
                        <LibraryMusicOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary='Create New Project' />
                </ListItemButton>
            </ListItem>
            <ListItem sx={{ bgcolor: 'rgba(0,0,0,0.8)', maxWidth: '80%' }}>
                <ListItemButton onClick={() => navigate('/new-gig')}>
                    <ListItemIcon>
                        <WorkOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary='Post A Gig' />
                </ListItemButton>
            </ListItem>
            <ListItem sx={{ bgcolor: 'rgba(0,0,0,0.8)', maxWidth: '80%' }}>
                <ListItemButton onClick={() => navigate('/gigs')}>
                    <ListItemIcon>
                        <PersonSearchOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary='Look For Gigs' />
                </ListItemButton>
            </ListItem>
            <ListItem sx={{ bgcolor: 'rgba(0,0,0,0.8)', maxWidth: '80%' }}>
                {/* THIS BUTTON SHOULD OPEN A MINI MODAL TO INVITE SOMEONE TO JOIN F-T-O */}
                <ListItemButton>
                    <ListItemIcon>
                        <SendOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary='Invite To Join' />
                </ListItemButton>
            </ListItem>
        </List>
    )
}
