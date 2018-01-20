import React from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

import { login, logout } from '../auth0/auth0Actions'
import * as auth0Selectors from '../auth0/auth0Selectors'
import { Link, withRouter } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import NavLink from './NavLink'
import logo from './images/ulauncher.png'

export const Navigation = ({ isLoggedIn, githubName, actions, history }) => (
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">
          <img src={logo} height="20" alt="Ulauncher" /> Extensions
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle>
        <i className="fa fa-reorder" />
      </Navbar.Toggle>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavLink exact to="/">
          Browse
        </NavLink>
        <NavLink to="/new">Submit New</NavLink>
        <NavItem href="http://docs.ulauncher.io">API Docs</NavItem>
        <NavItem href="https://ulauncher.io">Ulauncher App</NavItem>
      </Nav>
      <Nav pullRight>
        {isLoggedIn ? (
          <NavDropdown
            title={
              <span>
                <i className="fa fa-github" /> {githubName}
              </span>
            }
            id="user-profile-dropdown"
          >
            <LinkContainer to="/my">
              <MenuItem>My Extensions</MenuItem>
            </LinkContainer>
            <MenuItem divider />
            <MenuItem onClick={() => actions.logout(history)}>Log Out</MenuItem>
          </NavDropdown>
        ) : (
          <NavItem onClick={() => actions.login(history)}>Log In</NavItem>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

const mapStateToProps = state => {
  return {
    isLoggedIn: auth0Selectors.isLoggedIn(state),
    githubName: auth0Selectors.getGithubName(state)
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ login, logout }, dispatch)
})

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Navigation)
