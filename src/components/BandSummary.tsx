import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import MemberList from './MemberList'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useState } from 'react'
import TracksToPublish from './TracksToPublish'
import EditBand from './EditBand'
import { IBand, IInitialState } from '../types'
import { useSelector } from 'react-redux'
import useAxios from '../hooks/useAxios'

interface IProps {
    band: IBand
}

export default function BandSummary({ band }: IProps) {
    const { axiosRequest } = useAxios()
    const currentUser = useSelector((state: IInitialState) => state.user.currentUser)
    const isBandAdmin = band.bandAdmins.includes(currentUser!)
    const [triggerFollow, setTriggerFollow] = useState(false)

    const handleFollowAndUnfollow = async () => {
        await axiosRequest(`/bands/${band._id}/follow`, 'POST')
        setTriggerFollow(!triggerFollow)
    }

    return (
        <Paper elevation={6} square>
            <Grid container sx={{ mt: 2, mb: 4, p: 1 }}>
                <Grid item xs={8}>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{ width: '60%', display: 'flex', justifyContent: 'flex-end' }}>
                                <Typography variant='h3' pl={1} textAlign='center'>{band.name.toUpperCase()}</Typography>
                            </Box>
                            <Box sx={{ width: '40%', display: 'flex', justifyContent: 'flex-start' }}>
                                {
                                    currentUser?.followedBands.includes(band._id)
                                        ? <Box ><Button sx={{ ml: 5, mt: 1.75 }} color='primary' variant='outlined' size='small' onClick={handleFollowAndUnfollow} >FOLLOWING</Button></Box>
                                        : <Box ><Button sx={{ ml: 5, mt: 1.75 }} color='success' variant='outlined' size='small' onClick={handleFollowAndUnfollow} >FOLLOW</Button></Box>
                                }
                            </Box>
                        </Box>
                        <Box>

                            <Typography my={2} mx={4} variant='body2'>{band.bio}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', ml: 'auto', mb: 1 }}>
                            {
                                isBandAdmin &&
                                <>
                                    <TracksToPublish />
                                    <EditBand />
                                </>
                            }
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant='h6' pl={4} >Members and roles</Typography>
                    <MemberList connections={band.members} />
                </Grid>
            </Grid>
        </Paper>
    )
}
