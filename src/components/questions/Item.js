import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { formatQuestion } from '../../utils/helpers'

class Item extends Component {
    render () {
        const { question } = this.props

        if (question === null ) {
            return <p>This question does not exits</p>
        }

        const {
            id, name, avatar, optionOne
        } = question

        return (
            <div className="question item">
                <h4 className="title">{name}:</h4>
                <div className="hr"></div>
                <div className="question-info"> 
                    <div className="item-avatar">                 
                        <img
                            className="avatar"
                            alt={name}
                            src={avatar}
                        />
                    </div>
                    <div className="option">
                        <h3>Would you Rather</h3>
                        <div>
                            <span className="option">---{optionOne.text}---</span>
                        </div>
                        
                        <Link to={`/questions/${id}`}>
                            <div className="view-vote-btn">
                                View Poll
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
    const question = questions[id];
  
    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[question.author], authedUser)
            : null
    };
}

export default withRouter(connect(mapStateToProps)(Item))
