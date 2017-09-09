import React from 'react'
import { connect } from 'react-redux'

class UserIsLoggedIn extends React.Component {
  render() {
    const { auth0, inverse, elseRenderComponent: ElseComponent } = this.props
    if ((auth0.session && !inverse) || (!auth0.session && inverse)) {
      return this.props.children
    } else if (ElseComponent) {
      return <ElseComponent />
    } else {
      return null
    }
  }
}

export default connect(state => ({ auth0: state.auth0 }))(UserIsLoggedIn)
