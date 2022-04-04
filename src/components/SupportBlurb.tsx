import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import bandLogo from '../assets/bandLogo.png'
import { IBand } from '../types'

interface IProps {
    band: IBand
}

export default function SupportBlurb({ band }: IProps) {
    return (
        <Paper elevation={6} square sx={{ p: 4 }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Avatar src={band.avatar} alt='band logo' sx={{ bgcolor: 'rgba(0,0,0,0.8)', minWidth: 70, minHeight: 70, objectFit: 'cover' }} />
                <Typography component='h2' variant='h5' ml={4}>{band.name}</Typography>
            </Box>
            <Typography component='p' variant='body1' ml={1} mt={2.5}>{band.blurb}</Typography>
            <Button color='success' variant='contained' sx={{ mt: 4 }}>SUPPORT</Button>
        </Paper>
    )
}
