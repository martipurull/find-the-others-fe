import { useEffect, useState } from "react"
import { notifyError } from "../hooks/useNotify"
import * as mm from 'music-metadata'
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
    const audio = new Audio(audioFile)
    const [playing, setPlaying] = useState(false)
    const getTrackDuration = async (filePath: string) => {
        try {
            const metadata = await mm.parseFile(filePath)
            return metadata.format.duration
        } catch (error) {
            console.log(error)
            notifyError('Something went wrong when reading the track.')
        }
    }
    const trackDuration = getTrackDuration(audioFile)
    const [position, setPosition] = useState<number>(audio.currentTime)
    function formatDuration(seconds: number) {
        const minutes = Math.floor(seconds / 60)
        const secondsLeft = seconds - minutes * 60
        return `${minutes}:${secondsLeft < 9 ? `0${secondsLeft}` : secondsLeft}`
    }
    const mainIconColour = '#f5faff'

    useEffect(() => {
        playing ? audio.play() : audio.pause()
    }, [playing])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
            {
                typeof trackDuration === 'number' &&
                <div>
                    <Button sx={{ mx: 1 }} variant='outlined' size='small' endIcon={playing ? <PlayCircleOutlinedIcon /> : <PauseCircleOutlinedIcon />} onClick={() => setPlaying(!playing)}>Play Submitted Track</Button>
                    <Slider
                        aria-label="time-indicator"
                        size="small"
                        value={audio.currentTime}
                        min={0}
                        step={1}
                        max={trackDuration}
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
                        <TinyText>{formatDuration(trackDuration - position)}</TinyText>
                    </Box>
                </div>
            }
        </Box>
    )
}
