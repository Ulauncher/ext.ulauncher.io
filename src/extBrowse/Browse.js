import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FormControl } from 'react-bootstrap'
import Helmet from 'react-helmet'
import Layout from '../layout/Layout'
import ExtensionGrid from '../extCommon/ExtensionGrid'
import makeTypesActionsReducer from '../api/makeTypesActionsReducer'
import { fetchItems } from '../api'
import { getQueryParams, buildQueryString } from '../utils/url'
import './ext-browse.css'

const { actions, reducer } = makeTypesActionsReducer('EXT/BROWSE', fetchItems)
export { reducer }

class Browse extends Component {
  constructor(props) {
    super(props)
    this.onAPIVersionSelect = this.onAPIVersionSelect.bind(this)
    this.state = {
      loadedForQuery: props.history.location.search
    }
  }

  componentDidMount() {
    const { history, actions, payload } = this.props
    if (history.action !== 'POP' || !payload) {
      actions.httpRequest(this.getRequestOptions())
      this.setState({ loadedForQuery: history.location.search })
    }
  }

  componentWillReceiveProps(newProps) {
    const { history, actions } = newProps
    if (history.location.search !== this.state.loadedForQuery) {
      const options = this.getRequestOptions(history.location.search)
      actions.httpRequest(options)
      this.setState({ loadedForQuery: history.location.search })
    }
  }

  onAPIVersionSelect(event) {
    const currentOptions = this.getRequestOptions()
    const newOptions = { ...currentOptions, api_version: event.target.value }
    this.props.history.push(`/?${buildQueryString(newOptions)}`)
    this.props.actions.httpRequest(newOptions)
    this.setState({ loadedForQuery: this.props.history.location.search })
  }

  render() {
    const { error, fetching, payload, history } = this.props
    const items = payload && payload.data
    const query = getQueryParams(history.location.search)

    return (
      <Layout>
        <Helmet>
          <title>Browse Extensions</title>
        </Helmet>

        <div className="ext-filters">
          <div className="filter-label">Extension API version</div>
          <FormControl
            defaultValue={query.api_version === undefined ? '1.0.0' : query.api_version}
            onChange={this.onAPIVersionSelect}
            className="version-filter"
            componentClass="select"
          >
            <option value="">Any</option>
            <option value="1.0.0">v1.0.0 (Ulauncher v4)</option>
            <option value="2.0.0">v2.0.0 (Ulauncher v5)</option>
          </FormControl>
        </div>

        <ExtensionGrid error={error} isFetching={fetching} items={items} />
      </Layout>
    )
  }

  getRequestOptions(queryString) {
    const query = getQueryParams(queryString || this.props.history.location.search)
    return {
      api_version: query.api_version || ''
    }
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
