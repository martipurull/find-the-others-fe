import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const connections = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

function addSelectedStyle(name: string, bandMembers: string[], theme: Theme) {
    return { fontWeight: bandMembers.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightBold }
}

export default function CreateBand() {
    const theme = useTheme()
    const [bandLeader, setBandLeader] = useState<string>('')
    const [bandMembers, setBandMembers] = useState<string[]>([])

    const handleChange = (event: SelectChangeEvent<typeof bandMembers>) => {
        const { target: { value } } = event
        setBandMembers(typeof value === 'string' ? value.split(',') : value)
    }

    return (
        <Container maxWidth='md' sx={{ minHeight: '75vh', minWidth: '100vw', display: 'flex', justifyContent: 'flex-start' }}>
            <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} textAlign='center'>
                    <Typography component='h1' variant='h3'>Start your new band!</Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Box component='form' noValidate autoComplete='off'>
                        <Grid container spacing={8} sx={{ display: 'flex', alignItems: 'space-between' }}>
                            <Grid item xs={12} md={4}>
                                <FormControl sx={{ m: 1, width: 250 }}>
                                    <InputLabel id='band-leader-select'>Band Leader</InputLabel>
                                    <Select labelId='band-leader-select' id='band-leader-input' value={bandLeader} onChange={(e) => setBandLeader(e.target.value)}>
                                        {connections.map((connection, i) => (
                                            <MenuItem key={i} value={connection}>{connection}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField required label='Band Name' variant='standard' />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl sx={{ m: 1, width: 250 }}>
                                    <InputLabel id='multiple-band-members-select'>Band Members</InputLabel>
                                    <Select labelId='multiple-band-members-select' id='multiple-band-members-input' multiple value={bandMembers} onChange={handleChange} input={<OutlinedInput label='Project Band Members' />}>
                                        {connections.map((connection, i) => (
                                            <MenuItem key={i} value={connection} style={addSelectedStyle(connection, bandMembers, theme)}>{connection}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <TextField fullWidth id="new-band-blurb" label="Band Status" multiline rows={6} placeholder='We are currently working on this... become a supporter to listen to our work in progress!' />
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <TextField fullWidth id="new-band-bio" label="Band Bio" multiline rows={6} placeholder='Write a brief and exciting bio for your band.' />
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='contained' color='success' fullWidth>Create New Band</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}
