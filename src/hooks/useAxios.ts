import axios, { AxiosError, Method } from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearUserInfoAction, userLogoutAction } from '../redux/actions/actions'

const isAxiosError = (e: Error): e is AxiosError => e.hasOwnProperty('isAxiosError')



function useAxios() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { REACT_APP_BE_URL: baseURL } = process.env
    const instance = axios.create()

    const axiosRequest = async (url: string, method: Method, data = {}) => {
        try {
            return await axios({ baseURL, url, method, data, withCredentials: true })
        } catch (error: any) {
            console.log({ log: 'useAxios CATCH', error })
            return error.toJSON()
        }
    }

    axios.interceptors.response.use(response => response, async error => {
        const failedRequest = error.config
        if (failedRequest.url === 'users/login') return Promise.reject(failedRequest)
        if (error.response.status === 401 && failedRequest.url !== `/user/access/refresh-token`) {
            console.log({ log: 'useAxios IF', errorResponseStatus: error.response.status, failedRequestURL: failedRequest.url })
            await axiosRequest(`/user/access/refresh-token`, 'POST')
            const retryRequest = axios(failedRequest)
            return retryRequest
        } else if (error.response.status === 401 && failedRequest.url === `/user/access/refresh-token`) {
            console.log({ log: 'useAxios ELSE IF', errorResponseStatus: error.response.status, failedRequestURL: failedRequest.url })
            dispatch(userLogoutAction())
            // dispatch(clearUserInfoAction())
            navigate('/login')
            return Promise.reject(error)
        } else {
            console.log({ log: 'useAxios ELSE', errorResponseStatus: error.response.status, failedRequestURL: failedRequest.url })
            return Promise.reject(error)
        }
    })
    return { axiosRequest }
}

export default useAxios