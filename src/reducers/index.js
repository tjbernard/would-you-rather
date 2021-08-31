import { combineReducers } from 'redux'
import { loadingBarReducer } from 'react-redux-loading'
import authedUser from './auth'
import questions from './questions'
import users from './users'

export default combineReducers({
    authedUser,
    questions,
    users,
    loadingBar: loadingBarReducer,
})