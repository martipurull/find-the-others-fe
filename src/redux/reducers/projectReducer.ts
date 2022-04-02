import { AnyAction } from 'redux'
import { ACTIONS } from '../actions/actions'
import { initialState } from '../store/store'

const projectReducer = (state = initialState.userProjects, action: AnyAction) => {
    switch (action.type) {
        case ACTIONS.ADD_USER_PROJECTS: return {
            ...state,
            projects: action.payload
        }
        case ACTIONS.ADD_CURRENT_PROJECT_INFO: return {
            ...state,
            currentProject: action.payload
        }
        default: return state
    }
}

export default projectReducer