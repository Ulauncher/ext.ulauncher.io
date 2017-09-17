import React from 'react'
import { connect } from 'react-redux'
import Layout from '../layout/Layout'
import Helmet from 'react-helmet'
import Step1 from './Step1'
import Step2 from './Step2'
import IboxContent from '../layout/IboxContent'
import Wizard from '../layout/Wizard'
import UserIsLoggedIn from '../auth0/UserIsLoggedIn'
import AuthLink from '../auth0/AuthLink'

class AddExtension extends React.Component {
  constructor(props) {
    super(props)
    this.steps = [
      {
        title: 'Enter URL',
        component: Step1
      },
      {
        title: 'Edit Info',
        component: Step2
      }
    ]
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <title>Submit Extension</title>
        </Helmet>

        <UserIsLoggedIn inverse>
          <IboxContent title="You are not logged in">
            <i className="fa fa-info-circle" />&nbsp;Please <AuthLink login>log in</AuthLink> with your Github or Google
            account in order to submit extensions.
          </IboxContent>
        </UserIsLoggedIn>

        <UserIsLoggedIn>
          <IboxContent title="Submit Extension">
            <Wizard current={this.props.step} steps={this.steps} />
          </IboxContent>
        </UserIsLoggedIn>
      </Layout>
    )
  }
}

export default connect(state => ({ step: state.addExtension.step }))(AddExtension)
