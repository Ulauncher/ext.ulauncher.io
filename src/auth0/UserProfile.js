import React from 'react'
import { connect } from 'react-redux'

class UserIsLoggedIn extends React.Component {
  render() {
    const { type, auth0 } = this.props
    if (!auth0.session) {
      return null
    }

    switch (type) {
      case 'email':
        return <span>{auth0.session.user.email}</span>
      default:
        return null
    }
  }
}

export default connect(state => ({ auth0: state.auth0 }))(UserIsLoggedIn)
