import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import projectAvatar from '../assets/projectImg2.svg'

interface IProps {
    projects: [{
        title: string
        _id: string
        projectImage?: string
        members: [{ firstName: string, lastName: string }]
    }]
}

export default function YourProjects({ projects }: IProps) {
    return (
        <List dense sx={{ width: '100%' }}>
            {
                projects.map(project => (
                    <ListItem key={project._id}>
                        <ListItemButton>
                            <ListItemAvatar>
                                <Avatar src={project.projectImage ? project.projectImage : projectAvatar} />
                            </ListItemAvatar>
                            <ListItemText primary={project.title} secondary={`with ${project.members.map(member => `${member.firstName} ${member.lastName}, `)}`} />
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
    )
}
