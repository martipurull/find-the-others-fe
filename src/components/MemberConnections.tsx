import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import WAvatar from '../assets/WAvatar.jpeg'
import MAvatar from '../assets/MAvatar.jpeg'
import { IConnection } from '../types'

interface IProps {
    connections: IConnection[]
}

export default function MemberConnections({ connections }: IProps) {
    return (
        <List dense sx={{ width: '100%' }}>
            {
                connections.map(connection => (
                    <ListItem key={connection._id}>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar src={connection.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={`${connection.firstName} ${connection.lastName}`} secondary={`Connections: ${connection.connections.length}`} />
                        </ListItemButton>
                    </ListItem>
                ))}
        </List>
    )
}
