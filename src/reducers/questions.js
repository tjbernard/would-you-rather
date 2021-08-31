import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_VOTE } from '../actions/questions'

export default function questions (state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question,

            }
        case ADD_VOTE:
            return {
                ...state,
                [action.vote.qid]: {
                    ...state[action.vote.qid],
                    [action.vote.answer]: {
                        ...state[action.vote.qid][action.vote.answer],
                        votes: state[action.vote.qid][action.vote.answer].votes.concat([action.vote.authedUser])
                    }
                },
            }
        default:
            return state
    }
}

