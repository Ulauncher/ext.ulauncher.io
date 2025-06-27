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

const ITEMS_PER_PAGE = 9 // 3x3 grid

class Browse extends Component {
  constructor(props) {
    super(props)
    this.onAPIVersionSelect = this.onAPIVersionSelect.bind(this)
    this.onSortingSelect = this.onSortingSelect.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.state = {
      loadedForQuery: props.history.location.search,
      offset: 0,
      items: []
    }
  }

  componentDidMount() {
    const { history, actions, payload } = this.props
    if (history.action !== 'POP' || !payload) {
      const options = this.getRequestOptions()
      actions.httpRequest(options)
      this.setState({
        loadedForQuery: history.location.search,
        offset: 0,
        items: []
      })
    } else if (payload && payload.data) {
      this.setState({ items: payload.data })
    }
  }

  componentWillReceiveProps(newProps) {
    const { history, actions, payload } = newProps
    if (history.location.search !== this.state.loadedForQuery) {
      const options = this.getRequestOptions(history.location.search)
      actions.httpRequest(options)
      this.setState({
        loadedForQuery: history.location.search,
        offset: 0,
        items: []
      })
    } else if (payload && payload.data && this.props.fetching && !newProps.fetching) {
      // When new data is loaded
      if (this.state.offset === 0) {
        // First load or filter/sort change
        this.setState({ items: payload.data })
      } else {
        // Append items for "load more"
        this.setState({ items: [...this.state.items, ...payload.data] })
      }
    }
  }

  onAPIVersionSelect(event) {
    const currentOptions = this.getRequestOptions()
    const newOptions = {
      ...currentOptions,
      versions: event.target.value,
      offset: 0
    }
    const newQuery = `?${this.buildBrowserQueryString({ versions: event.target.value })}`
    this.props.history.push(`/${newQuery}`)
    this.props.actions.httpRequest(newOptions)
    this.setState({
      loadedForQuery: newQuery,
      offset: 0,
      items: []
    })
  }

  onSortingSelect(event) {
    const currentOptions = this.getRequestOptions()

    const selectedSortingOption = sortingOptions[event.target.value]
    const newOptions = {
      ...currentOptions,
      sort_by: selectedSortingOption.sort_by,
      sort_order: selectedSortingOption.sort_order,
      offset: 0
    }
    const newQuery = `?${this.buildBrowserQueryString({ sorting: event.target.value })}`
    this.props.history.push(`/${newQuery}`)
    this.props.actions.httpRequest(newOptions)
    this.setState({
      loadedForQuery: newQuery,
      offset: 0,
      items: []
    })
  }

  loadMore() {
    const newOffset = this.state.offset + ITEMS_PER_PAGE
    const currentOptions = this.getRequestOptions()
    const newOptions = {
      ...currentOptions,
      offset: newOffset,
      limit: ITEMS_PER_PAGE
    }
    this.props.actions.httpRequest(newOptions)
    this.setState({ offset: newOffset })
  }

  render() {
    const { error, fetching, payload, history } = this.props
    const { items } = this.state
    const query = getQueryParams(history.location.search)
    const hasMoreItems = payload && payload.data && payload.data.length === ITEMS_PER_PAGE

    return (
      <Layout>
        <Helmet>
          <title>Browse Extensions</title>
        </Helmet>

        <div className="ext-filters">
          <div className="filter-label">Compatibility</div>
          <FormControl
            defaultValue={query.versions === undefined ? '2' : query.versions}
            onChange={this.onAPIVersionSelect}
            className="version-filter"
            componentClass="select"
          >
            <option value="2">Ulauncher v5 (API v2)</option>
            <option value="2,3">Ulauncher v6 (API v2 or v3)</option>
            <option value="">Any</option>
          </FormControl>
          <div className="sort-label">Sort by</div>
          <FormControl
            defaultValue={query.sorting === undefined ? 'newest_first' : query.sorting}
            onChange={this.onSortingSelect}
            className="sorting-select"
            componentClass="select"
          >
            <option value="newest_first">Newest first</option>
            <option value="github_stars">Github stars</option>
          </FormControl>
        </div>

        <ExtensionGrid error={error} isFetching={fetching} items={items} showLoadMore={false} />

        {hasMoreItems && (
          <div className="text-center m-b">
            <button type="button" className="btn btn-primary" onClick={this.loadMore} disabled={fetching}>
              {fetching ? (
                <span>
                  <i className="fa fa-spinner fa-spin" /> Loading...
                </span>
              ) : (
                <span>
                  <i className="fa fa-refresh" /> Show more
                </span>
              )}
            </button>
          </div>
        )}
      </Layout>
    )
  }

  buildBrowserQueryString(overrides) {
    const browserQuery = getQueryParams(this.props.history.location.search)
    const queryObject = {}
    if (browserQuery.versions !== undefined) {
      queryObject.versions = browserQuery.versions
    }
    if (browserQuery.sorting !== undefined) {
      queryObject.sorting = browserQuery.sorting
    }
    return buildQueryString({ ...queryObject, ...(overrides || {}) })
  }

  getRequestOptions(queryString) {
    const browserQuery = getQueryParams(queryString || this.props.history.location.search)
    const options = {}
    if (browserQuery.versions !== undefined) {
      options.versions = browserQuery.versions
    }

    const selectedSortingOption = sortingOptions[browserQuery.sorting] || sortingOptions.newest_first
    options.sort_by = selectedSortingOption.sort_by
    options.sort_order = selectedSortingOption.sort_order

    // Add pagination parameters
    options.offset = this.state ? this.state.offset : 0
    options.limit = ITEMS_PER_PAGE

    return options
  }
}

const mapStateToProps = state => ({
  ...state.ext.browse
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Browse))
