import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import ReduxToastr from 'react-redux-toastr'

import Browse from '../extBrowse/Browse'
import My from '../extMy/My'
import AddExtension from '../extAdd/AddExtension'
import AuthCallback from '../auth0/AuthCallback'
import { renewAuth0Session } from '../auth0/auth0Actions'
import UserRoute from '../auth0/UserRoute'
import NotFound from '../layout/error/NotFound'
import EditExtension from '../extEdit/EditExtension'
import Details from '../extDetails/Details'
import NotLoggedIn from '../layout/NotLoggedIn'
import { logPageView } from './ga'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.setup(props)
  }

  componentWillReceiveProps(nextProps) {
    this.setup(nextProps)
  }

  setup(props) {
    if (props.auth0.session) {
      props.actions.renewAuth0Session(props.auth0.session)
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Helmet titleTemplate="%s &mdash; Ulauncher Extensions">
            <body className="gray-bg" />
          </Helmet>
          <Switch>
            <Route path="/" exact component={Browse} />
            <Route path="/-/:id" exact component={Details} />
            <UserRoute path="/-/:id/edit" exact auth={EditExtension} unauth={NotLoggedIn} />
            <Route path="/auth0-callback" component={AuthCallback} />
            <UserRoute path="/new" auth={AddExtension} unauth={NotLoggedIn} />
            <UserRoute path="/my" auth={My} unauth={NotLoggedIn} />
            <Route component={NotFound} />
          </Switch>
          <Route component={logPageView} />
          <ReduxToastr
            timeOut={2e3}
            preventDuplicates
            position="top-center"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  auth0: state.auth0
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ renewAuth0Session }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
