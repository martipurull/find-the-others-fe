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
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { IAppliedGig, IInitialState } from '../types'
import useAxios from '../hooks/useAxios'
import { notifyError, notifySuccess } from '../hooks/useNotify'
import GigApplication from './GigApplication'
import { chooseIcon } from '../hooks/useUtils'

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
    const handleOpenDetails = () => setOpen(true)
    const handleCloseDetails = () => setOpen(false)
    const [openWithdrawApplication, setOpenWithdrawApplication] = useState(false)
    const handleOpenWithdrawApplication = () => setOpenWithdrawApplication(true)
    const handleCloseWithdrawApplication = () => setOpenWithdrawApplication(false)
    const loggedUser = useSelector((state: IInitialState) => state.user.currentUser)

    const handleWithdrawApplication = async (gigId: string) => {
        const response = await axiosRequest(`/gigs/${gigId}/applications/withdraw`, 'POST')
        if (response.status === 200) {
            notifySuccess('Application withdrawn successfully.')
        } else {
            notifyError('Something went wrong.')
        }
    }

    const hasUserApplied = (gigId: string) => {
        if (!loggedUser) return false
        const userApplicationIds = loggedUser.applications.map(({ _id }) => _id)
        return userApplicationIds.includes(gigId)
    }

    return (
        <List sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
            {
                applications?.map(application => (
                    <Box key={application._id}>
                        <Box sx={{ borderBottom: '1px solid #f5faff', mb: 2, bgcolor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Box>
                                <ListItem onClick={handleOpenDetails}>
                                    <ListItemAvatar>
                                        <Avatar sx={{ width: 50, height: 50, mr: 4 }}>
                                            <Box component='img' src={chooseIcon(application.instrument)} sx={{ maxWidth: 40, objectFit: 'cover' }} />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={`WANTED: ${application.instrument} for ${application.title.toLowerCase()}.`} secondary={`Expected duration: ${application.hours}${application.hours > 1 ? ` hours` : ` hour`}`} />
                                </ListItem>
                            </Box>
                            <Box>
                                <GigApplication hasApplied={hasUserApplied(application._id)} gigId={application._id} />
                            </Box>
                        </Box>

                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={open}
                            onClose={handleCloseDetails}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{ timeout: 500 }}
                        >
                            <Box sx={modalStyle}>
                                <Typography id="transition-modal-title" variant="h6" component="h2">
                                    Gig Description
                                        </Typography>
                                <Typography my={2} id="transition-modal-description" variant="body1">{application.description}</Typography>
                                <Typography my={2} id="transition-modal-description" variant="body2">Genre: {application.genre}</Typography>
                                <Typography my={2} id="transition-modal-description" variant="body2">Project: {application.project.title}</Typography>
                            </Box>
                        </Modal>
                    </Box>
                ))
            }
        </List>
    )
}
