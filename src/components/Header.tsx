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

const musicianPages = [{ text: 'Dashboard', link: '/' }, { text: 'bands', link: '/bands' }, { text: 'Find Gig', link: '/gigs' }]
const musicianSettings = [{ text: 'Profile', link: '/me' }, { text: 'Create Band', link: '/new-band' }, { text: 'Create Project', link: '/new-project' }, { text: 'Logout', link: '/logout' }]

const fanPages = [{ text: 'Home', link: '/' }, { text: 'bands', link: '/bands' }]
const fanSettings = [{ text: 'Profile', link: '/me' }, { text: 'Logout', link: '/logout' }]

export default function Header() {
    const navigate = useNavigate()
    const [isMusician, setIsMusician] = useState(true)

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

    const ftoAppbar = {
        backgroundColor: '#F5F6F7',
        color: '#233243'
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
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {isMusician ?
                                musicianPages.map((page, i) => (
                                    <MenuItem key={i} onClick={() => navigate(page.link)}>
                                        <Typography textAlign="center">{page.text}</Typography>
                                    </MenuItem>
                                )) :
                                fanPages.map((page, i) => (
                                    <MenuItem key={i} onClick={() => navigate(page.link)}>
                                        <Typography textAlign="center">{page.text}</Typography>
                                    </MenuItem>
                                ))}
                        </Menu>
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
                        {isMusician ?
                            musicianPages.map((page, i) => (
                                <Button
                                    key={i}
                                    onClick={() => navigate(page.link)}
                                    sx={{ my: 2, color: '#233243', display: 'block' }}
                                >
                                    {page.text}
                                </Button>
                            )) :
                            fanPages.map((page, i) => (
                                <Button
                                    key={i}
                                    onClick={() => navigate(page.link)}
                                    sx={{ my: 2, color: '#233243', display: 'block' }}
                                >
                                    {page.text}
                                </Button>
                            ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {isMusician ?
                                musicianSettings.map((setting, i) => (
                                    <MenuItem key={i} onClick={() => { navigate(setting.link); handleCloseUserMenu() }}>
                                        <Typography sx={{ color: '#F5F6F7' }} textAlign="center">{setting.text}</Typography>
                                    </MenuItem>
                                )) :
                                fanSettings.map((setting, i) => (
                                    <MenuItem key={i} onClick={() => { navigate(setting.link); handleCloseUserMenu() }}>
                                        <Typography textAlign="center">{setting.text}</Typography>
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
