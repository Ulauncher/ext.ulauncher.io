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

const sortingOptions = {
  newest_first: {
    sort_by: 'CreatedAt',
    sort_order: -1
  },
  github_stars: {
    sort_by: 'GithubStars',
    sort_order: -1
  }
}

class Browse extends Component {
  constructor(props) {
    super(props)
    this.onAPIVersionSelect = this.onAPIVersionSelect.bind(this)
    this.onSortingSelect = this.onSortingSelect.bind(this)
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
    const newQuery = `?${this.buildBrowserQueryString({ api_version: event.target.value })}`
    this.props.history.push(`/${newQuery}`)
    this.props.actions.httpRequest(newOptions)
    this.setState({ loadedForQuery: newQuery })
  }

  onSortingSelect(event) {
    const currentOptions = this.getRequestOptions()

    const selectedSortingOption = sortingOptions[event.target.value]
    const newOptions = {
      ...currentOptions,
      sort_by: selectedSortingOption.sort_by,
      sort_order: selectedSortingOption.sort_order
    }
    const newQuery = `?${this.buildBrowserQueryString({ sorting: event.target.value })}`
    this.props.history.push(`/${newQuery}`)
    this.props.actions.httpRequest(newOptions)
    this.setState({ loadedForQuery: newQuery })
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
            defaultValue={query.api_version === undefined ? '' : query.api_version}
            onChange={this.onAPIVersionSelect}
            className="version-filter"
            componentClass="select"
          >
            <option value="2.0.0">v2.0.0 (Ulauncher v5)</option>
            <option value="1.0.0">v1.0.0 (Ulauncher v4)</option>
            <option value="">Any</option>
          </FormControl>
          <div className="sort-label">Sort by</div>
          <FormControl
            defaultValue={query.sorting === undefined ? sortingOptions.newest_first : query.sorting}
            onChange={this.onSortingSelect}
            className="sorting-select"
            componentClass="select"
          >
            <option value="newest_first">Newest first</option>
            <option value="github_stars">Github stars</option>
          </FormControl>
        </div>

        <ExtensionGrid error={error} isFetching={fetching} items={items} />
      </Layout>
    )
  }

  buildBrowserQueryString(overrides) {
    const browserQuery = getQueryParams(this.props.history.location.search)
    const queryObject = {}
    if (browserQuery.api_version !== undefined) {
      queryObject.api_version = browserQuery.api_version
    }
    if (browserQuery.sorting !== undefined) {
      queryObject.sorting = browserQuery.sorting
    }
    return buildQueryString({ ...queryObject, ...(overrides || {}) })
  }

  getRequestOptions(queryString) {
    const browserQuery = getQueryParams(queryString || this.props.history.location.search)
    const options = {}
    if (browserQuery.api_version !== undefined) {
      options.api_version = browserQuery.api_version
    }

    const selectedSortingOption = sortingOptions[browserQuery.sorting] || sortingOptions.newest_first
    options.sort_by = selectedSortingOption.sort_by
    options.sort_order = selectedSortingOption.sort_order
    return options
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
