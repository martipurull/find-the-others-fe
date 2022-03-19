import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'

export default function UseOAuth() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
            <Button sx={{ width: 300, my: 1 }} variant='contained' color='primary' endIcon={<FacebookIcon />}>Continue with Facebook</Button>
            <Button sx={{ width: 300, my: 1 }} variant='contained' color='primary' endIcon={<GoogleIcon />}>Continue with Google</Button>
        </Box>
    )
}
