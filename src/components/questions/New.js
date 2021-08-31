import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import  { handleAddQuestion } from '../../actions/questions'

class New extends Component {
    state = {
        toHome: false,
        optionOneText: '',
        optionTwoText: ''
    }
    
    handleChange = (e) => {
        const value = e.target.value

        this.setState(() => ({
            [e.target.name]: value
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOneText, optionTwoText } = this.state
        const { dispatch } = this.props

        dispatch(handleAddQuestion(optionOneText, optionTwoText))

        this.setState(() => ({
            optionOneText: '',
            optionTwoText: '',
            toHome: true
        }))
    }

    render () {
        const { toHome, optionOneText, optionTwoText } = this.state

        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <div className="content-container border">
                <form className="form" onSubmit={this.handleSubmit}>
                    <h3 className="center title">Create New Question</h3>
                    <p>Complete the question</p>
                    <h2>Would you rather?</h2>

                    <input
                        type="text"
                        name="optionOneText"
                        placeholder="Enter option one"
                        className="form-control"
                        onChange={this.handleChange}
                    />
                    <h4 className="hr-w">OR</h4>
                    <input
                        type="text"
                        name="optionTwoText"
                        placeholder="Enter option two"
                        className="form-control"
                        onChange={this.handleChange}
                    />

                    <button
                        className="btn-primary"
                        disabled={optionOneText === '' || optionTwoText === ''}
                    >
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(New)