import Grid from '@mui/material/Grid'
import MusicianMenu from '../components/./MusicianMenu'
import MusicianPostList from '../components/./MusicianPostList'
import Container from '@mui/material/Container'
import MusicianBandList from '../components/MusicianBandList'

export default function Bands() {
    return (
        <Container maxWidth='xl' sx={{ minHeight: '60vh', minWidth: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Grid item xs={12} md={3}>
                    <MusicianMenu />
                </Grid>
                <Grid item xs={12} md={6}>
                    <MusicianBandList />
                </Grid>
                <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <MusicianPostList />
                </Grid>
            </Grid>
        </Container>
    )
}
