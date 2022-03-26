import { Box, Container, Grid, Typography } from '@mui/material'
import ProjectItem from './ProjectItem'
import useAxios from '../hooks/useAxios'
import { useDispatch } from 'react-redux'
import { addUserProjectsAction } from '../redux/actions/actions'
import { useEffect, useState } from 'react'
import { IProject } from '../types'

export default function MusicianProjectList() {
    const dispatch = useDispatch()
    const { axiosRequest } = useAxios()
    const [projectList, setProjectList] = useState<IProject[]>([])

    const fetchUserProjects = async () => {
        const response = await axiosRequest('/projects', 'GET')
        setProjectList(response.data)
        dispatch(addUserProjectsAction(response.data))
    }

    useEffect(() => {
        fetchUserProjects()
    }, [])

    return (
        <Container maxWidth='xl' sx={{ marginTop: '5rem' }}>
            <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
                {
                    projectList.length !== 0
                        ? projectList.map((project => (
                            <Grid item xs={12} md={4} sx={{ p: 1 }}>
                                <ProjectItem key={project._id} projectDetails={project} />
                            </Grid>
                        )))
                        : <Box sx={{ backgroundColor: '#233243', border: '1px solid #f5faff', p: 5, borderRadius: 5 }}>
                            <Typography variant='h4'>Press CREATE NEW PROJECT to start your new collaboration</Typography>
                        </Box>
                }
            </Grid>
        </Container>
    )
}
