import Button from '@mui/material/Button'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import AudiotrackIcon from '@mui/icons-material/Audiotrack'
import Typography from '@mui/material/Typography'

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
    hasApplied: boolean
}

export default function GigApplication({ hasApplied }: IProps) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [open2, setOpen2] = useState(false)
    const handleOpen2 = () => setOpen2(true)
    const handleClose2 = () => setOpen2(false)

    return (
        <Box>
            {
                hasApplied
                    ? <Button variant='outlined' size='small' color='warning' onClick={handleOpen2}>WITHDRAW APPLICATION</Button>
                    : <Button variant='outlined' size='small' color='success' onClick={handleOpen}>APPLY FOR GIG</Button>
            }
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Box component='form' noValidate autoComplete='off' sx={modalStyle}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', my: 2 }}>
                        <Typography variant='h5' sx={{ my: 2 }}>Add a track to show off your talent.</Typography>
                        <Typography variant='body1' sx={{ my: 2 }}>Both the quality of your playing and your production are important!</Typography>
                        <Button sx={{ my: 2, display: 'flex', justifyContent: 'space-around' }} size='small' variant='outlined' color='success'>Add Audio <AudiotrackIcon /></Button>
                        <TextField sx={{ width: '100%', my: 2 }} required label='Application notes' variant='standard' multiline rows={3} placeholder='Anything you have in mind regarding the gig goes here.' />
                        <Button sx={{ mt: 2 }} variant='contained' color='success'>Apply For Gig</Button>
                    </Box>
                </Box>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open2}
                onClose={handleClose2}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Box component='form' noValidate autoComplete='off' sx={modalStyle}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', my: 2 }}>
                        <Typography variant='h5' sx={{ my: 2 }}>Are you sure?</Typography>
                        <Typography variant='body1' sx={{ my: 2 }}>If you withdraw your application for a gig, you will be removed from the list of candidates.</Typography>
                        <Button sx={{ mt: 2 }} variant='contained' color='error'>Withdraw Application</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}