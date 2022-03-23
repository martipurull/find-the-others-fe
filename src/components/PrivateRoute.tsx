import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import useAxios from '../hooks/useAxios'
import { addUserInfoAction } from '../redux/actions/actions'
import { IInitialState } from '../types'

interface IProps {
    children: JSX.Element
}

export default function PrivateRoute({ children }: IProps) {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state: IInitialState) => state.user.isLoggedIn)
    const { axiosRequest } = useAxios()

    const fetchUserInfo = async () => {
        const response = await axiosRequest('/user/me', 'GET')
        dispatch(addUserInfoAction(response.data))
    }

    if (isLoggedIn) fetchUserInfo()

    return isLoggedIn ? children : <Navigate to='/login' />
}
