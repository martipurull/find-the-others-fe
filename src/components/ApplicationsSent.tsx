import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import Modal from '@mui/material/Modal'
import ListItemText from '@mui/material/ListItemText'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Backdrop from '@mui/material/Backdrop'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { IAppliedGig } from '../types'

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}

interface IProps {
    applications: IAppliedGig[]
}

export default function ApplicationsSent({ applications }: IProps) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <List dense sx={{ width: '100%' }}>
            {
                applications?.map(application => (
                    <ListItem key={application._id}>
                        <Grid container>
                            <ListItemButton onClick={handleOpen}>
                                <Grid item xs={12} md={6}>
                                    <ListItemText primary={application.title} secondary={`Project: ${application.project.title}`} />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <ListItemText primary={`Instrument: ${application.instrument}`} secondary={`Genre: ${application.genre}`} />
                                </Grid>
                            </ListItemButton>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{ timeout: 500 }}
                            >
                                <Box sx={modalStyle}>
                                    <Typography id="transition-modal-title" variant="h6" component="h2">
                                        Gig Description
                            </Typography>
                                    <Typography id="transition-modal-description" variant="body1">{application.description}</Typography>
                                </Box>
                            </Modal>
                            <Grid item xs={12} md={2}>
                                <Button size='small' variant='outlined' color='error' sx={{ mt: 0.5 }}>Withdraw Application</Button>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))
            }
        </List>
    )
}
