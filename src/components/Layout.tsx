import Box from '@mui/material/Box'
import Footer from "./Footer";
import Header from "./Header";

interface IProps {
    children: JSX.Element
}

export default function Layout({ children }: IProps) {
    const isUserLoggedIn = true
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {isUserLoggedIn ? <Header /> : null}
            {children}
            {isUserLoggedIn ? <Footer /> : null}
        </Box>
    )
}
