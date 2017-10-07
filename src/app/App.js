import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import Browse from '../browse/Browse'
import My from '../my/My'
import AddExtension from '../addExtension/AddExtension'
import AuthCallback from '../auth0/AuthCallback'
import { renewAuth0Session } from '../auth0/auth0Actions'
import UserRoute from '../auth0/UserRoute'
import NotFound from '../error/NotFound'
import Details from '../details/Details'
import NotLoggedIn from '../layout/NotLoggedIn'

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
            <Route exact path="/" component={Browse} />
            <Route path="/-/:id" component={Details} />
            <Route path="/auth0-callback" component={AuthCallback} />
            <UserRoute path="/new" auth={AddExtension} unauth={NotLoggedIn} />
            <UserRoute path="/my" auth={My} unauth={NotLoggedIn} />
            <Route component={NotFound} />
          </Switch>
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
