import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleRegister } from '../../actions/users'

class Register extends Component {
    state = {
        name: '',
        maessage: ''
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value,
            maessage: ''
        })
    }

    handleSumbit = (e) => {
        e.preventDefault()

        this.setState(() => ({
            maessage: ''
        }))

        const { name } = this.state
        const id = name.replace(/ /g, '').toLocaleLowerCase()
        const avatar = `https://i.pravatar.cc/150?u=${id}`
        const { dispatch } = this.props
        const { users } = this.props

        if (Object.keys(users).includes(id)) {
            this.setState(() => ({
                maessage: 'User with same name alreay exist'
            }))
        } else {
            dispatch(handleRegister({id, name, avatar}))

            this.setState(() => ({
                name: '',
            }))
        }
    }

    handleLoginButton = (e) => {
        e.preventDefault()
        
        return this.props.history.push('/login')
    }

    render () {
        const { name, maessage } = this.state
        const { authedUser } = this.props
        
        if (authedUser && authedUser !== '') {
            return <Redirect to='/' />
        }

        return (
            <div className="auth-container">
                <form className="auth-form" onSubmit={this.handleSumbit}>
                    <h3 className="center app-title ">Welcome to Would You Rather App</h3>
                    <p className="center">Enter your information</p>

                    {maessage !== '' && (
                        <span className="error-text">{maessage}</span>
                    )}

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        className="form-control"
                        onChange={this.handleChange}
                    />

                    <button
                        className="btn-primary"
                        disabled={name === ""}
                    >
                        Submit
                    </button>
                </form>
                
                <h4 className="hr-w">OR</h4>
                <button
                    className="btn-secondary"
                    onClick={this.handleLoginButton}
                >
                    Sign-In
                </button>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, users }) {
    return {
        authedUser,
        users
    }
}

export default connect(mapStateToProps)(Register)
