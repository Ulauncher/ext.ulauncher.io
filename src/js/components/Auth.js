import React from "react";
import {connect} from 'react-redux';
import {login, logout} from '../actions/authActions';

class Auth extends React.Component {

  constructor(props) {
    super(props);
  }

  login(e) {
    e.preventDefault();
    this.props.login();
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {

    const {isAuthenticated} = this.props.auth;

    const logOut = (
      <a href="#" onClick={this.logout.bind(this)}>Logout</a>
    );

    const logIn = (
      <a onClick={this.login.bind(this)}>Login</a>
    );

    return isAuthenticated ? logOut : logIn;
  }
}

Auth.propTypes = {
  auth: React.PropTypes.object,
  login: React.PropTypes.func,
  logout: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, {
  login,
  logout
})(Auth);