import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import ProjectSummary from '../components/ProjectSummary'
import ProjectWorkspace from '../components/ProjectWorkspace'

export default function ProjectPage() {
    return (
        <Container maxWidth='xl'>
            <Grid container style={{ display: 'flex', justifyContent: 'flex-end' }} spacing={2}>
                <Grid item xs={12}>
                    <ProjectSummary />
                </Grid>
                <ProjectWorkspace />
            </Grid>
        </Container>
    )
}
