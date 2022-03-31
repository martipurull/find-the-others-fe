import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import WAvatar from '../assets/WAvatar.jpeg'
import MAvatar from '../assets/MAvatar.jpeg'
import Button from '@mui/material/Button'
import { IMiniUser, IInitialState } from '../types'
import { useSelector } from 'react-redux'

interface IProps {
    connections: IMiniUser[]
}

export default function MemberList({ connections }: IProps) {
    const currentUser = useSelector((state: IInitialState) => state.user.currentUser)

    return (
        <List dense sx={{ width: '100%' }}>
            {connections.map(connection => (
                <ListItem sx={{ display: 'flex' }}>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar src={connection.avatar} />
                        </ListItemAvatar>
                        <ListItemText primary={`${connection.firstName} ${connection.lastName}`} secondary={connection.connections?.length} />
                    </ListItemButton>
                    {currentUser?.connectionsReceived.find(({ _id }) => _id === connection._id) && <Button sx={{ width: '30%' }} size='small' variant='outlined' color='primary'>Connect</Button>}
                    {currentUser?.connectionsSent.find(({ _id }) => _id === connection._id) && <Button sx={{ width: '30%' }} size='small' variant='outlined' color='warning'>Cancel</Button>}
                    {currentUser?.connections.find(({ _id }) => _id === connection._id) && <Button sx={{ width: '30%' }} size='small' variant='outlined' color='success'>Accept</Button>}
                </ListItem>
            ))}
        </List>
    )
}
