import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddVote } from '../../../actions/questions'
import { formatQuestion } from '../../../utils/helpers'

class Vote extends Component {
    state = {
        selectedOption: ''
    }

    handleOptionChange = (e) => {
        this.setState({
            selectedOption: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { selectedOption } = this.state
        const { dispatch, id } = this.props

        dispatch(handleAddVote(selectedOption, id))

        this.setState(() => ({
            selectedOption: '',
        }))
    }

    render () {
        const {
            name, avatar, optionOne, optionTwo, hasVoted
        } = this.props.question

        const { authedUser } = this.props

        const { selectedOption } = this.state

        return (
            <div>
                <span>Created By:</span>
                <h3 className="title">{name}</h3>
                <div className="hr"></div>
                
                <div className="question-poll">
                    <div className="item-avatar">
                    <img
                        className="avatar"
                        alt={name}
                        src={avatar}
                    />

                    </div>

                    <div className="poll-info">
                        <h2>Would you rather...</h2>
                        
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <ul>
                                    <li>
                                        <label>
                                            <input
                                            type="radio"
                                            value="optionOne"
                                            checked={
                                                selectedOption === "optionOne" ||
                                                (hasVoted === true && optionOne.votes.includes(authedUser))
                                            }
                                            onChange={this.handleOptionChange}
                                            disabled={hasVoted === true}
                                            />
                                            <span>{optionOne.text}</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                            type="radio"
                                            value="optionTwo"
                                            checked={
                                                selectedOption === "optionTwo" ||
                                                (hasVoted === true && optionTwo.votes.includes(authedUser))
                                            }
                                            onChange={this.handleOptionChange}
                                            disabled={hasVoted === true}
                                            />
                                            <span>{optionTwo.text}</span>
                                        </label>
                                    </li>
                                </ul>
                                {hasVoted !== true
                                    ? <button
                                        type="submit"
                                        className="btn-primary"
                                        disabled={selectedOption === ""}
                                    >
                                        Submit
                                    </button>
                                    : <span className="warning-text">
                                        You have already voted this question
                                    </span>
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions, users}, { id }) {
    const question = questions[id]
    
    return {
        authedUser,
        id,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    }
}

export default connect(mapStateToProps)(Vote)