import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProjectSummary from '../components/ProjectSummary'
import ProjectWorkspace from '../components/ProjectWorkspace'
import { IInitialState, IProject } from '../types'
import useAxios from '../hooks/useAxios'
import { addCurrentProjectInfoAction } from '../redux/actions/actions'
import { useDispatch, useSelector } from 'react-redux'

export default function ProjectPage() {
    const { axiosRequest } = useAxios()
    const dispatch = useDispatch()
    // const [currentProject, setCurrentProject] = useState<IProject>()
    const currentProject = useSelector((state: IInitialState) => state.userProjects.currentProject)
    const { projectId } = useParams()

    const fetchCurrentProject = async () => {
        const response = await axiosRequest(`/projects/${projectId}`, 'GET')
        // setCurrentProject(response.data)
        dispatch(addCurrentProjectInfoAction(response.data))
    }

    useEffect(() => {


        fetchCurrentProject()
    }, [])

    return (
        <Container maxWidth='xl'>
            {
                currentProject &&
                <Grid container spacing={2} sx={{ minHeight: '75vh' }}>
                    <Grid item xs={12} sx={{}} >
                        {currentProject && <ProjectSummary project={currentProject} />}
                    </Grid>
                    <Grid item xs={12} sx={{}}>
                        {currentProject && <ProjectWorkspace project={currentProject} />}
                    </Grid>
                </Grid>
            }
        </Container>
    )
}
