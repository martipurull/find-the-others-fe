import { Container, Grid } from '@mui/material'
import ProjectItem from './ProjectItem'

export default function MusicianProjectList() {
    return (
        <Container maxWidth='xl' sx={{ marginTop: '5rem' }}>
            <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Grid item xs={12} md={4} sx={{ padding: '1rem 1rem' }}>
                    <ProjectItem />
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: '1rem 1rem' }}>
                    <ProjectItem />
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: '1rem 1rem' }}>
                    <ProjectItem />
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: '1rem 1rem' }}>
                    <ProjectItem />
                </Grid>
                <Grid item xs={12} md={4} sx={{ padding: '1rem 1rem' }}>
                    <ProjectItem />
                </Grid>
            </Grid>
        </Container>
    )
}
