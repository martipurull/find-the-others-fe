import { Box, Container, Grid, Typography } from '@mui/material'
import useAxios from '../hooks/useAxios'
import { useDispatch } from 'react-redux'
import { addUserProjectsAction } from '../redux/actions/actions'
import { useEffect, useState } from 'react'
import { IBand } from '../types'
import BandItem from './BandItem'

export default function MusicianBandList() {
    const dispatch = useDispatch()
    const { axiosRequest } = useAxios()
    const [bandList, setBandList] = useState<IBand[]>([])

    const fetchUserBands = async () => {
        const response = await axiosRequest('/bands/my-bands', 'GET')
        setBandList(response.data)
        dispatch(addUserProjectsAction(response.data))
    }

    useEffect(() => {
        fetchUserBands()
    }, [])

    return (
        <Container maxWidth='xl' sx={{ marginTop: '5rem' }}>
            <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
                {
                    bandList.length !== 0
                        ? bandList.map((band => (
                            <Grid key={band._id} item xs={12} md={4} sx={{ p: 1 }}>
                                <BandItem bandDetails={band} />
                            </Grid>
                        )))
                        : <Box sx={{ backgroundColor: '#233243', border: '1px solid #f5faff', p: 5, borderRadius: 5 }}>
                            <Typography variant='h4'>Create a new band to start releasing music from your projects</Typography>
                        </Box>
                }
            </Grid>
        </Container>
    )
}
