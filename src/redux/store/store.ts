import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import { IInitialState } from '../../types'
import userReducer from '../reducers/userReducer'
import projectReducer from '../reducers/projectReducer'
import postReducer from '../reducers/postReducer'
import gigReducer from '../reducers/gigReducer'
import bandReducer from '../reducers/bandReducer'

export const initialState: IInitialState = {
    user: {
        isLoggedIn: false,
        currentUser: null
    }
}

const mainReducer = combineReducers({
    user: userReducer,
    projects: projectReducer,
    posts: postReducer,
    gigs: gigReducer,
    bands: bandReducer
})

export const storeConfig = createStore(mainReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))