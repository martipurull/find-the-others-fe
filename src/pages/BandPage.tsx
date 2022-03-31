import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import BandSummary from '../components/BandSummary'
import RecentActivity from '../components/RecentActivity'
import ReleasesList from '../components/ReleasesList'
import SupportBlurb from '../components/SupportBlurb'
import { IBand } from '../types'
import useAxios from '../hooks/useAxios'

export default function BandPage() {
    const { axiosRequest } = useAxios()
    const { bandId } = useParams()
    const [currentBand, setCurrentBand] = useState<IBand>()

    const fetchCurrentBand = async () => {
        const response = await axiosRequest(`/bands/${bandId}`, 'GET')
        setCurrentBand(response.data)
    }
    return (
        <Container maxWidth='xl'>
            <Grid container style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Grid item xs={12}>
                    <BandSummary band={currentBand!} />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={5} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Grid item xs={12} md={3}>
                            <SupportBlurb />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <ReleasesList />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <RecentActivity />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
