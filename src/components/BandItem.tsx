import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
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
        <Card sx={{ maxWidth: 350, minHeight: 350, bgcolor: 'rgba(0,0,0,1)', border: '1px solid #f5faff', p: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} onClick={() => navigate(`/bands/${bandDetails._id}`)}>


            <CardMedia component='img' src={bandDetails.avatar ? bandDetails.avatar : BandImg} alt='Band' sx={{ maxHeight: 210, objectFit: 'cover' }} />
            <CardContent sx={{ bgcolor: 'rgba(0,0,0,1)' }}>
                <Typography variant='h6' component='div' >{bandDetails.name}</Typography>
            </CardContent>


        </Card>
    )
}
