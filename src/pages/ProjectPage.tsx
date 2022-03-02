import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import ProjectSummary from '../components/ProjectSummary'
import ProjectCards from '../components/ProjectCards'

export default function ProjectPage() {
    return (
        <Container maxWidth='xl'>
            <Grid container>
                <ProjectSummary />
                <ProjectCards />
            </Grid>
        </Container>
    )
}
