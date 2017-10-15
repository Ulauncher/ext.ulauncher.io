import React, { Component } from 'react'
import { Link, withRouter, matchPath } from 'react-router-dom'

class NavLink extends Component {
  render() {
    const { location, to, exact, replace, children, hidden } = this.props
    if (hidden === true) {
      return null
    }
    const isActive = matchPath(location.pathname, {
      path: to,
      exact: exact
    })
    const className = isActive ? 'active' : ''
    const linkProps = {
      to: to,
      replace: replace,
      children: children
    }

    return (
      <li className={className}>
        <Link {...linkProps} />
      </li>
    )
  }
}

export default withRouter(NavLink)
