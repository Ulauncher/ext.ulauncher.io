import React from 'react'
import AuthLink from '../auth0/AuthLink'
import UserIsLoggedIn from '../auth0/UserIsLoggedIn'
import { Link } from 'react-router-dom'
import NavLink from '../react/NavLink'
import logo from './ulauncher.png'

export default class Navigation extends React.Component {
  render() {
    const browse = (
      <NavLink exact to="/">
        Browse
      </NavLink>
    )
    const docs = (
      <li>
        <a href="http://docs.ulauncher.io">API Docs</a>
      </li>
    )
    const ulauncher = (
      <li>
        <a href="https://ulauncher.io">Ulauncher App</a>
      </li>
    )

    return (
      <div className="row border-bottom white-bg">
        <div className="navbar navbar-static-top" role="navigation">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand text-nowrap">
              <img src={logo} height="20" alt="Ulauncher" /> Extensions
            </Link>
          </div>
          <div className="navbar-collapse collapse" id="navbar">
            <UserIsLoggedIn>
              <div>
                <ul className="nav navbar-nav navbar-left">
                  {browse}
                  <NavLink to="/new">Submit New</NavLink>
                  <NavLink to="/my">Your Extensions</NavLink>
                  {docs}
                  {ulauncher}
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <AuthLink>
                      <i className="fa fa-sign-out" /> Log Out
                    </AuthLink>
                  </li>
                </ul>
              </div>
            </UserIsLoggedIn>

            <UserIsLoggedIn inverse>
              <div>
                <ul className="nav navbar-nav navbar-left">
                  {browse}
                  <NavLink to="/new">Submit New</NavLink>
                  {docs}
                  {ulauncher}
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <AuthLink login>
                      <i className="fa fa-sign-in" /> Log In
                    </AuthLink>
                  </li>
                </ul>
              </div>
            </UserIsLoggedIn>
          </div>
        </div>
      </div>
    )
  }
}
