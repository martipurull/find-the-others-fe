import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import WAvatar from '../assets/WAvatar.jpeg'
import MAvatar from '../assets/MAvatar.jpeg'

export default function MemberList() {
    return (
        <List dense sx={{ width: '100%' }}>
            {/* MAP THROUGH PROJECT MEMBERS HERE */}
            <ListItem>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar src={WAvatar} />
                    </ListItemAvatar>
                    <ListItemText primary='Member Name' secondary='Member role' />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar src={MAvatar} />
                    </ListItemAvatar>
                    <ListItemText primary='Member Name' secondary='Member role' />
                </ListItemButton>
            </ListItem>
        </List>
    )
}