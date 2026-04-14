import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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

const ITEMS_PER_PAGE = 54

class Browse extends Component {
  constructor(props) {
    super(props)
    this.onAPIVersionSelect = this.onAPIVersionSelect.bind(this)
    this.onSortingSelect = this.onSortingSelect.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.onSearchClear = this.onSearchClear.bind(this)
    this.loadMore = this.loadMore.bind(this)

    const query = getQueryParams(props.history.location.search)
    this.state = {
      loadedForQuery: props.history.location.search,
      offset: 0,
      items: [],
      searchInput: query.q || ''
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
      const newQuery = getQueryParams(history.location.search)
      const options = this.getRequestOptions(history.location.search)
      actions.httpRequest(options)
      this.setState({
        loadedForQuery: history.location.search,
        offset: 0,
        items: [],
        searchInput: newQuery.q || ''
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

  onSearchChange(event) {
    this.setState({ searchInput: event.target.value })
  }

  onSearchSubmit(event) {
    event.preventDefault()
    const q = this.state.searchInput.trim()
    const newQuery = `?${this.buildBrowserQueryString({ q: q || undefined })}`
    const options = { ...this.getRequestOptions(newQuery), offset: 0 }
    this.props.history.push(`/${newQuery}`)
    this.props.actions.httpRequest(options)
    this.setState({ loadedForQuery: newQuery, offset: 0, items: [] })
  }

  onSearchClear() {
    const newQuery = `?${this.buildBrowserQueryString({ q: undefined })}`
    const options = { ...this.getRequestOptions(newQuery), offset: 0 }
    this.props.history.push(`/${newQuery}`)
    this.props.actions.httpRequest(options)
    this.setState({ searchInput: '', loadedForQuery: newQuery, offset: 0, items: [] })
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
    const { items, searchInput } = this.state
    const query = getQueryParams(history.location.search)
    const hasMoreItems = payload && payload.data && payload.data.length === ITEMS_PER_PAGE
    const isSearchActive = !!(query.q && query.q.trim())

    return (
      <Layout>
        <Helmet>
          <title>Browse Extensions</title>
        </Helmet>

        <div className="ext-filters-panel">
          <form onSubmit={this.onSearchSubmit}>
            <div className="ext-search-wrap">
              <i className="fa fa-search ext-search-icon" />
              <input
                type="search"
                className="ext-search-input"
                placeholder="Search extensions…"
                value={searchInput}
                onChange={this.onSearchChange}
              />
              {searchInput && (
                <button type="button" className="ext-search-clear" onClick={this.onSearchClear} title="Clear search">
                  <i className="fa fa-times" />
                </button>
              )}
            </div>
          </form>

          <div className="ext-filter-row">
            <div className="ext-filter-group">
              <span className="ext-filter-label">Compatibility</span>
              <select
                className="ext-filter-select"
                value={query.versions === undefined ? '2' : query.versions}
                onChange={this.onAPIVersionSelect}
              >
                <option value="2">Ulauncher v5 (API v2)</option>
                <option value="2,3">Ulauncher v6 (API v2 or v3)</option>
                <option value="">Any version</option>
              </select>
            </div>

            <div className="ext-filter-group ext-filter-sort">
              <span className="ext-filter-label">Sort by</span>
              {isSearchActive ? (
                <span className="ext-relevance-badge">
                  <i className="fa fa-bullseye" /> Relevance
                </span>
              ) : (
                <select
                  className="ext-filter-select"
                  value={query.sorting === undefined ? 'newest_first' : query.sorting}
                  onChange={this.onSortingSelect}
                >
                  <option value="newest_first">Newest first</option>
                  <option value="github_stars">GitHub stars</option>
                </select>
              )}
            </div>
          </div>
        </div>

        <ExtensionGrid
          error={error}
          isFetching={fetching}
          items={items}
          showLoadMore={false}
          isLoadingMore={this.state.offset > 0 && fetching}
        />

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
    if (browserQuery.q) {
      queryObject.q = browserQuery.q
    }
    return buildQueryString({ ...queryObject, ...(overrides || {}) })
  }

  getRequestOptions(queryString) {
    const browserQuery = getQueryParams(queryString || this.props.history.location.search)
    const options = {}

    if (browserQuery.versions !== undefined) {
      options.versions = browserQuery.versions
    }

    if (browserQuery.q && browserQuery.q.trim()) {
      options.q = browserQuery.q.trim()
    }

    // Only apply explicit sorting when no search query — server ranks by relevance when q is set
    if (!options.q) {
      const selectedSortingOption = sortingOptions[browserQuery.sorting] || sortingOptions.newest_first
      options.sort_by = selectedSortingOption.sort_by
      options.sort_order = selectedSortingOption.sort_order
    }

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
