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
import MAvatar from '../assets/MAvatar.jpeg'
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
    const [userLikesPost, setUserLikesPost] = useState(false)
    const [userLikesComment, setUserLikesComment] = useState(false)

    return (
        <Box sx={{ width: '90%', display: 'flex', flexDirection: 'column' }}>
            <Paper elevation={3} square sx={{ display: 'flex', py: 2, px: 1, mb: 1.5, justifyContent: 'space-around', bgcolor: 'rgba(0,0,0,1)' }}>
                <Avatar alt='user name' src={WAvatar} sx={{ mt: 1 }} />
                <Input multiline placeholder='Share your creative thoughts' inputProps={ariaLabel} />
                <Avatar sx={{ mt: 1 }}><AddAPhotoIcon /></Avatar>
            </Paper>
            <List >
                <Box alignItems='center' sx={{ bgcolor: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-start', p: 2 }}>
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
                        <ListItemIcon><ListItemButton onClick={() => setUserLikesPost(!userLikesPost)}>{userLikesPost ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}</ListItemButton></ListItemIcon>
                        <ListItemIcon><ListItemButton onClick={() => setOpenComment(!openComment)}><CommentIcon /></ListItemButton></ListItemIcon>
                    </ListItem>
                    {
                        openComment &&
                        <Box sx={{ width: '100%' }}>
                            <ListItem sx={{ display: 'flex', justifyContent: 'space-around', pt: 0.3, bgcolor: 'rgba(0,0,0,1)' }}>
                                <Avatar alt='user name' src={WAvatar} sx={{ mt: 1, mr: 1, ml: -1 }} />
                                <Input fullWidth multiline inputProps={ariaLabel} />
                            </ListItem>
                            {/* MAP THROUGH COMMENTS HERE */}
                            <Box sx={{ mt: 1, ml: 4, display: 'flex', border: '1px solid #f5faff', p: -1, borderRadius: 4 }}>
                                <ListItem>
                                    <Avatar alt='user name' src={MAvatar} sx={{ mt: 1, mr: 1, ml: -1 }} />
                                    <Typography variant='body2'>It's really good!</Typography>
                                    <ListItemIcon sx={{ alignSelf: 'flex-end' }}><ListItemButton onClick={() => setUserLikesComment(!userLikesComment)}>{userLikesComment ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}</ListItemButton></ListItemIcon>
                                </ListItem>
                            </Box>
                        </Box>
                    }
                </Box>
            </List>
        </Box>
    )
}
