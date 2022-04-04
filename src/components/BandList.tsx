import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import { IBand } from '../types'
import BandCard from './BandCard'
import useAxios from '../hooks/useAxios'

export default function BandList() {
    const { axiosRequest } = useAxios()
    const [bandsUserFollows, setBandsUserFollows] = useState<IBand[]>()

    const fetchBandsUserFollows = async () => {
        const response = await axiosRequest('/bands/followed-bands', 'GET')
        setBandsUserFollows(response.data)
    }

    useEffect(() => {
        fetchBandsUserFollows()
    }, [])
    return (
        <Container maxWidth='xl' sx={{ marginTop: '5rem' }}>
            <Grid container sx={{ display: 'flex', justifyContent: 'space-around' }}>
                {
                    bandsUserFollows && bandsUserFollows.map(band => (
                        <Grid item xs={12} md={4} sx={{ padding: '1rem 1rem' }}>
                            <BandCard band={band} />
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}
