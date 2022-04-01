import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { IInitialState, IMiniUser } from '../types'
import useAxios from '../hooks/useAxios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserAndAddInfoAction } from '../redux/actions/actions'

interface IProps {
    requests: IMiniUser[]
}

export default function MemberRequests({ requests }: IProps) {
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
                requests?.map(request => (
                    <Box key={request._id} sx={{ my: 1, py: 2, px: 3, bgcolor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <Box component='img' src={request.avatar} sx={{ height: '45px', objectFit: 'cover' }} />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`${request.firstName} ${request.lastName}`} secondary={`Connections: ${request.connections?.length}`} />
                        </ListItem>
                        {currentUser?.connectionsReceived.find(({ _id }) => _id === request._id) &&
                            <Box sx={{ display: 'flex' }}>
                                <Button sx={{ mx: 1 }} size='small' variant='outlined' color='success' onClick={() => handleConnect(request._id, 'accept')}>Accept</Button>
                                <Button sx={{ mx: 1 }} size='small' variant='outlined' color='error' onClick={() => handleConnect(request._id, 'decline')}>Decline</Button>
                            </Box>}
                        {
                            currentUser?.connectionsSent.find(({ _id }) => _id === request._id) &&
                            <Box><Button size='small' variant='outlined' color='warning' onClick={() => handleConnect(request._id, 'cancel')}>Cancel</Button></Box>
                        }
                        {
                            currentUser?.connections.find(({ _id }) => _id === request._id) &&
                            <Box><Button size='small' variant='outlined' color='primary' disabled>You're connected!</Button></Box>
                        }
                        {
                            !currentUser?.connectionsReceived.find(({ _id }) => _id === request._id) && !currentUser?.connectionsSent.find(({ _id }) => _id === request._id) && !currentUser?.connections.find(({ _id }) => _id === request._id) &&
                            <Box><Button size='small' variant='outlined' color='success' onClick={() => handleConnect(request._id, 'sendRequest')}>Connect</Button></Box>
                        }
                    </Box>
                ))
            }
        </List>
    )
}
