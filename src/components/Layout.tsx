import Box from '@mui/material/Box'
import Footer from "./Footer";
import Header from "./Header";

interface IProps {
    children: JSX.Element
}

export default function Layout({ children }: IProps) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}
