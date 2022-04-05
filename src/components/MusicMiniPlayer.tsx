import { useEffect, useState } from "react"
import { notifyError } from "../hooks/useNotify"
import * as musicMetadata from 'music-metadata-browser'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined'
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

interface IProps {
    audioFile: string
}


export default function MusicMiniPlayer({ audioFile }: IProps) {
    const [audio, setAudio] = useState(new Audio(audioFile))
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
        audio.onloadeddata = () => {
            setAudio(new Audio(audioFile))
            setPosition(audio.currentTime)
            setDuration(audio.duration)
        }
    }, [audioFile])

    useEffect(() => {
        playing ? audio.play() : audio.pause()
    }, [playing])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            {
                typeof duration === 'number' &&
                <div>
                    <Button sx={{ mx: 2, my: 2 }} variant='outlined' size='small' endIcon={playing ? <PauseCircleOutlinedIcon /> : <PlayCircleOutlinedIcon />} onClick={() => setPlaying(!playing)}>Play Submitted Track</Button>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: -1, mx: 4 }}>
                        <TinyText>{formatDuration(position)}</TinyText>
                        <TinyText>{formatDuration(duration - position)}</TinyText>
                    </Box>
                    {/* <Slider
                        aria-label="time-indicator"
                        size="small"
                        value={audio.currentTime}
                        min={0}
                        step={1}
                        max={duration}
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
                    /> */}

                </div>
            }
        </Box>
    )
}
