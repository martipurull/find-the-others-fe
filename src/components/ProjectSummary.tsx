import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import MemberList from './MemberList'

export default function ProjectSummary() {
    return (

        <Paper elevation={6} square={true}>
            <Grid container sx={{ mt: 2, mb: 4, p: 1 }}>
                <Grid item xs={8}>
                    <Typography variant='h6' pl={1}>About this project</Typography>
                    <Typography pr={5} pt={1} pl={1} variant='body2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque temporibus vero ea quae sapiente quisquam voluptas? Cumque recusandae sit a quod, nobis illo? Ducimus neque nemo repellendus expedita fuga.</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h6' pl={4} >Members and roles</Typography>
                    <MemberList />
                </Grid>
            </Grid>
        </Paper>
    )
}
