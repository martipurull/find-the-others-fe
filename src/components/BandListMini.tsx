import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import WAvatar from '../assets/WAvatar.jpeg'
import MAvatar from '../assets/MAvatar.jpeg'
import Button from '@mui/material/Button'
import { useSelector, useDispatch } from 'react-redux'
import { IInitialState, IMiniBand } from '../types'
import useAxios from '../hooks/useAxios'
import { fetchUserAndAddInfoAction } from '../redux/actions/actions'

interface IProps {
    bands: IMiniBand[]
}

export default function BandListMini({ bands }: IProps) {
    const { axiosRequest } = useAxios()
    const dispatch = useDispatch()
    const currentUser = useSelector((state: IInitialState) => state.user.currentUser)

    const handleFollowAndUnfollow = async (bandId: string) => {
        await axiosRequest(`/bands/${bandId}/follow`, 'POST')
        dispatch(fetchUserAndAddInfoAction())
    }

    return (
        <List dense sx={{ width: '100%' }}>
            {
                bands.map(band => (
                    <ListItem key={band._id} sx={{ display: 'flex' }}>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar src={band.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={band.name} secondary={`Followers: ${band.noOfFollowers}`} />
                        </ListItemButton>
                        {
                            currentUser?.followedBands.includes(band._id)
                                ? <Button sx={{ mt: 1.75 }} color='primary' variant='outlined' size='small' onClick={() => handleFollowAndUnfollow(band._id)} >FOLLOWING</Button>
                                : <Button sx={{ mt: 1.75 }} color='success' variant='outlined' size='small' onClick={() => handleFollowAndUnfollow(band._id)} >FOLLOW</Button>
                        }
                    </ListItem>
                ))
            }
        </List>
    )
}
