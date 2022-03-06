import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import WAvatar from '../assets/WAvatar.jpeg'
import Typography from '@mui/material/Typography'

export default function RecentActivity() {
    return (
        <Paper elevation={6} square sx={{ p: 5 }}>
            <Typography component='h2' variant='h5' sx={{ mb: 2 }} >Recent Activity</Typography>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                {/* MAP THROUGH COMPLETED TASKS FOR BAND'S PROJECTS */}
                <ListItem alignItems='center' sx={{ bgcolor: 'rgba(0,0,0,0.6)' }}>
                    <ListItemAvatar>
                        <Avatar alt='personAvatar' src={WAvatar} />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Artist Name"
                        secondary="completed TASK for PROJECT"
                    />
                </ListItem>
            </List>
        </Paper >
    )
}
