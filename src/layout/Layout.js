import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import Navigation from './Navigation'

class Layout extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <div id="page-wrapper" className="gray-bg">
          <Helmet>
            <body className="top-navigation" />
          </Helmet>
          <Navigation />

          <div className="wrapper wrapper-content">
            <div className="container">{this.props.children}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({ globalError: state.globalError }))(Layout)
