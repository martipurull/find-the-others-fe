import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import MemberList from './MemberList'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import EditProject from './EditProject'
import ApplicationsReceived from './ApplicationsReceived'
import { IProject } from '../types'

interface IProps {
    project: IProject
}

export default function ProjectSummary({ project }: IProps) {

    return (

        <Paper elevation={6} square={true}>
            <Grid container sx={{ mt: 2, mb: 4, p: 1 }}>
                <Grid item xs={8}>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant='h6' pl={1}>About this project</Typography>
                            <Typography pr={5} pt={1} pl={1} variant='body2'>{project.description}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', ml: 'auto', mb: 1 }}>
                            <ApplicationsReceived />
                            <EditProject project={project} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h6' pl={4} >Members and roles</Typography>
                    <MemberList connections={project.members} />
                </Grid>
            </Grid>
        </Paper>
    )
}