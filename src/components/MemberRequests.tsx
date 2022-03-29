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
import { IConnection } from '../types'

interface IProps {
    requests: IConnection[]
}

export default function MemberRequests({ requests }: IProps) {
    return (
        <List dense sx={{ width: '100%' }}>
            {
                requests.map(request => (
                    <ListItem key={request._id}>
                        <Box sx={{ width: '65%' }}>
                            <ListItemButton>
                                <ListItemAvatar>
                                    <Avatar src={request.avatar} />
                                </ListItemAvatar>
                                <ListItemText primary={`${request.firstName} ${request.lastName}`} secondary={`Connections: ${request.connections.length}`} />
                            </ListItemButton>
                        </Box>
                        <Button size='small' variant='outlined' color='success'>Accept Request</Button>
                    </ListItem>
                ))
            }
        </List>
    )
}
