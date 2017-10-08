import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import Layout from '../layout/Layout'
import ExtensionGrid from '../extCommon/ExtensionGrid'
import { fetchBrowseItems, resetState } from './browseActions'

class Browse extends Component {
  constructor(props) {
    super(props)
    const { history, actions, items } = this.props
    // don't refresh on back button
    if (history.action !== 'POP' || !items) {
      actions.resetState()
      actions.fetchBrowseItems()
    }
  }

  render() {
    const { error, isFetching, items } = this.props
    return (
      <Layout>
        <Helmet>
          <title>Browse Extensions</title>
        </Helmet>
        <ExtensionGrid error={error} isFetching={isFetching} items={items} />
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  ...state.ext.browse
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ fetchBrowseItems, resetState }, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Browse))
