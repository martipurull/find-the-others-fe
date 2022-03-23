import { AnyAction } from 'redux'
import { ACTIONS } from '../actions/actions'
import { initialState } from '../store/store'

const bandReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        default: return state
    }
}

export default bandReducer