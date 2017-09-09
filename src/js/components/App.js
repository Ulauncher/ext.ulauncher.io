import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { connect } from 'react-redux';
import Layout from "../components/pages/Layout";
import Index from "../components/pages/Index";
import NewExtension from "../components/pages/NewExtension";
import ExtensionInfo from "../components/pages/ExtensionInfo"
import AuthService from '../utils/AuthService';
import {loginSuccess, loginError} from '../actions/authActions';

const requireAuth = (nextState, replace) => {

  if (!AuthService.loggedIn()) {
    replace({pathname: '/'})
  }
};

const parseAuthHash = (store) => {

  const onSuccess = (profile) => {
    store.dispatch(loginSuccess(profile));
  };

  const onError = (err) => {
    store.dispatch(loginError(err));
  };

  return (nextState, replace) => {

    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      AuthService.parseHash(nextState.location.hash, onSuccess, onError)
    } else {
      replace({pathname: '/'});
    }
  }
};

const App = ({ store }) => (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Index}/>
        <Route path="submit" name="submit" component={NewExtension} onEnter={requireAuth}/>
        <Route path="extension/:id" name="info" component={ExtensionInfo}/>
        <Route path="login" onEnter={parseAuthHash(store)}/>
      </Route>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired,
};

export default App;