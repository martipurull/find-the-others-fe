import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import WAvatar from '../assets/WAvatar.jpeg'
import MAvatar from '../assets/MAvatar.jpeg'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

export default function ProjectCards() {
    return (
        <>
            <Grid item xs={12} sm={6} md={3} spacing={4}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Typography variant='h4'>To Do</Typography>
                    <Button><AddCircleOutlineOutlinedIcon fontSize='large' /></Button>
                </Box>
                <Card sx={{ minWidth: 200, maxWidth: 300, my: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6'>Task Title</Typography>
                            <Avatar src={MAvatar} />
                        </Box>
                        <Typography variant='body2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab vero excepturi saepe at soluta quisquam, expedita optio fuga.</Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button size='small' variant='outlined'>Details <KeyboardArrowUpOutlinedIcon /></Button>
                        <Button size='small'><DeleteOutlineIcon /></Button>
                    </CardActions>
                </Card>
                <Card sx={{ minWidth: 200, maxWidth: 300, my: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6'>Task Title</Typography>
                            <Avatar src={WAvatar} />
                        </Box>
                        <Typography variant='body2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab vero excepturi saepe at soluta quisquam, expedita optio fuga.</Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button size='small' variant='outlined'>Details <KeyboardArrowUpOutlinedIcon /></Button>
                        <Button size='small'><DeleteOutlineIcon /></Button>
                    </CardActions>
                </Card>
                <Card sx={{ minWidth: 200, maxWidth: 300, my: 2 }}>
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h6'>Task Title</Typography>
                            <Avatar src={WAvatar} />
                        </Box>
                        <Typography variant='body2'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab vero excepturi saepe at soluta quisquam, expedita optio fuga.</Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button size='small' variant='outlined'>Details <KeyboardArrowUpOutlinedIcon /></Button>
                        <Button size='small'><DeleteOutlineIcon /></Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={2}>
                <Box>
                    <Typography variant='h4'>In Progress</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={2}>
                <Box>
                    <Typography variant='h4'>Done</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} spacing={2}>
                <Box>
                    <Typography variant='h4'>Mixed Track</Typography>
                </Box>
            </Grid>
        </>
    )
}
