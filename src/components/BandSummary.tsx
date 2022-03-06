import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import MemberList from './MemberList'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function BandSummary() {
    return (
        <Paper elevation={6} square>
            <Grid container sx={{ mt: 2, mb: 4, p: 1 }}>
                <Grid item xs={8}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography variant='h3' pl={1} textAlign='center'>BAND NAME</Typography>
                        <Box sx={{ ml: 5, mt: 1.75 }}><Button color='success' variant='outlined' size='small' >FOLLOW</Button></Box>
                    </Box>
                    <Typography pr={5} pt={2} px={4} variant='body2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti cumque temporibus vero ea quae sapiente quisquam voluptas? Cumque recusandae sit a quod, nobis illo? Ducimus neque nemo repellendus expedita fuga.</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h6' pl={4} >Members and roles</Typography>
                    <MemberList />
                </Grid>
            </Grid>
        </Paper>
    )
}
