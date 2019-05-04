import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as auth0Actions from './auth0Actions'
import Loading from '../layout/Loading'
import Error from '../layout/error/Error'

export class AuthCallback extends React.Component {
  componentWillMount() {
    const { auth0, history, location, actions } = this.props
    if (auth0.session) {
      history.push('/')
    } else if (/access_token|id_token|error/.test(location.hash)) {
      actions.handleAuthentication(history)
    }
  }

  render() {
    const { error } = this.props.auth0
    if (error) {
      return <Error title={error} h1="⚠" h3={error} />
    }

    return <Loading />
  }
}

const mapStateToProps = state => ({ auth0: state.auth0 })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(auth0Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthCallback)
