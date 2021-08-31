import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux'

export function PrivateRoute({ children, ...rest }) {
    const { authedUser } = this.props

    console.warn("Login: ", authedUser)

    return (
        <Route
            {...rest}
            render={({ location }) =>
                authedUser !== '' ? (
                children
                ) : (
                <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                    }}
                />
                )
            }
        />
    );
}
