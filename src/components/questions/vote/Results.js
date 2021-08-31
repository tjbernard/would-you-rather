import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../../../utils/helpers'

class Results extends Component {
    render () {        
        const { authedUser } = this.props
        
        const {
            name, avatar, optionOne, optionTwo
        } = this.props.question

        const optionOneVotes = optionOne.votes.length
        const optionTwoVotes = optionTwo.votes.length
        const totaVotes = optionOneVotes + optionTwoVotes
        const optionOneVotesPercent = Math.round(( optionOne.votes.length * 100 ) / totaVotes)
        const optionTwoVotesPercent = Math.round(( optionTwo.votes.length * 100 ) / totaVotes)
        
        const votedOptionOne = optionOne.votes.includes(authedUser)
        const votedOptionTwo = optionTwo.votes.includes(authedUser)

        return (
            <div>
                <span>Created by</span>
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
                        <h2>Results:</h2>

                        <div>
                            <div className={`poll-stats ${votedOptionOne === true && ('up')}`}>                                    
                                {votedOptionOne === true && (
                                    <div className="arrow-right">
                                        <span>
                                            Your Vote
                                        </span>
                                    </div>
                                )}
                                <p>Would you rather {optionOne.text}</p>
                                <div className="progressbar">
                                    <div style={{ width: `${optionOneVotesPercent}%` }}></div>
                                    <span>{optionOneVotesPercent}%</span>
                                </div>
                                <p className="center">{optionOneVotes} out of {totaVotes}</p>
                            </div>

                            <div className={`poll-stats ${votedOptionTwo === true && ('up')}`}>
                                {votedOptionTwo === true && (
                                    <div className="arrow-right">
                                        <span>
                                            Your Vote
                                        </span>
                                    </div>
                                )}
                                <p>Would you rather {optionTwo.text}</p>
                                <div className="progressbar">
                                    <div style={{ width: `${optionTwoVotesPercent}%` }}></div>
                                    <span>{optionTwoVotesPercent}%</span>
                                </div>
                                <p className="center">{optionTwoVotes} out of {totaVotes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions, users}, {id}) {
    const question = questions[id]
    
    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    }
}

export default connect(mapStateToProps)(Results)