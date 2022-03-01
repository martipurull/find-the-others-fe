import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MPPortrait from '../assets/MPPortrait.jpg'
import PostImg from '../assets/postImg.svg'
import CardMedia from '@mui/material/CardMedia'

export default function MusicianPostList() {
    return (
        <List sx={{ width: '100%', maxWidth: 360 }}>
            <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                    <Avatar alt='personAvatar' src={MPPortrait} />
                </ListItemAvatar>
                <ListItemText
                    primary="Person Name"
                    secondary="Have you heard this guy's latest work?"
                />
                <CardMedia component='img' height='150' sx={{ display: 'block' }} image={PostImg} alt='Music Project' />
            </ListItem>
            {/* IF ITEM IS LAST IN ARRAY WHEN MAPPING, DO NOT SHOW THE DIVIDER */}
            <Divider variant='inset' />
        </List>
    )
}
