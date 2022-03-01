import { Navigate } from 'react-router-dom'

interface IProps {
    children: JSX.Element
}

export default function PrivateRoute({ children }: IProps) {
    const isLoggedIn = true

    return isLoggedIn ? children : <Navigate to='/login' />
}
