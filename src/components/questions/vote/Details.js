import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../../../utils/helpers'
import { Redirect } from 'react-router-dom'
import Results from './Results'
import Vote from './Vote'


class Details extends Component {
    render () {
        if (this.props.notfound && this.props.notfound === true) {
            return <Redirect to='/404' />
        }

        const {
            id ,hasVoted
        } = this.props.question

        return (
            <div className="content-container border">
                {hasVoted === true
                    ? <Results id={id} />
                    : <Vote id={id} />
                }
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions, users}, props) {
    const { question_id } = props.match.params
    const question = questions[question_id]

    if ( ! (question_id in questions )) {
        return {
            notfound: true,
        }
    }
    
    return {
        question_id,
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    }
}

export default connect(mapStateToProps)(Details)