import { IUser, IProject } from "../../types"

const { REACT_APP_BE_URL } = process.env

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