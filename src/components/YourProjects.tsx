import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import projectAvatar from '../assets/projectImg2.svg'
import { IMiniProject } from '../types'

interface IProps {
    projects: IMiniProject[]
}

export default function YourProjects({ projects }: IProps) {
    return (
        <List dense sx={{ width: '100%' }}>
            {
                projects?.map(project => (
                    <ListItem key={project._id}>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar src={project.projectImage ? project.projectImage : projectAvatar} />
                            </ListItemAvatar>
                            <ListItemText primary={project.title} secondary={`with ${project.members.map(member => `${member.firstName} ${member.lastName} from ${project.bands}.`)}`} />
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
    )
}
