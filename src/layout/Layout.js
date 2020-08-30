import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import Navigation from './Navigation'
import './css/animate.css'
import './css/style.css'
import './css/custom.css'

class Layout extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <div id="page-wrapper" className="gray-bg">
          <Helmet>
            <body className="top-navigation body-small" />
          </Helmet>

          <div className="row border-bottom white-bg">
            <Navigation />
          </div>

          <div className="wrapper wrapper-content">
            <div className="container">{this.props.children}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => ({ globalError: state.globalError }))(Layout)
