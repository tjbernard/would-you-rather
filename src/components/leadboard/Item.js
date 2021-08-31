import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RiArrowUpFill } from 'react-icons/ri'
import { formatUser } from '../../utils/helpers'

class Item extends Component {
    render () {
        const { name, avatar, answeredQuestions, askedQuestions, score } = this.props.user
        const { rank } = this.props

        return (
            <div className="question">
                
                {rank <= 3 && (
                    <div className="arrow-left">
                        <span className={`rank-${rank}`}><RiArrowUpFill /></span>
                    </div>
                )}
                <div className="question-info">
                    <div className="item-avatar">
                        <img
                            className="avatar"
                            src={avatar}
                            alt={name}
                        />
                    </div>
                    <div className="user-info">
                        <h3>{name}</h3>
                        <div className="vote-score">
                            <span className="option">Answered question</span>
                            <span className="score right">{answeredQuestions}</span>
                        </div>

                        <div className="hr"></div>

                        <div className="vote-score">
                            <span className="option">Created questions</span>
                            <span className="score right">{askedQuestions}</span>
                        </div>
                    </div>

                    <div className="question-score">
                        <h4>Score</h4>
                        <div className="score">{score}</div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { id, rank }) {
    const user = users[id]

    return {
        authedUser,
        rank,
        user: user
            ? formatUser(users, questions, user)
            : null
    };
}

export default connect(mapStateToProps)(Item)
