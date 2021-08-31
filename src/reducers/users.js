import { ADD_ANSWER, RECEIVE_USERS, ADD_USER } from '../actions/users'

export default function users (state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_ANSWER:
            return {
                ...state,
                [action.vote.authedUser]: {
                    ...state[action.vote.authedUser],
                    answers: {
                        ...state[action.vote.authedUser].answers,
                        [action.vote.qid]: action.vote.answer
                    }
                }
            }
        case ADD_USER:
            return {
                ...state,
                [action.info.id]: {
                    id: action.info.id,
                    name: action.info.name,
                    avatarURL: action.info.avatar,
                    answers: {},
                    questions: []
                }              
            }
        default:
            return state
    }
}
