import React from "react";
import {Link} from "react-router";
import {connect} from 'react-redux';
import Auth from "./Auth";
import {menuLinks} from "../config";
import {checkLogin} from '../actions/authActions';

class Header extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const guestLinks = (
      <div>
        <ul className="nav navbar-nav navbar-left">
          {menuLinks.guest.map((item, i) =>
            <li key={i.toString()} >
              <Link to={item.path}>{item.title}</Link>
            </li>
          )}
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><Auth /></li>
        </ul>
      </div>
    );

    const userLinks = (
      <div>
        <ul className="nav navbar-nav navbar-left">
          {menuLinks.user.map((item, i) =>
            <li key={i.toString()}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          )}
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><Auth /></li>
        </ul>
      </div>
    );

    const {isAuthenticated} = this.props.auth;

    return (

      <div className="row border-bottom white-bg">
        <nav className="navbar navbar-static-top" role="navigation">
          <div className="navbar-header">
            <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse"
                    className="navbar-toggle collapsed" type="button">
              <i className="fa fa-reorder"/>
            </button>
            <a href="#" className="navbar-brand">Ulauncher</a>
          </div>
          <div className="navbar-collapse collapse" id="navbar">
            { isAuthenticated ? userLinks : guestLinks }
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  auth: React.PropTypes.object
};

export default connect((state) => {
  return {
    auth: state.auth
  };
})(Header);