import Box from '@mui/material/Box'
import { useSelector } from 'react-redux';
import { IInitialState } from '../types';
import Footer from "./Footer";
import Header from "./Header";

interface IProps {
    children: JSX.Element
}

export default function Layout({ children }: IProps) {
    const isUserLoggedIn = useSelector((state: IInitialState) => state.user.isLoggedIn)
    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {isUserLoggedIn ? <Header /> : null}
            {children}
            {isUserLoggedIn ? <Footer /> : null}
        </Box>
    )
}
