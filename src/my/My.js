import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import Layout from '../layout/Layout'
import ExtensionGrid from '../layout/ExtensionGrid'
import { fetchMyItems } from './MyActions'

class My extends Component {
  componentWillMount() {
    this.props.actions.fetchMyItems()
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
  actions: bindActionCreators({ fetchMyItems }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(My)
