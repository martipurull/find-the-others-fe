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
import { useDispatch, useSelector } from 'react-redux'
import useAxios from '../hooks/useAxios'
import { fetchUserAndAddInfoAction } from '../redux/actions/actions'

interface IProps {
    band: IBand
    setterFunction: React.Dispatch<React.SetStateAction<IBand | undefined>>
}

export default function BandSummary({ band, setterFunction }: IProps) {
    const { axiosRequest } = useAxios()
    const dispatch = useDispatch()
    const currentUser = useSelector((state: IInitialState) => state.user.currentUser)
    const isBandAdmin = band.bandAdmins.map(({ _id }) => _id).includes(currentUser!._id)

    const handleFollowAndUnfollow = async () => {
        await axiosRequest(`/bands/${band._id}/follow`, 'POST')
        const response = await axiosRequest(`/bands/${band._id}`, 'GET')
        setterFunction(response.data)
        dispatch(fetchUserAndAddInfoAction())
    }

    return (
        <Paper elevation={6} square>
            <Grid container sx={{ mt: 2, mb: 4, p: 1 }}>
                <Grid item xs={8}>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'space-around' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Typography variant='h3' pl={1} >{band.name.toUpperCase()}</Typography>
                            </Box>

                        </Box>
                        <Box>
                            <Box >
                                <Typography my={2} ml={7} variant='body2'>{band.bio}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', ml: 'auto', mb: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography sx={{ mt: 1.75, mr: 1.75 }} variant='body1' pl={1}>{`${band.followedBy && band.followedBy.length > 0 ? band.followedBy.length : 0} followers`}</Typography>
                                    {
                                        currentUser?.followedBands.includes(band._id)
                                            ? <Button sx={{ mt: 1.75 }} color='primary' variant='outlined' onClick={handleFollowAndUnfollow} >FOLLOWING</Button>
                                            : <Button sx={{ mt: 1.75 }} color='success' variant='outlined' onClick={handleFollowAndUnfollow} >FOLLOW</Button>
                                    }
                                </Box>
                                {
                                    isBandAdmin &&
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1.75 }}>
                                        {
                                            band.readyTracks && band.readyTracks.length >= 1 &&
                                            <TracksToPublish bandId={band._id} readyTracks={band.readyTracks} />
                                        }
                                        <EditBand band={band} />
                                    </Box>
                                }
                            </Box>
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
