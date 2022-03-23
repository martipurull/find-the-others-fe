import axios, { AxiosError, Method } from 'axios'

const isAxiosError = (e: Error): e is AxiosError => e.hasOwnProperty('isAxiosError')

function useAxios() {
    const { REACT_APP_BE_URL: baseURL } = process.env
    const instance = axios.create()

    const axiosRequest = async (url: string, method: Method, data = {}) => {
        try {
            return await instance({ baseURL, url, method, data, withCredentials: true })
        } catch (error) {
            return error.toJSON()
        }
    }
    instance.interceptors.response.use(response => response, async error => {
        const failedRequest = error.config
        if (error.response.status === 401 && failedRequest.url !== '/user/access/refreshToken' && failedRequest.url !== '/user/access/login') {
            await axiosRequest('/user/access/refreshToken', 'POST')
            const retryRequest = instance(failedRequest)
            return retryRequest
        } else {
            return Promise.reject(error)
        }
    })
    return { axiosRequest }
}

export default useAxios