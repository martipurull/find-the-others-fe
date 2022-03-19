import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import MPPortrait from '../assets/MPPortrait.jpg'
import Box from '@mui/material/Box'
import PostImg from '../assets/postImg.svg'
import Input from '@mui/material/Input'
import Paper from '@mui/material/Paper'
import WAvatar from '../assets/WAvatar.jpeg'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import Typography from '@mui/material/Typography'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import CommentIcon from '@mui/icons-material/Comment'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import { useState } from 'react'

const ariaLabel = { 'aria-label': 'description' }

export default function MusicianPostList() {
    const [openComment, setOpenComment] = useState(false)
    const [userLikesComment, setUserLikesComment] = useState(false)

    return (
        <Box sx={{ width: '90%', display: 'flex', flexDirection: 'column' }}>
            <Paper elevation={3} square sx={{ display: 'flex', py: 2, px: 1, mb: 1.5, justifyContent: 'space-around', bgcolor: 'rgba(0,0,0,1)' }}>
                <Avatar alt='user name' src={WAvatar} sx={{ mt: 1 }} />
                <Input multiline placeholder='Share your creative thoughts' inputProps={ariaLabel} />
                <Avatar sx={{ mt: 1 }}><AddAPhotoIcon /></Avatar>
            </Paper>
            <List >
                <ListItem alignItems='center' sx={{ bgcolor: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', mb: 1 }}>
                        <ListItemAvatar sx={{ mt: 1.05 }}>
                            <Avatar alt='personAvatar' src={MPPortrait} />
                        </ListItemAvatar>
                        <ListItemText primary="Person Name" secondary='19/03/2022 at 23:12' />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography>Have you heard this guy's work?</Typography>
                    </Box>
                    <Box
                        component='img'
                        sx={{ maxHeight: 150, maxWidth: 150, alignSelf: 'center' }}
                        alt='Music Project'
                        src={PostImg}
                    />
                    <ListItem sx={{ display: 'flex', justifyContent: 'space-around', mt: 3, bgcolor: 'rgba(0,0,0,1)' }}>
                        <ListItemIcon><ListItemButton onClick={() => setUserLikesComment(!userLikesComment)}>{userLikesComment ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}</ListItemButton></ListItemIcon>
                        <ListItemIcon><ListItemButton onClick={() => setOpenComment(!openComment)}><CommentIcon /></ListItemButton></ListItemIcon>
                    </ListItem>
                    {
                        openComment &&
                        <ListItem sx={{ display: 'flex', justifyContent: 'space-around', pt: 0.3, bgcolor: 'rgba(0,0,0,1)' }}>
                            <Avatar alt='user name' src={WAvatar} sx={{ mt: 1, mr: 1, ml: -1 }} />
                            <Input multiline inputProps={ariaLabel} />
                        </ListItem>
                    }
                </ListItem>
            </List>
        </Box>
    )
}
