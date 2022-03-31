import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProjectSummary from '../components/ProjectSummary'
import ProjectWorkspace from '../components/ProjectWorkspace'
import { IProject } from '../types'
import useAxios from '../hooks/useAxios'

export default function ProjectPage() {
    const { axiosRequest } = useAxios()
    const [currentProject, setCurrentProject] = useState<IProject>()
    const { projectId } = useParams()

    const fetchCurrentProject = async () => {
        const response = await axiosRequest(`/projects/${projectId}`, 'GET')
        setCurrentProject(response.data)
    }

    useEffect(() => {
        fetchCurrentProject()
    }, [])

    return (
        <Container maxWidth='xl'>
            <Grid container style={{ display: 'flex', justifyContent: 'flex-end' }} spacing={2}>
                <Grid item xs={12}>
                    {currentProject && <ProjectSummary project={currentProject} />}
                </Grid>
                {currentProject && <ProjectWorkspace project={currentProject} />}
            </Grid>
        </Container>
    )
}
