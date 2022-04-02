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
import useAxios from '../hooks/useAxios'
import { notifyError, notifySuccess } from '../hooks/useNotify'

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
    const { axiosRequest } = useAxios()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [openWithdrawApplication, setOpenWithdrawApplication] = useState(false)
    const handleOpenWithdrawApplication = () => setOpenWithdrawApplication(true)
    const handleCloseWithdrawApplication = () => setOpenWithdrawApplication(false)

    const handleWithdrawApplication = async (gigId: string) => {
        const response = await axiosRequest(`/gigs/${gigId}/applications/withdraw`, 'POST')
        if (response.status === 200) {
            notifySuccess('Application withdrawn successfully.')
        } else {
            notifyError('Something went wrong.')
        }
    }

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
                                <Button size='small' variant='outlined' color='error' sx={{ mt: 0.5 }} onClick={handleOpenWithdrawApplication}>Withdraw Application</Button>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    open={openWithdrawApplication}
                                    onClose={handleCloseWithdrawApplication}
                                    closeAfterTransition
                                    BackdropComponent={Backdrop}
                                    BackdropProps={{ timeout: 500 }}
                                >
                                    <Box sx={modalStyle}>
                                        <Typography sx={{ my: 1 }} id="transition-modal-title" variant="h4" component="h3">Eithdraw application?</Typography>
                                        <Typography sx={{ my: 1 }} variant='h6' component='h4'>Are you sure you want to withdraw your application for project {application.project.title}?</Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                            <Button color='error' variant='contained' onClick={() => handleWithdrawApplication(application._id)}>Withdraw Application</Button>
                                            <Button color='warning' variant='outlined' type='submit' onClick={handleCloseWithdrawApplication}>Cancel</Button>
                                        </Box>
                                    </Box>
                                </Modal>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))
            }
        </List>
    )
}
