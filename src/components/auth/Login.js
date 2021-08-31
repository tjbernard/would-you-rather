import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleLogin } from '../../actions/auth'

class Login extends Component {
    state = {
        selectedUser: ''
    }

    handleChange = (e) => {
        this.setState({
            selectedUser: e.target.value
        })
    }

    handleSumbit = (e) => {
        e.preventDefault()

        const { selectedUser } = this.state
        const { dispatch, authedUser } = this.props

        dispatch(handleLogin(selectedUser))

        this.setState(() => ({
            selectedUser: '',
        }))

        if (authedUser !== '') {            
            const { from } = this.props.location.state || { from: { pathname: "/" } }

            return this.props.history.push(from)
        }
    }

    handleRegisterButton = (e) => {
        e.preventDefault()
        
        return this.props.history.push('/register')
    }

    render () {
        const { users } = this.props
        const { selectedUser } = this.state
        const { authedUser } = this.props
        
        if (authedUser && authedUser !== '') {
            return <Redirect to='/' />
        }

        return (
            <div className="auth-container">
                <form className="auth-form" onSubmit={this.handleSumbit}>
                    <h3 className="center app-title ">Welcome to Would You Rather App</h3>
                    <p className="center">Please Login to continue</p>
                    <div>
                        <select
                            className="select"
                            onChange={this.handleChange}
                        >
                            <option value="">Select user</option>
                            {users.map((user) => (
                                <option
                                    key={user.id}
                                    value={user.id}
                                >
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="btn-primary"
                        disabled={selectedUser === ""}
                    >
                        Sign-In
                    </button>
                </form>
                
                <h4 className="hr-w">OR</h4>
                <button
                    className="btn-secondary"
                    onClick={this.handleRegisterButton}
                >
                    Register
                </button>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, users }) {
    return {
        authedUser,
        users: Object.values(users)
    }
}

export default connect(mapStateToProps)(Login)
