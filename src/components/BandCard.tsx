import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import bandImg from '../assets/bandImg.jpeg'
import bandLogo from '../assets/bandLogo.png'
import { IBand } from '../types'

const exampleBand = {
    bandName: 'The Bloody Foreigners',
    bandMembers: ['Marti', 'Andrew', 'Uri'],
    bandImg: bandImg,
    bandAvatar: bandLogo,
    releasedSongs: 5,
    activeProjects: 2
}

interface IProps {
    band: IBand
}

export default function BandCard({ band }: IProps) {
    const navigate = useNavigate()
    return (
        <Card sx={{ maxWidth: 350 }} onClick={() => navigate(`/bands/${band._id}`)}>
            <CardActionArea sx={{ backgroundColor: '#233243', border: '1px solid #f5faff' }}>
                <CardMedia component='img' height='200' image={band.avatar} alt='Music Project' />
                <CardContent>
                    <Typography variant='h5' component='div' >
                        {band.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
