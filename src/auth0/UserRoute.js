import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

export class UserRoute extends React.Component {
  render() {
    const { component: Component, ...rest } = this.props
    const isAuthenticated = !!this.props.session
    return <Route {...rest} render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/" />)} />
  }
}

export default connect(state => ({ ...state.auth0 }))(UserRoute)
