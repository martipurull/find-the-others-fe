import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import projectAvatar from '../assets/projectImg2.svg'

export default function YourProjects() {
    return (
        <List dense sx={{ width: '100%' }}>
            {/* MAP THROUGH PROJECT MEMBERS HERE */}
            <ListItem>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar src={projectAvatar} />
                    </ListItemAvatar>
                    <ListItemText primary='Project Title' secondary='with Member One, Member Two, Member Three, Member Four, Member Five, Member Six' />
                </ListItemButton>
            </ListItem>
            <ListItem>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar src={projectAvatar} />
                    </ListItemAvatar>
                    <ListItemText primary='Project Title' secondary='with Member One, Member Two, Member Three, Member Four' />
                </ListItemButton>
            </ListItem>
        </List>
    )
}
