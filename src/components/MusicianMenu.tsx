import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import SpeakerGroupOutlinedIcon from '@mui/icons-material/SpeakerGroupOutlined';

export default function MusicianMenu() {
    return (
        <List component='nav'>
            <ListItem sx={{ bgcolor: 'rgba(0,0,0,0.8)', width: '75%' }}>
                <ListItemButton>
                    <ListItemIcon>
                        <SpeakerGroupOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary='Band Pages' />
                </ListItemButton>
            </ListItem>
            <ListItem sx={{ bgcolor: 'rgba(0,0,0,0.8)', width: '75%' }}>
                <ListItemButton>
                    <ListItemIcon>
                        <LibraryMusicOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary='Create New Project' />
                </ListItemButton>
            </ListItem>
            <ListItem sx={{ bgcolor: 'rgba(0,0,0,0.8)', width: '75%' }}>
                <ListItemButton>
                    <ListItemIcon>
                        <WorkOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary='Post A Job' />
                </ListItemButton>
            </ListItem>
            <ListItem sx={{ bgcolor: 'rgba(0,0,0,0.8)', width: '75%' }}>
                <ListItemButton>
                    <ListItemIcon>
                        <PersonSearchOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary='Look For Jobs' />
                </ListItemButton>
            </ListItem>
            <ListItem sx={{ bgcolor: 'rgba(0,0,0,0.8)', width: '75%' }}>
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
