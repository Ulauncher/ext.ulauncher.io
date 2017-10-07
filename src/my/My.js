import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import Layout from '../layout/Layout'
import ExtensionGrid from '../layout/ExtensionGrid'
import { fetchMyItems, resetState } from './myActions'

class My extends Component {
  constructor(props) {
    super(props)
    const { history, actions, items } = this.props
    // don't refresh on back button
    if (history.action !== 'POP' || !items) {
      actions.resetState()
      actions.fetchMyItems()
    }
  }

  render() {
    const { error, isFetching, items } = this.props
    return (
      <Layout>
        <Helmet>
          <title>Your</title>
        </Helmet>
        <ExtensionGrid error={error} isFetching={isFetching} items={items} />
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  ...state.my
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ fetchMyItems, resetState }, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(My))
