import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SendIcon from '@mui/icons-material/Send';

export default function MusicianMenu() {
    return (
        <List component='nav'>
            <ListItemButton>
                <ListItemIcon>
                    <LibraryMusicIcon />
                </ListItemIcon>
                <ListItemText primary='Create New Project' />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <WorkOutlineIcon />
                </ListItemIcon>
                <ListItemText primary='Post A Job' />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <PersonSearchIcon />
                </ListItemIcon>
                <ListItemText primary='Look For Jobs' />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <SendIcon />
                </ListItemIcon>
                <ListItemText primary='Invite To Join' />
            </ListItemButton>
        </List>
    )
}
