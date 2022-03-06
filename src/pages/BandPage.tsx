import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import BandSummary from '../components/BandSummary'

export default function BandPage() {
    return (
        <Container maxWidth='xl'>
            <Grid container style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Grid item xs={12}>
                    <BandSummary />
                </Grid>
            </Grid>
        </Container>
    )
}
