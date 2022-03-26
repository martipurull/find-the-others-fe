import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Link from '@mui/material/Link'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
    const navigate = useNavigate()
    return (
        <Box>
            <Container maxWidth="xl" sx={{ minWidth: '100%', backgroundColor: '#f5faff', color: '#233243', position: 'static', bottom: 0, padding: 3, mt: 3 }}>
                <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Grid item xs={12} sm={4}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <FacebookIcon sx={{ mx: 1 }} />
                            <InstagramIcon sx={{ mx: 1 }} />
                            <TwitterIcon sx={{ mx: 1 }} />
                            <YouTubeIcon sx={{ mx: 1 }} />
                            <LinkedInIcon sx={{ mx: 1 }} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                        {new Date().getUTCFullYear()} &copy;find-the-others
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                            <Link variant='body2' color='inherit' onClick={() => navigate('/')}>Contact</Link>
                            <Link variant='body2' color='inherit' onClick={() => navigate('/')}>Privacy Policy</Link>
                            <Link variant='body2' color='inherit' onClick={() => navigate('/')}>Troubleshooting</Link>
                            <Link variant='body2' color='inherit' onClick={() => navigate('/')}>Careers</Link>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}
