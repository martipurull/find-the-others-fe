import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea, Typography } from '@mui/material'
import BandImg from '../assets/bandImg.jpeg'
import { useNavigate } from 'react-router-dom'
import { IBand } from '../types'

interface IProps {
    bandDetails: IBand
}

export default function BandItem({ bandDetails }: IProps) {
    const navigate = useNavigate()
    return (
        <Card sx={{ maxWidth: 350, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} onClick={() => navigate(`/bands/${bandDetails._id}`)}>
            <CardActionArea sx={{ backgroundColor: '#233243', border: '1px solid #f5faff', p: 0.15, height: '100%' }}>
                <CardMedia component='img' src={bandDetails.avatar ? bandDetails.avatar : BandImg} alt='Band' sx={{ minHeight: '60%', objectFit: 'cover' }} />
                <CardContent sx={{ minHeight: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <Typography variant='h6' component='div' >{bandDetails.name}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
