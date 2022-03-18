import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import BandLogo from '../assets/bandLogo.png'
export default function YourBands() {
    return (
        <List dense sx={{ width: '100%' }}>
            {/* MAP THROUGH PROJECT MEMBERS HERE */}
            <ListItem>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar src={BandLogo} />
                    </ListItemAvatar>
                    <ListItemText primary='Band Name' secondary='Followers: 3' />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar src={BandLogo} />
                    </ListItemAvatar>
                    <ListItemText primary='Band Name' secondary='Followers: 89' />
                </ListItemButton>
            </ListItem>
        </List>
    )
}
