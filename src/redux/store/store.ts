import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from '@redux-devtools/extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
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
    },
    userProjects: {
        projects: [],
        currentProject: null
    },
}

const mainReducer = combineReducers({
    user: userReducer,
    userProjects: projectReducer,
    userPosts: postReducer,
    userGigs: gigReducer,
    userBands: bandReducer
})

const persistConfig = { key: 'root', storage }

const persistedReducer = persistReducer(persistConfig, mainReducer)


export const storeConfig = createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
export const persistor = persistStore(storeConfig)