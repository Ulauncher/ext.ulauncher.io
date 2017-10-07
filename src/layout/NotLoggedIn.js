import React from 'react'
import Helmet from 'react-helmet'
import Layout from './Layout'
import IboxContent from './IboxContent'
import AuthLink from '../auth0/AuthLink'

const NotLoggedIn = () => (
  <Layout>
    <Helmet>
      <title>Not Logged In</title>
    </Helmet>

    <IboxContent title="You are not logged in">
      <i className="fa fa-info-circle" />&nbsp;Please{' '}
      <AuthLink type="link" login>
        log in
      </AuthLink>{' '}
      with your Github account.
    </IboxContent>
  </Layout>
)

export default NotLoggedIn
