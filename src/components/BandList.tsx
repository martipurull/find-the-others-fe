import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import BandCard from './BandCard'

export default function BandList() {
    return (
        <Container maxWidth='xl' sx={{ marginTop: '5rem' }}>
            <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Grid item xs={12} md={4} sx={{ padding: '1rem 1rem' }}>
                    <BandCard />
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: '1rem 1rem' }}>
                    <BandCard />
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: '1rem 1rem' }}>
                    <BandCard />
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: '1rem 1rem' }}>
                    <BandCard />
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: '1rem 1rem' }}>
                    <BandCard />
                </Grid>
            </Grid>
        </Container>
    )
}
