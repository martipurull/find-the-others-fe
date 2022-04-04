import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
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

    useEffect(() => {
        fetchCurrentBand()
    }, [])


    return (
        <Container maxWidth='xl'>
            {currentBand &&
                <Grid container style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Grid item xs={12}>
                        <BandSummary band={currentBand} setterFunction={setCurrentBand} />
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={5} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Grid item xs={12} md={3}>
                                <SupportBlurb band={currentBand} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {
                                    currentBand.releasedTracks && currentBand.releasedTracks.length >= 1 ?
                                        <ReleasesList releasedTracks={currentBand.releasedTracks} band={currentBand} />
                                        :
                                        <Paper elevation={6} square sx={{ p: 5 }}>
                                            <Typography component='h2' variant='h5' sx={{ mb: 2 }} >Latest Releases</Typography>
                                            <Typography component='h2' variant='h6' sx={{ mb: 2 }} >Once you've released one of your ready tracks, it'll appear here.</Typography>
                                        </Paper >
                                }
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <RecentActivity band={currentBand} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            }
        </Container>
    )
}
