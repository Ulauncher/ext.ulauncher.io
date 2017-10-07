import React from 'react'
import AuthLink from '../auth0/AuthLink'
import UserIsLoggedIn from '../auth0/UserIsLoggedIn'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import NavLink from '../react/NavLink'
import logo from './images/ulauncher.png'

export default class Navigation extends React.Component {
  render() {
    // this is to get rid of a warning about unknown props that shows up when using <li> inside Nav
    const Li = ({ children }) => <li>{children}</li>

    const browse = (
      <NavLink exact to="/">
        Browse
      </NavLink>
    )
    const submitNew = <NavLink to="/new">Submit New</NavLink>
    const docs = <NavItem href="http://docs.ulauncher.io">API Docs</NavItem>
    const ulauncher = <NavItem href="https://ulauncher.io">Ulauncher App</NavItem>

    return (
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
          <UserIsLoggedIn>
            <Nav>
              {browse}
              {submitNew}
              <NavLink to="/my">Your Extensions</NavLink>
              {docs}
              {ulauncher}
            </Nav>
            <Nav pullRight>
              <Li>
                <AuthLink type="link">Log Out</AuthLink>
              </Li>
            </Nav>
          </UserIsLoggedIn>

          <UserIsLoggedIn inverse>
            <Nav>
              {browse}
              {submitNew}
              {docs}
              {ulauncher}
            </Nav>
            <Nav pullRight>
              <Li>
                <AuthLink type="link" login>
                  Log In
                </AuthLink>
              </Li>
            </Nav>
          </UserIsLoggedIn>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
