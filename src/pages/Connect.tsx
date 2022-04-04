import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import { IInitialState, IUser } from '../types'
import { useDebounce } from 'use-debounce'
import useAxios from '../hooks/useAxios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserAndAddInfoAction } from '../redux/actions/actions'


export default function Connect() {
    const dispatch = useDispatch()
    const { axiosRequest } = useAxios()
    const currentUser = useSelector((state: IInitialState) => state.user.currentUser)
    const [users, setUsers] = useState<IUser[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [debouncedSearchTerm] = useDebounce(searchTerm, 1000)

    const handleSearch = async (term: string) => {
        const response = await axiosRequest('/user/findUsers', 'POST', { searchTerm: term })
        setUsers(response.data)
    }

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

    useEffect(() => {
        debouncedSearchTerm && handleSearch(debouncedSearchTerm)
    }, [debouncedSearchTerm])

    return (
        <Container maxWidth="xl" sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container spacing={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                    <Typography component='h1' variant='h3' sx={{ mt: 3, fontWeight: 'bold' }}>Enter your friend's name or email to connect with them.</Typography>
                    <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                        <Grid item xs={10}>
                            <FormControl variant='standard' fullWidth>
                                <InputLabel htmlFor='contact-search-field'>Search for contacts</InputLabel>
                                <Input id='contact-search-field' startAdornment={<InputAdornment position='start'><SearchIcon /></InputAdornment>} onChange={(e) => setSearchTerm(e.target.value)} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={10}>
                            <List sx={{ width: '100%' }}>
                                {users && users.map(user => (
                                    <Box key={user._id} sx={{ my: 1, py: 2, px: 3, bgcolor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <ListItem>
                                            {/* FIND BETTER ICONS FOR INSTRUMENTS AND CREATE FUNCTION TO CHOOSE THE RIGHT ONE */}
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <Box component='img' src={user.avatar} sx={{ height: '45px', objectFit: 'cover' }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={`${user.firstName} ${user.lastName}`} secondary={user.memberOf.length >= 1 && `Member of: ${user.memberOf.map(band => ` ${band.name}`)}`} />
                                        </ListItem>
                                        {currentUser?.connectionsReceived.find(({ _id }) => _id === user._id) &&
                                            <Box sx={{ display: 'flex' }}>
                                                <Button sx={{ mx: 1 }} size='small' variant='outlined' color='success' onClick={() => handleConnect(user._id, 'accept')}>Accept</Button>
                                                <Button sx={{ mx: 1 }} size='small' variant='outlined' color='error' onClick={() => handleConnect(user._id, 'decline')}>Decline</Button>
                                            </Box>}
                                        {
                                            currentUser?.connectionsSent.find(({ _id }) => _id === user._id) &&
                                            <Box><Button size='small' variant='outlined' color='warning' onClick={() => handleConnect(user._id, 'cancel')}>Cancel</Button></Box>
                                        }
                                        {
                                            currentUser?.connections.find(({ _id }) => _id === user._id) &&
                                            <Box><Button size='small' variant='outlined' color='primary' disabled>You're connected!</Button></Box>
                                        }
                                        {
                                            !currentUser?.connectionsReceived.find(({ _id }) => _id === user._id) && !currentUser?.connectionsSent.find(({ _id }) => _id === user._id) && !currentUser?.connections.find(({ _id }) => _id === user._id) &&
                                            <Box><Button size='small' variant='outlined' color='success' onClick={() => handleConnect(user._id, 'sendRequest')}>Connect</Button></Box>
                                        }
                                    </Box>
                                ))}
                            </List>
                            <Typography component='h3' variant='h6' sx={{ mt: 3 }}>Remember to connect with everyone in your projects and bands.</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
