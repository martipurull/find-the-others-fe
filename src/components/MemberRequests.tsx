import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import WAvatar from '../assets/WAvatar.jpeg'
import MAvatar from '../assets/MAvatar.jpeg'

export default function MemberRequests() {
    return (
        <List dense sx={{ width: '100%' }}>
            {/* MAP THROUGH PROJECT MEMBERS HERE */}
            <ListItem>
                <Box sx={{ width: '65%' }}>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar src={WAvatar} />
                        </ListItemAvatar>
                        <ListItemText primary='Member Name' secondary='Band One, Band Two, Band Three' />
                    </ListItemButton>
                </Box>
                <Button size='small' variant='outlined' color='success'>Accept Request</Button>
            </ListItem>
            <ListItem>
                <Box sx={{ width: '65%' }}>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar src={MAvatar} />
                        </ListItemAvatar>
                        <ListItemText primary='Member Name' secondary='Band One, Band Two' />
                    </ListItemButton>
                </Box>
                <Button size='small' variant='outlined' color='success'>Accept Request</Button>
            </ListItem>
        </List>
    )
}
