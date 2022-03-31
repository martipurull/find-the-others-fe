import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import WAvatar from '../assets/WAvatar.jpeg'
import MAvatar from '../assets/MAvatar.jpeg'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import { IInitialState, IMiniBand } from '../types'

interface IProps {
    bands: IMiniBand[]
}

export default function BandListMini({ bands }: IProps) {
    const isConnection = true
    const isConnectionSent = true
    const isConnectionReceived = false
    const currentUser = useSelector((state: IInitialState) => state.user.currentUser)

    return (
        <List dense sx={{ width: '100%' }}>
            {
                bands.map(band => (
                    <ListItem sx={{ display: 'flex' }}>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar src={band.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={band.name} secondary={`Followers: ${band.noOfFollowers}`} />
                        </ListItemButton>
                        {
                            currentUser?.followedBands.includes(band._id)
                                ? <Button sx={{ width: '30%' }} size='small' variant='outlined' color='error'>Unfollow</Button>
                                : <Button sx={{ width: '30%' }} size='small' variant='outlined' color='success'>Follow</Button>
                        }
                    </ListItem>
                ))
            }
        </List>
    )
}
