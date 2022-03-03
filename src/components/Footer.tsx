import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

export default function Footer() {
    return (
        <Container maxWidth="xl" sx={{ minWidth: '100%', backgroundColor: '#f5faff', color: '#233243', position: 'static', bottom: 0, padding: 5, mt: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                    Social Media Icons
                    </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                    {new Date().getUTCFullYear()} &copy;find-the-others
                    </Grid>
                <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                    Contact and all that jazz
                    </Grid>
            </Grid>
        </Container>
    )
}
