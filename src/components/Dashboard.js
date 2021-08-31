import React, { Component } from 'react'
import { connect } from 'react-redux'
import Item from './questions/Item'
import { 
    RiEmotionUnhappyFill
} from 'react-icons/ri'

class Dashboard extends Component {
    state = {
        listAnswered: false,
    }

    componentDidMount () {
        this.setState(() => ({
            listAnswered: false
        }))
    }

    handleTabButtonClicked = (e) => {
        e.preventDefault()
        const { listAnswered } = this.state

        listAnswered === true
        ? this.setState(() => ({ listAnswered: false }))
        : this.setState(() => ({ listAnswered: true }))
    }

    render () {
        const { listAnswered } = this.state
        const { answeredList, unansweredList } = this.props

        return (
            <div className="content-container">
                <div className="buttons">
                    <button
                        className={`unanswered-btn ${listAnswered !== true && "active"}`}
                        onClick={this.handleTabButtonClicked}
                    >
                        <span className="title">
                            Unanswered Question
                        </span>
                    </button>
                    <button
                        className={`answered-btn ${listAnswered === true && "active"}`}
                        onClick={this.handleTabButtonClicked}
                    >
                        <span className="title">
                            Answered Question
                        </span>
                    </button>
                </div>
                <div className="item-list">
                    <ul>
                        {listAnswered === true
                            ? answeredList.length > 0 
                                ? answeredList.map((id) => (
                                        <li key={id}>
                                            <Item id={id} />
                                        </li>
                                ))
                                : <pre className="center">
                                    <div className="icon"><RiEmotionUnhappyFill/></div>
                                    You have not answered any polling yet!
                                </pre>
                                
                            : unansweredList.length > 0 
                                ? unansweredList.map((id) => (
                                    <li key={id}>
                                        <Item id={id} />
                                    </li>
                                ))
                                : <pre className="center">
                                    <div className="icon"><RiEmotionUnhappyFill/></div>
                                    There are no unanswered polling
                                </pre>
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions, users }) {
    const user = users[authedUser].answers

    return {
        unansweredList: Object.keys(questions).filter((q) => !(q in user))
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        answeredList: Object.keys(questions).filter((q) => (q in user))
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}
export default connect(mapStateToProps)(Dashboard)