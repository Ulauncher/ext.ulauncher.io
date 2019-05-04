import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import Layout from '../layout/Layout'
import ExtensionGrid from '../extCommon/ExtensionGrid'
import makeTypesActionsReducer from '../api/makeTypesActionsReducer'
import { fetchItems } from '../api'

const { actions, reducer } = makeTypesActionsReducer('EXT/BROWSE', fetchItems)
export { reducer }

class Browse extends Component {
  constructor(props) {
    super(props)
    const { history, actions, payload } = this.props
    // don't refresh on back button
    if (history.action !== 'POP' || !payload) {
      actions.httpRequest()
    }
  }

  render() {
    const { error, fetching, payload } = this.props
    const items = payload && payload.data
    return (
      <Layout>
        <Helmet>
          <title>Browse Extensions</title>
        </Helmet>
        <ExtensionGrid error={error} isFetching={fetching} items={items} />
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  ...state.ext.browse
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Browse)
)
