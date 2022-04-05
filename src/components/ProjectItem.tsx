import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea, Typography } from '@mui/material'
import ProjectImg from '../assets/projectImg3.jpeg'
import { useNavigate } from 'react-router-dom'
import { IProject } from '../types'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline'

interface IProps {
    projectDetails: IProject
}

export default function ProjectItem({ projectDetails }: IProps) {
    const navigate = useNavigate()
    return (
        <Badge color='info' invisible={projectDetails.isActive && true} badgeContent={<Tooltip title='COMPLETED'><DoneOutlineIcon sx={{ fontSize: 18 }} /></Tooltip>}>
            <Card sx={{ maxWidth: 350, backgroundColor: '#233243', border: '1px solid #f5faff', p: 0.15 }} onClick={() => navigate(`/projects/${projectDetails._id}`)}>
                <CardActionArea sx={{}}>
                    <CardMedia component='img' src={projectDetails.projectImage ? projectDetails.projectImage : ProjectImg} alt='Music Project' sx={{ maxHeight: 210, objectFit: 'cover' }} />
                    <CardContent sx={{ bgcolor: 'rgba(0,0,0,0.6)' }}>
                        <Typography variant='h6' component='div'  >{projectDetails.title}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Badge>
    )
}
