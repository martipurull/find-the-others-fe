import Button from '@mui/material/Button'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Avatar from '@mui/material/Avatar'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import ApprovalOutlinedIcon from '@mui/icons-material/ApprovalOutlined'
import Badge from '@mui/material/Badge';
import { IGig } from '../types'
import useAxios from '../hooks/useAxios'
import { notifyError } from '../hooks/useNotify'
import MusicMiniPlayer from './MusicMiniPlayer'

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '55%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}

interface IProps {
    projectId: string
}

export default function ApplicationsReceived({ projectId }: IProps) {
    const { axiosRequest } = useAxios()
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [gigsForProject, setGigsForProject] = useState<IGig[]>()
    const noOfApplications = gigsForProject?.map(gig => gig.noOfApplications).reduce((a, b) => a + b)
    const [openGiveGig, setOpenGiveGig] = useState(false)
    const handleOpenGiveGig = () => setOpenGiveGig(true)
    const handleCloseGiveGig = () => setOpenGiveGig(false)
    const [openRejectApplication, setOpenRejectApplication] = useState(false)
    const handleOpenRejectApplication = () => setOpenRejectApplication(true)
    const handleCloseRejectApplication = () => setOpenRejectApplication(false)

    const fetchGigsForProject = async () => {
        const response = await axiosRequest(`/projects/${projectId}/gigs`, 'GET')
        if (response.status === 200) setGigsForProject(response.data)
    }

    const handleGiveGig = async (gigId: string, applicantId: string) => {
        const response = await axiosRequest(`/gigs/${gigId}/applications/accept`, 'POST', { applicantId })
        if (response.status === 403) notifyError('You can only accept applications you posted.')
        if (response.status === 400 || response.status === 404 || response.status === 401) notifyError('Something went wrong.')
        handleCloseGiveGig()
    }

    const handleRejectApplication = async (gigId: string, applicantId: string) => {
        const response = await axiosRequest(`/gigs/${gigId}/applications/decline`, 'POST', { applicantId })
        if (response.status === 400 || response.status === 404 || response.status === 401) notifyError('Something went wrong.')
        handleCloseRejectApplication()
    }

    useEffect(() => {
        fetchGigsForProject()
    }, [])

    return (
        <Box>
            <Button sx={{ mx: 1 }} variant='outlined' color='primary' onClick={handleOpen} endIcon={noOfApplications && <Badge badgeContent={noOfApplications} color='error'><ApprovalOutlinedIcon /></Badge>}>Received Applications</Button>
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
                    <Typography id="transition-modal-title" variant="h6" component="h2">Respond to gig applications</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <List>
                            {
                                gigsForProject && gigsForProject.map(gig => (gig.applications?.map(application => (
                                    <ListItem key={application._id} sx={{ border: '1px solid #f5faff', my: 2 }}>
                                        <Avatar sx={{ mx: 1 }} src={application.applicant.avatar} />
                                        <Typography sx={{ mx: 1 }} id="transition-modal-title" variant="h6" component="p">{application.applicant.firstName} {application.applicant.lastName}</Typography>
                                        <Typography sx={{ mx: 1 }} id="transition-modal-title" variant="subtitle1" component="p">{gig.instrument}: {gig.specifics}</Typography>

                                        <MusicMiniPlayer audioFile={application.submission.audioFile} />

                                        <Button sx={{ mx: 1 }} variant='contained' size='small' endIcon={<CheckCircleOutlineOutlinedIcon />} color='success' onClick={handleOpenGiveGig}>Give Gig</Button>
                                        <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            open={openGiveGig}
                                            onClose={handleCloseGiveGig}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{ timeout: 500 }}
                                        >
                                            <Box sx={modalStyle}>
                                                <Typography sx={{ my: 1 }} id="transition-modal-title" variant="h4" component="h3">Give Gig To {application.applicant.firstName} {application.applicant.lastName}?</Typography>
                                                <Typography sx={{ my: 1 }} variant='h6' component='h4'>Are you sure you want to give the gig to the applicant?</Typography>
                                                <Typography sx={{ my: 1 }} variant='body1' component='p'>Once you do, the gig will no longer be available for other musicians and {application.applicant.firstName} {application.applicant.lastName} will be part of the project.</Typography>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                                    <Button color='success' variant='contained' onClick={() => handleGiveGig(gig._id!, application.applicant._id)}>Complete Project</Button>
                                                    <Button color='warning' variant='outlined' type='submit' onClick={handleCloseGiveGig}>Cancel</Button>
                                                </Box>
                                            </Box>
                                        </Modal>

                                        <Button sx={{ mx: 1 }} variant='contained' size='small' endIcon={<CancelOutlinedIcon />} color='error' onClick={handleOpenRejectApplication}>Reject Application</Button>
                                        <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            open={openRejectApplication}
                                            onClose={handleCloseRejectApplication}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{ timeout: 500 }}
                                        >
                                            <Box sx={modalStyle}>
                                                <Typography sx={{ my: 1 }} id="transition-modal-title" variant="h4" component="h3">Reject {application.applicant.firstName} {application.applicant.lastName}'s application?</Typography>
                                                <Typography sx={{ my: 1 }} variant='h6' component='h4'>Are you sure you want to reject this application?</Typography>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                                    <Button color='error' variant='contained' onClick={() => handleRejectApplication(gig._id!, application.applicant._id)}>Reject Application</Button>
                                                    <Button color='warning' variant='outlined' type='submit' onClick={handleCloseRejectApplication}>Cancel</Button>
                                                </Box>
                                            </Box>
                                        </Modal>
                                    </ListItem>
                                ))))
                            }

                        </List>
                    </Box>
                    <Button color='primary' variant='outlined' onClick={handleClose}>Close</Button>
                </Box>
            </Modal>
        </Box>
    )
}