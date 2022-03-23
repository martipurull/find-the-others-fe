import { AnyAction } from 'redux'
import { ACTIONS } from '../actions/actions'
import { initialState } from '../store/store'

const userReducer = (state = initialState.user, action: AnyAction) => {
    switch (action.type) {
        case ACTIONS.USER_LOGIN: return {
            ...state,
            isLoggedIn: true
        }
        case ACTIONS.ADD_USER_INFO_TO_CURRENT_USER: return {
            ...state,
            currentUser: action.payload
        }
        case ACTIONS.USER_LOGOUT: return {
            ...state,
            isLoggedIn: false
        }
        case ACTIONS.CLEAR_USER_INFO_FROM_CURRENT_USER: return {
            ...state,
            isLoggedIn: false,
            currentUser: null
        }
        default: return state
    }
}

export default userReducer