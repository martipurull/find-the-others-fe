import { AnyAction } from 'redux'
import { ACTIONS } from '../actions/actions'
import { initialState } from '../store/store'

const projectReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        default: return state
    }
}

export default projectReducer