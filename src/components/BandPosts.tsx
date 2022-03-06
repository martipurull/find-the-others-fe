import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import artistPic from '../assets/artistPic.jpeg'
import MAvatar from '../assets/MAvatar.jpeg'

export default function BandPosts() {
    return (
        <List sx={{ width: '100%', maxWidth: 360 }}>
            {/* MAP THROUGH POSTS BY BANDS FOLLOWED BY LOGGED IN FAN HERE */}
            <ListItem alignItems='center' sx={{ bgcolor: 'rgba(0,0,0,0.6)', ml: 5 }}>
                <ListItemAvatar>
                    <Avatar alt='personAvatar' src={MAvatar} />
                </ListItemAvatar>
                <ListItemText
                    primary="Artist Name"
                    secondary="Just finished working on guitars for this..."
                />
                <Box
                    component='img'
                    sx={{ maxHeight: 150, maxWidth: 150, pl: 1 }}
                    alt='Music Project'
                    src={artistPic}
                />
            </ListItem>
            {/* IF ITEM IS LAST IN ARRAY WHEN MAPPING, DO NOT SHOW THE DIVIDER */}
            <Divider variant='inset' />
        </List>
    )
}
