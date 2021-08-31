import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { formatAuthedUser } from '../utils/helpers'
import { handleLogin } from '../actions/auth'
import { 
    RiLineChartLine,
    RiHome2Line,
    RiAddLine,
    RiUser3Line,
    RiLogoutCircleRLine
} from 'react-icons/ri'


class Navbar extends Component {
    handleLogoutButton = (e) => {
        e.preventDefault()
        const { dispatch } = this.props

        this.props.history.replace('/')
        dispatch(handleLogin(''))
    }

    render () {
        const { authedUser } = this.props

        return (
            <div className="navbar-container">
                <div className="app-title">
                    <h3>WOULD YOU RATHER APP</h3>
                </div>
                <nav className="nav">
                    <ul>
                        <li>
                            <NavLink to="/" exact activeClassName="active">
                                <RiHome2Line className="nav-icon" />
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/leadboard" activeClassName="active">
                                <RiLineChartLine className="nav-icon" />
                                Lead Board
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/add" activeClassName="active">
                                <RiAddLine className="nav-icon" />
                                New Question
                            </NavLink>
                        </li>
                        {authedUser && authedUser !== ''
                            ? <>
                                <li>
                                    <RiUser3Line className="nav-icon" />
                                    <strong>{this.props.profile.name}</strong>
                                </li>
                                <li>
                                    <button
                                        className="link-button"
                                        onClick={this.handleLogoutButton}
                                    >
                                        <RiLogoutCircleRLine className="nav-icon" />
                                        LogOut
                                    </button>
                                </li>
                            </>
                            : null
                        }
                    </ul>
                </nav>
            </div>
        )
    }
}

function mapStateToProps ({users, authedUser }) {
    const profile = users[authedUser]

    return {
        authedUser,
        profile: profile
            ? formatAuthedUser(users, authedUser)
            : null
    };
}
export default withRouter(connect(mapStateToProps)(Navbar))
