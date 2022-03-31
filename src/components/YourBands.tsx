import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import { IMiniBand } from '../types'

interface IProps {
    bands: IMiniBand[]
}

export default function YourBands({ bands }: IProps) {
    return (
        <List dense sx={{ width: '100%' }}>
            {
                bands?.map(band => (
                    <ListItem key={band._id}>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar src={band.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={band.name} secondary={`Followers: ${band.followedBy.length}`} />
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
    )
}
