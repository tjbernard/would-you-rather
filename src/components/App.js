import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import Leadboard from './leadboard/List'
import Vote from './questions/vote/Details'
import NewQuestion from './questions/New'
import NotFound from './NotFound'
import Login from './auth/Login'
import Register from './auth/Register'
import { handleInitialData } from '../actions/shared'
import PrivateRoute from '../route/PrivateRoute'

class App extends Component {
    componentDidMount() {
        this.props.handleInitialData()
    }
    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar />
                    <div className="container">
                        <Navbar />
                        <Switch>
                            <PrivateRoute path="/" exact component={Dashboard}/>
                            <PrivateRoute path="/leadboard" component={Leadboard} />
                            <PrivateRoute path="/questions/:question_id" component={Vote} />
                            <PrivateRoute path="/add" component={NewQuestion} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="*" component={NotFound} />
                        </Switch>
                    </div>
                </Fragment>
            </Router>
        );
    }
}


function mapStateToProps () {
    return {
        // 
    }
}

export default connect(mapStateToProps, {handleInitialData})(App);
