import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import PauseIcon from '@mui/icons-material/Pause'
import PlayArrow from '@mui/icons-material/PlayArrow'
import FastForwardIcon from '@mui/icons-material/FastForward'
import FastRewindIcon from '@mui/icons-material/FastRewind'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeDownIcon from '@mui/icons-material/VolumeDown'
import { useEffect, useState } from 'react'
import { IMiniBand } from '../types'
import { notifyError } from '../hooks/useNotify'
import * as musicMetadata from 'music-metadata-browser'

const Widget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 4,
    width: 343,
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
    trackToDate: string
    trackCover: string
    trackName: string
    projectBands: IMiniBand[]
}

export default function MusicPlayer({ trackToDate, trackCover, trackName, projectBands }: IProps) {
    const [audio, setAudio] = useState(new Audio(trackToDate))
    const [playing, setPlaying] = useState(false)

    const [position, setPosition] = useState<number>(audio.currentTime)
    const [duration, setDuration] = useState<number>(audio.duration)

    function formatDuration(seconds: number) {
        const minutes = Math.floor(seconds / 60)
        const secondsLeft = Math.floor(seconds - minutes * 60)
        return `${minutes}:${secondsLeft < 9 ? `0${secondsLeft}` : secondsLeft}`
    }


    const mainIconColour = '#f5faff'

    useEffect(() => {
        playing ? audio.play() : audio.pause()
    }, [playing])

    useEffect(() => {
        audio.onloadeddata = () => {
            setAudio(new Audio(trackToDate))
            setPosition(audio.currentTime)
            setDuration(audio.duration)
        }
    }, [trackToDate])

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            {
                trackToDate ?
                    <Widget>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CoverImage>
                                <img src={trackCover} alt="album cover" />
                            </CoverImage>
                            <Box sx={{ ml: 1.5, minWidth: 0 }}>
                                {
                                    projectBands.length >= 1 &&
                                    <Typography variant='caption' color='text.secondary' fontWeight={500}>{projectBands.length > 1 ? projectBands.map(band => `${band.name} / `) : projectBands[0].name}</Typography>
                                }
                                <Typography noWrap><b>{trackName}</b></Typography>
                            </Box>
                        </Box>
                        <Slider
                            aria-label="time-indicator"
                            size="small"
                            value={audio.currentTime}
                            min={0}
                            step={1}
                            max={audio.duration}
                            onChange={(_, value) => setPosition(value as number)}
                            sx={{
                                color: mainIconColour,
                                height: 4,
                                '& .MuiSlider-thumb': {
                                    width: 8,
                                    height: 8,
                                    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                    '&:before': {
                                        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                    },
                                    '&:hover, &.Mui-focusVisible': {
                                        boxShadow: `0px 0px 0px 8px ${mainIconColour}`,
                                    },
                                    '&.Mui-active': {
                                        width: 20,
                                        height: 20,
                                    },
                                },
                                '& .MuiSlider-rail': {
                                    opacity: 0.28,
                                },
                            }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: -1 }}>
                            <TinyText>{formatDuration(position)}</TinyText>
                            <TinyText>{formatDuration((duration - position))}</TinyText>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: -1 }}>
                            <IconButton aria-label='previous song'>
                                <FastRewindIcon fontSize='large' htmlColor={mainIconColour} />
                            </IconButton>
                            {
                                playing
                                    ?
                                    <IconButton aria-label={'pause'} onClick={() => setPlaying(!playing)}>
                                        <PauseIcon sx={{ fontSize: '3rem' }} htmlColor={mainIconColour} />
                                    </IconButton>
                                    :
                                    <IconButton aria-label={'play'} onClick={() => setPlaying(!playing)}>
                                        <PlayArrow sx={{ fontSize: '3rem' }} htmlColor={mainIconColour} />
                                    </IconButton>
                            }
                            <IconButton aria-label='next song'>
                                <FastForwardIcon fontSize='large' htmlColor={mainIconColour} />
                            </IconButton>
                        </Box>
                        <Stack spacing={2} direction='row' sx={{ mb: 1, px: 1 }} alignItems='center'>
                            <VolumeDownIcon htmlColor={mainIconColour} />
                            <Slider
                                aria-label='Volume'
                                defaultValue={25}
                                sx={{
                                    color: mainIconColour,
                                    '& .MuiSlider-track': { border: 'none' },
                                    '& .MuiSlider-thumb': { width: 24, height: 24, backgroundColor: mainIconColour, '&:before': { boxShadow: '0 4px 8px rgba(0,0,0,0.4)' }, '&:hover, &.Mui-focusVisible, &.Mui-active': { boxShadow: 'none' } }
                                }}
                            />
                            <VolumeUpIcon htmlColor={mainIconColour} />
                        </Stack>
                    </Widget>
                    :
                    <Button size="large" color='error' variant='outlined' disabled>No Track To Date Yet</Button>
            }
        </Box>
    )
}
