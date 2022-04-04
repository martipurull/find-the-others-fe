import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import ALCover from '../assets/algorhythm-cover-small.png'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrow from '@mui/icons-material/PlayArrow'
import FastForwardIcon from '@mui/icons-material/FastForward'
import FastRewindIcon from '@mui/icons-material/FastRewind'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeDownIcon from '@mui/icons-material/VolumeDown'
import { useState } from 'react'
import { IBand, ITrack, ITrackToSend } from '../types'
import MusicPlayerLong from './MusicPlayerLong'


const Widget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 4,
    width: '100%',
    maxWidth: '100%',
    margin: 'auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
    width: 100,
    height: 100,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '100%',
    },
});

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

interface IProps {
    releasedTracks: ITrackToSend[]
    band: IBand
}

export default function ReleasesList({ releasedTracks, band }: IProps) {
    const bandToMiniBand = { _id: band._id, name: band.name, avatar: band.avatar, followedBy: band.followedBy, noOfFollowers: band.noOfFollowers }

    return (
        <Paper elevation={6} square sx={{ p: 5 }}>
            <Typography component='h2' variant='h5' sx={{ mb: 2 }} >Latest Releases</Typography>
            <List sx={{ width: '100%' }}>
                {
                    releasedTracks && releasedTracks.map((track, i) => (
                        <ListItem key={i} alignItems='flex-start'>
                            <MusicPlayerLong trackToDate={track.track.audiofile} trackCover={track.cover.image} trackName={track.trackName} projectBands={[bandToMiniBand]} />
                        </ListItem>
                    ))
                }
            </List>
        </Paper >
    )
}
