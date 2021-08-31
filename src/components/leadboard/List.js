import React, { Component } from 'react'
import { connect } from 'react-redux'
import Item from './Item'
import { formatUser } from '../../utils/helpers'

class List extends Component {
    render () {
        const { topUsers } = this.props
        return (
            <div className="content-container">
                <ul>
                    {topUsers.map((user, index) => (
                        <li key={user.id}>
                            <Item
                                id={user.id}
                                rank={index + 1}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ users, questions }) {
    return {
        topUsers: Object.values(users)
        .sort((a, b) => (formatUser(users, questions, b).score > formatUser(users, questions, a).score) ? 1 : -1)
    }
}

export default connect(mapStateToProps)(List)