import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import { actions as toastrActions } from 'react-redux-toastr'

import Layout from '../layout/Layout'
import ExtensionGrid from '../extCommon/ExtensionGrid'
import IboxContent from '../layout/IboxContent'
import makeTypesActionsReducer from '../api/makeTypesActionsReducer'
import { fetchMyItems } from '../api'

const { actions, reducer } = makeTypesActionsReducer('EXT/MY', fetchMyItems)
export { reducer }

class My extends Component {
  constructor(props) {
    super(props)
    const { history, actions, payload } = this.props
    // don't refresh on back button
    if (history.action !== 'POP' || !payload) {
      actions.httpRequest()
    }
  }

  componentDidMount() {
    const { location, toastr } = this.props
    if (location.state && location.state.deleted) {
      toastr.add({
        type: 'success',
        title: 'Success',
        message: 'Extension has been removed',
        options: { showCloseButton: true }
      })
    }
  }

  render() {
    const { error, fetching, payload } = this.props
    const items = payload && payload.data
    return (
      <Layout>
        <Helmet>
          <title>Your Extensions</title>
        </Helmet>
        {items && items.length === 0 ? (
          <IboxContent title="No extensions :(">You haven't submitted any extensions yet.</IboxContent>
        ) : (
          <ExtensionGrid error={error} isFetching={fetching} items={items} />
        )}
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  ...state.ext.my
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  toastr: bindActionCreators(toastrActions, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(My))
