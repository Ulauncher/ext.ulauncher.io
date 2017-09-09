import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as auth0Actions from './auth0Actions'

export class AuthCallback extends React.Component {
  componentWillMount() {
    const { hash } = this.props.location

    if (this.props.auth0.session) {
      this.props.history.push('/')
    } else if (/access_token|id_token|error/.test(hash)) {
      this.props.actions.handleAuthentication(hash, this.props.history)
    }
  }

  render() {
    return (
      <div className="middle-box text-center animated fadeInDown">
        <h3>Loading...</h3>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth0: state.auth0
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(auth0Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthCallback)
