import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import BandList from './BandList'
import BandPosts from './BandPosts'
import BandRecommendations from './BandRecommendations'

export default function FanDashboard() {
    return (
        <Container maxWidth='xl' sx={{ minHeight: '60vh', minWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid item xs={12} md={3}>
                    <BandRecommendations />
                </Grid>
                <Grid item xs={12} md={6}>
                    <BandList />
                </Grid>
                <Grid item xs={12} md={3}>
                    <BandPosts />
                </Grid>
            </Grid>
        </Container>
    )
}
