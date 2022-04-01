import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { IInitialState, IMiniUser } from '../types'
import useAxios from '../hooks/useAxios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserAndAddInfoAction } from '../redux/actions/actions'

interface IProps {
    connections: IMiniUser[]
}

export default function MemberConnections({ connections }: IProps) {
    const dispatch = useDispatch()
    const { axiosRequest } = useAxios()
    const currentUser = useSelector((state: IInitialState) => state.user.currentUser)

    const handleConnect = async (connectionId: string, instruction: string) => {
        if (instruction === 'accept') {
            await axiosRequest('/user/connect/accept-connection', 'POST', { connectionId })
        } else if (instruction === 'decline') {
            await axiosRequest('/user/connect/decline-connection', 'POST', { connectionId })
        } else if (instruction === 'cancel') {
            await axiosRequest('/user/connect/withdraw-connection', 'POST', { connectionId })
        } else {
            await axiosRequest('/user/connect/send-connection', 'POST', { connectionId })
        }
        dispatch(fetchUserAndAddInfoAction())
    }

    return (
        <List dense sx={{ width: '100%' }}>
            {
                connections?.map(connection => (
                    <Box key={connection._id} sx={{ my: 1, py: 2, px: 3, bgcolor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <Box component='img' src={connection.avatar} sx={{ height: '45px', objectFit: 'cover' }} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`${connection.firstName} ${connection.lastName}`} secondary={`Connections: ${connection.connections?.length}`} />
                        </ListItem>
                        {currentUser?.connectionsReceived.find(({ _id }) => _id === connection._id) &&
                            <Box sx={{ display: 'flex' }}>
                                <Button sx={{ mx: 1 }} size='small' variant='outlined' color='success' onClick={() => handleConnect(connection._id, 'accept')}>Accept</Button>
                                <Button sx={{ mx: 1 }} size='small' variant='outlined' color='error' onClick={() => handleConnect(connection._id, 'decline')}>Decline</Button>
                            </Box>}
                        {
                            currentUser?.connectionsSent.find(({ _id }) => _id === connection._id) &&
                            <Box><Button size='small' variant='outlined' color='warning' onClick={() => handleConnect(connection._id, 'cancel')}>Cancel</Button></Box>
                        }
                        {
                            currentUser?.connections.find(({ _id }) => _id === connection._id) &&
                            <Box><Button size='small' variant='outlined' color='primary' disabled>You're connected!</Button></Box>
                        }
                        {
                            !currentUser?.connectionsReceived.find(({ _id }) => _id === connection._id) && !currentUser?.connectionsSent.find(({ _id }) => _id === connection._id) && !currentUser?.connections.find(({ _id }) => _id === connection._id) &&
                            <Box><Button size='small' variant='outlined' color='success' onClick={() => handleConnect(connection._id, 'sendRequest')}>Connect</Button></Box>
                        }
                    </Box>
                ))}
        </List>
    )
}
