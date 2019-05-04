import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { login, logout } from './auth0Actions'

export class AuthLink extends React.Component {
  render() {
    const { login, logout } = this.props.actions
    const action = () => (this.props.login ? login(this.props.history) : logout(this.props.history))

    return this.props.type === 'link' ? (
      <a onClick={action}>{this.props.children}</a>
    ) : (
      <Button bsStyle={this.props.bsStyle} onClick={action}>
        {this.props.children}
      </Button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ login, logout }, dispatch)
})

export default withRouter(
  connect(
    () => ({}),
    mapDispatchToProps
  )(AuthLink)
)
