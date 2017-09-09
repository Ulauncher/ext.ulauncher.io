import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { login, logout } from './auth0Actions'

export class AuthLink extends React.Component {
  render() {
    const { login, logout } = this.props.actions
    return this.props.login ? (
      <a onClick={() => login(this.props.history)}>{this.props.children}</a>
    ) : (
      <a onClick={() => logout(this.props.history)}>{this.props.children}</a>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ login, logout }, dispatch)
})

export default withRouter(connect(() => ({}), mapDispatchToProps)(AuthLink))
