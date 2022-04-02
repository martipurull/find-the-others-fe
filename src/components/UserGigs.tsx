import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button, Modal, Backdrop } from "@mui/material"
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useState } from "react"
import EditGig from './EditGig'
import { IGig } from "../types"

interface IProps {
    gigs: IGig[]
}

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

export default function UserGigs({ gigs }: IProps) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography component='h2' variant='h4' sx={{ mt: 15, pt: 4, borderTop: '1px solid #f5faff' }}>Gigs you are currently offering</Typography>
            <List sx={{ width: '100%' }}>
                {gigs && gigs.map(gig => (
                    <Box sx={{ borderBottom: '1px solid #f5faff', mb: 2, bgcolor: 'rgba(0,0,0,0.6)' }}>
                        <ListItem>
                            {/* FIND BETTER ICONS FOR INSTRUMENTS AND CREATE FUNCTION TO CHOOSE THE RIGHT ONE */}
                            <ListItemAvatar>
                                <Avatar>
                                    <MusicNoteOutlinedIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={`WANTED: ${gig.instrument} for ${gig.title.toLowerCase()}.`} secondary={`Expected duration: ${gig.hours}${gig.hours > 1 ? ` hours` : ` hour`}`} />
                            <EditGig gig={gig} gigId={gig._id} />
                            <Button sx={{ mx: 1 }} variant='outlined' size='small' color='error' endIcon={<DeleteOutlineOutlinedIcon />} onClick={handleOpen}>DELETE GIG</Button>

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
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                                        <Typography sx={{ my: 2 }} variant='h6'>Are you sure you want to delete this gig?</Typography>
                                        <Typography sx={{ my: 2 }} variant='body1'>The gig will no longer be available for musicians to apply for it.</Typography>
                                        <Button sx={{ my: 2 }} variant='contained' size='small' color='error' endIcon={<DeleteOutlineOutlinedIcon />}>DELETE GIG</Button>
                                    </Box>
                                </Box>
                            </Modal>
                        </ListItem>
                    </Box>
                ))}
            </List>
            {gigs.length === 0 && <Button sx={{ my: 2 }} variant='outlined' size='large' disabled>Currently, you aren't offering any gigs.</Button>}
        </Box>
    )
}
