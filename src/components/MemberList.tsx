import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import WAvatar from '../assets/WAvatar.jpeg'
import MAvatar from '../assets/MAvatar.jpeg'
import Button from '@mui/material/Button'

export default function MemberList() {
    const isConnection = true
    const isConnectionSent = true
    const isConnectionReceived = false
    return (
        <List dense sx={{ width: '100%' }}>
            {/* MAP THROUGH PROJECT MEMBERS HERE */}
            <ListItem sx={{ display: 'flex' }}>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar src={WAvatar} />
                    </ListItemAvatar>
                    <ListItemText primary='Member Name' secondary='Member role' />
                </ListItemButton>
                {
                    !isConnection && <Button sx={{ width: '30%' }} size='small' variant='outlined' color='primary'>Connect</Button>

                }
                {
                    isConnectionSent && <Button sx={{ width: '30%' }} size='small' variant='outlined' color='warning'>Cancel</Button>
                }
                {
                    isConnectionReceived && <Button sx={{ width: '30%' }} size='small' variant='outlined' color='success'>Accept</Button>
                }
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
