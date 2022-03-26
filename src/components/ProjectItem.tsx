import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea, Typography } from '@mui/material'
import ProjectImg from '../assets/projectImg3.jpeg'
import { useNavigate } from 'react-router-dom'
import { IProject } from '../types'

interface IProps {
    projectDetails: IProject
}

export default function ProjectItem({ projectDetails }: IProps) {
    const navigate = useNavigate()
    return (
        <Card sx={{ maxWidth: 350 }} onClick={() => navigate('/projects/1')}>
            <CardActionArea sx={{ backgroundColor: '#233243', border: '1px solid #f5faff', p: 0.15 }}>
                <CardMedia component='img' src={ProjectImg} alt='Music Project' sx={{ maxHeight: 210, objectFit: 'cover' }} />
                <CardContent>
                    <Typography variant='h6' component='div' >
                        Project name
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
