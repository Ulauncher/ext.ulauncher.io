import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../layout/Layout'
import ExtensionGrid from '../layout/ExtensionGrid'
import { fetchItems } from './BrowseActions'

class Browse extends Component {
  componentWillMount() {
    this.props.actions.fetchItems()
  }

  render() {
    const { error, isFetching, items } = this.props
    return (
      <Layout>
        <ExtensionGrid error={error} isFetching={isFetching} items={items} />
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  ...state.browse
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ fetchItems }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Browse)
