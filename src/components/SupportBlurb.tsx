import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import bandLogo from '../assets/bandLogo.png'

export default function SupportBlurb() {
    return (
        <Paper elevation={6} square sx={{ p: 5 }}>
            <Box sx={{ display: 'flex' }}>
                <Avatar src={bandLogo} alt='band logo' sx={{ bgcolor: 'rgba(0,0,0,0.8)', width: 70, height: 70, objectFit: 'cover' }} />
                <Typography component='h2' variant='h5' ml={2.5} mt={2.5}>Band Name</Typography>
            </Box>
            <Typography component='p' variant='body1' ml={1} mt={2.5}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste accusantium in rerum nobis, nesciunt tempore quibusdam eius cupiditate aspernatur eveniet ipsa, laboriosam, deserunt pariatur labore at sequi sint. Eaque, autem?</Typography>
            <Button color='success' variant='contained' sx={{ mt: 3 }}>SUPPORT</Button>
        </Paper>
    )
}
