import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as auth0Actions from './auth0Actions'
import Loading from '../layout/Loading'

export class AuthCallback extends React.Component {
  componentWillMount() {
    if (this.props.auth0.session) {
      this.props.history.push('/')
    } else if (/access_token|id_token|error/.test(this.props.location.hash)) {
      this.props.actions.handleAuthentication(this.props.history)
    }
  }

  render() {
    return <Loading />
  }
}

const mapStateToProps = state => ({ auth0: state.auth0 })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(auth0Actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthCallback)
