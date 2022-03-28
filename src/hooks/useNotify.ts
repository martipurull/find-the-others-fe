import { toast } from 'react-toastify'

export const notifySuccess = (message: string) => toast.success(message, {
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
})

export const notifyError = (message: string) => toast.error(message, {
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
})