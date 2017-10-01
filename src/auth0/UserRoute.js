import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

export class UserRoute extends React.Component {
  render() {
    const { auth, unauth, session, ...rest } = this.props
    return <Route {...rest} component={session ? auth : unauth} />
  }
}

export default connect(state => ({ ...state.auth0 }))(UserRoute)
