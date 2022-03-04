import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Input from '@mui/material/Input'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'

const categories = ['guitar', 'bass', 'drums', 'keys', 'wind', 'brass', 'strings', 'other']

export default function CreateGig() {
    const [selectedCategory, setSelectedCategory] = useState<string>('select category')
    return (
        <Container maxWidth='md' sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', alignItems: 'flex-start' }}>
            <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Grid item xs={12} md={6} textAlign='center' sx={{ pb: 10 }}>
                    <Typography component='h1' variant='h3'>Create a gig for other musicians to help you with your project</Typography>
                </Grid>
                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item xs={12} md={6}>
                        <Box component='form' noValidate autoComplete='off'>
                            <Grid container spacing={3} >
                                <Grid item xs={12} md={4}>
                                    <TextField required label='Gig Title' variant='standard' placeholder='Rhythm guitar' />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl required variant='standard' sx={{ m: 1, minWidth: 200 }}>
                                        <InputLabel id='category-select'>Gig Category</InputLabel>
                                        <Select labelId='category-select' id='category-select' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                            {categories.map((category, i) => (
                                                <MenuItem key={i} value={category}>{category}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField required label='Instrument specifications' variant='standard' placeholder='Electric guitar' />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField sx={{ width: '100%' }} required label='Gig Description' variant='standard' multiline rows={3} placeholder='Briefly describe what the gig is about: i.e. rhythm guitar for a fast-paced rock song.' />
                                </Grid>
                                <Grid item xs={12} md={6} sx={{ alignSelf: 'flex-end', display: 'flex', justifyContent: 'center' }}>
                                    <Button variant='contained' color='success'>Create New Gig</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
