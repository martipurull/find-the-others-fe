import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import WAvatar from '../assets/WAvatar.jpeg'
import Typography from '@mui/material/Typography'
import { IBand } from '../types'

interface IProps {
    band: IBand
}

export default function RecentActivity({ band }: IProps) {
    return (
        <Paper elevation={6} square sx={{ p: 5 }}>
            <Typography component='h2' variant='h5' sx={{ mb: 2 }} >Ongoing Projects</Typography>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                {/* MAP THROUGH COMPLETED TASKS FOR BAND'S PROJECTS */}
                {
                    band.projects && band.projects.length >= 1 ? band.projects.map(project => (
                        <ListItem alignItems='center' sx={{ bgcolor: 'rgba(0,0,0,0.6)' }}>
                            <ListItemAvatar>
                                <Avatar alt='personAvatar' src={project.projectImage} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={project.title}
                                secondary={`Collaborating with: ${project.members.map(member => `${member.firstName} ${member.lastName}`)}`}
                            />
                        </ListItem>
                    ))
                        :
                        <>
                            <Typography variant='body1'>Any projects {band.name} is part of will show up here.</Typography>
                            <Typography mt={2} variant='body1'>Stay tuned!</Typography>
                        </>
                }
            </List>
        </Paper >
    )
}
