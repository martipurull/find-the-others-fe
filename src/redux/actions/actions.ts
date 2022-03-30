import { IUser, IProject } from "../../types"
import { ThunkDispatch } from 'redux-thunk'
import { Action } from "redux"
import axios from 'axios'

const { REACT_APP_BE_URL: baseURL } = process.env

export const ACTIONS = {
    USER_LOGIN: 'USER_LOGIN',
    ADD_USER_INFO_TO_CURRENT_USER: 'ADD_USER_INFO_TO_CURRENT_USER',
    USER_LOGOUT: 'USER_LOGOUT',
    CLEAR_USER_INFO_FROM_CURRENT_USER: 'CLEAR_USER_INFO_FROM_CURRENT_USER',
    ADD_USER_PROJECTS: 'ADD_USER_PROJECTS'
}

export const userLoginAction = () => ({
    type: ACTIONS.USER_LOGIN
})

export const addUserInfoAction = (userInfo: IUser) => ({
    type: ACTIONS.ADD_USER_INFO_TO_CURRENT_USER,
    payload: userInfo
})

export const fetchUserAndAddInfoAction = () => async (dispatch: ThunkDispatch<Action, any, any>) => {
    const response = await axios.get(`${baseURL}/user/me`, { withCredentials: true })
    dispatch({
        type: ACTIONS.ADD_USER_INFO_TO_CURRENT_USER,
        payload: response.data
    })
}

export const userLogoutAction = () => ({
    type: ACTIONS.USER_LOGOUT
})

export const clearUserInfoAction = () => ({
    type: ACTIONS.CLEAR_USER_INFO_FROM_CURRENT_USER
})

export const addUserProjectsAction = (projects: IProject[]) => ({
    type: ACTIONS.ADD_USER_PROJECTS,
    payload: projects
})