import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { AddQuestionAnswer } from './users'

export const ADD_QUESTION = 'ADD_QUESTION'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_VOTE = 'ADD_VOTE'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function AddQuestionVote(vote) {
    return {
        type: ADD_VOTE,
        vote
    }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser,
        })
        .then((question) => dispatch(addQuestion(question)))
        .then(() => dispatch(hideLoading()))
    }
}

export function handleAddVote(value, question_id) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())

        dispatch(AddQuestionVote({
            authedUser,
            qid: question_id,
            answer: value
        }))
        dispatch(AddQuestionAnswer({
            authedUser,
            qid: question_id,
            answer: value
        }))

        saveQuestionAnswer({
            authedUser,
            qid: question_id,
            answer: value
        })
        .then(() => dispatch(hideLoading()))
        .catch((e) => {
            console.warn('Error in handleToggleTweet: ', e)
            dispatch(AddQuestionVote({
                authedUser,
                qid: question_id,
                answer: value
            }))
            dispatch(AddQuestionAnswer({
                authedUser,
                qid: question_id,
                answer: value
            }))             
        });
    }
}
