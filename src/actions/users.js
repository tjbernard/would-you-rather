import { showLoading, hideLoading } from 'react-redux-loading'
import { saveUser } from '../utils/api'
import { handleLogin } from './auth'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_VOTE = 'ADD_VOTE'
export const ADD_USER = 'ADD_USER'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function registerUser (info) {
    return {
        type: ADD_USER,
        info,
    }
}

export function AddQuestionAnswer(vote) {
    return {
        type: ADD_VOTE,
        vote
    }
}

export function handleRegister(info) {
    return (dispatch) => {
        dispatch(showLoading())

        return saveUser(info)
        .then(() => dispatch(registerUser(info)))
        .then(() => dispatch(handleLogin(info.id)))
        .then(() => dispatch(hideLoading()))
    }
}
