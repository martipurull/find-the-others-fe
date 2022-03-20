import Button from '@mui/material/Button'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Modal from '@mui/material/Modal'
import Backdrop from '@mui/material/Backdrop'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

const categories = ['guitar', 'bass', 'drums', 'keys', 'wind', 'brass', 'strings', 'other']

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

export default function EditGig() {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [selectedCategory, setSelectedCategory] = useState<string>('select category')

    return (
        <Box>
            <Button sx={{ mx: 1 }} variant='outlined' size='small' color='warning' onClick={handleOpen} endIcon={<EditOutlinedIcon />}>EDIT GIG</Button>
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
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <TextField sx={{ my: 2 }} required label='Gig Title' variant='standard' placeholder='Rhythm guitar' />
                        <FormControl required variant='standard' sx={{ my: 2, minWidth: 200 }}>
                            <InputLabel id='category-select'>Gig Category</InputLabel>
                            <Select labelId='category-select' id='category-select' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                {categories.map((category, i) => (
                                    <MenuItem key={i} value={category}>{category}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {
                            selectedCategory === 'other' &&
                            <TextField sx={{ my: 2 }} required label='Please specify' variant='standard' placeholder='xylophone' />
                        }
                        <TextField sx={{ my: 2 }} required label='Instrument specifications' variant='standard' placeholder='Electric guitar' />
                        <TextField sx={{ width: '100%', my: 2 }} required label='Gig Description' variant='standard' multiline rows={3} placeholder='Briefly describe what the gig is about: i.e. rhythm guitar for a fast-paced rock song.' />
                        <Button sx={{ mt: 2 }} variant='contained' color='success'>Create New Gig</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}