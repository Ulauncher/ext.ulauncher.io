import React from "react";
import ReactDOM from "react-dom";
import {Router, browserHistory} from "react-router";
import {Provider} from "react-redux"

import store from "./store"
import App from "./components/App"


const root = document.getElementById('app');

ReactDOM.render(
  <App store={store}/>,
  root);