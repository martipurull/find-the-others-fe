import { useState } from 'react'
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import FTOLogo from '../assets/find-the-others-logo_1_1_1.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IInitialState } from '../types'
import { clearUserInfoAction, userLogoutAction } from '../redux/actions/actions'

export default function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const musicianOrFan = useSelector((state: IInitialState) => state.user.currentUser?.musicianOrFan)
    const loggedUser = useSelector((state: IInitialState) => state.user.currentUser)

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleLogout = () => {
        dispatch(userLogoutAction())
        dispatch(clearUserInfoAction())
        navigate('/')
    }

    return (
        <AppBar position="sticky" sx={{ backgroundColor: '#f5faff' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{ height: 30, width: 32, mr: 1, mb: 0.25 }}
                        component='img'
                        src={FTOLogo}
                        alt='Company Logo'
                    >
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        {
                            musicianOrFan === 'musician'
                                ?
                                <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>

                                    <MenuItem onClick={() => navigate('/')}>
                                        <Typography textAlign="center">Dashboard</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate('/gigs')}>
                                        <Typography textAlign="center">Gigs</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate('/bands')}>
                                        <Typography textAlign="center">Bands</Typography>
                                    </MenuItem>
                                </Menu>
                                :
                                <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
                                    <MenuItem onClick={() => navigate('/')}>
                                        <Typography textAlign="center">Home</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate('/bands')}>
                                        <Typography textAlign="center">Bands</Typography>
                                    </MenuItem>
                                </Menu>
                        }
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        FTO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {musicianOrFan === 'musician'
                            ?
                            <>
                                <Button onClick={() => navigate('/')} sx={{ my: 2, color: '#233243', display: 'block' }}>Dashboard</Button>
                                <Button onClick={() => navigate('/gigs')} sx={{ my: 2, color: '#233243', display: 'block' }}>Gigs</Button>
                                <Button onClick={() => navigate('/bands')} sx={{ my: 2, color: '#233243', display: 'block' }}>Bands</Button>
                            </>
                            :
                            <>
                                <Button onClick={() => navigate('/')} sx={{ my: 2, color: '#233243', display: 'block' }}>Dashboard</Button>
                                <Button onClick={() => navigate('/bands')} sx={{ my: 2, color: '#233243', display: 'block' }}>Bands</Button>
                            </>
                        }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, }}>
                                <Avatar alt="Remy Sharp" src={loggedUser?.avatar} />
                                <Typography variant="body2" sx={{ color: '#233243', ml: 2, fontWeight: 'bold', fontSize: 12 }}>{loggedUser?.firstName} {loggedUser?.lastName}</Typography>
                            </IconButton>
                        </Tooltip>
                        {
                            musicianOrFan === 'musician'
                                ?
                                <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>

                                    <MenuItem onClick={() => { navigate('/me'); handleCloseUserMenu() }}>
                                        <Typography sx={{ color: '#F5F6F7' }} textAlign="center">Profile</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => { navigate('/new-gig'); handleCloseUserMenu() }}>
                                        <Typography sx={{ color: '#F5F6F7' }} textAlign="center">Create New Gig</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => { navigate('/new-project'); handleCloseUserMenu() }}>
                                        <Typography sx={{ color: '#F5F6F7' }} textAlign="center">Create New Project</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => { navigate('/new-band'); handleCloseUserMenu() }}>
                                        <Typography sx={{ color: '#F5F6F7' }} textAlign="center">Create New Band</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography sx={{ color: '#F5F6F7' }} textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                                :
                                <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right', }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                                    <MenuItem onClick={() => { navigate('/me'); handleCloseUserMenu() }}>
                                        <Typography sx={{ color: '#F5F6F7' }} textAlign="center">Profile</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography sx={{ color: '#F5F6F7' }} textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                        }

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
