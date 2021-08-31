import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

const PrivateRoute = ({component: Component, ...rest}) => {
    const { isAuthenticated } = rest;

    return (
        <Route {...rest} render={props => (
            isAuthenticated === true
            ? (
                <Component {...props}/>
            ) 
            : (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}
                />
            )
        )}
        />
    )
};

// PrivateRoute.propTypes = {
//     isAuthenticated: PropTypes.bool.isRequired,
// }

function mapStateToProps({ authedUser }) {
    return {
        isAuthenticated: authedUser && authedUser !== '' ? true : false
    }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))