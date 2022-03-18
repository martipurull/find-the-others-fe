import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea, Typography } from '@mui/material'
import ProjectImg from '../assets/projectImg2.svg'
import { useNavigate } from 'react-router-dom'

export default function ProjectItem() {
    const navigate = useNavigate()
    return (
        <Card sx={{ maxWidth: 350 }} onClick={() => navigate('/projects/1')}>
            <CardActionArea sx={{ backgroundColor: '#233243', border: '1px solid #f5faff', p: 0.15 }}>
                <CardMedia component='img' height='110' image={ProjectImg} alt='Music Project' />
                <CardContent>
                    <Typography variant='h6' component='div' >
                        Project name
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
