import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout/Layout'
import IboxContent from '../layout/IboxContent'
import extPrefs from './ext-prefs.png'

class About extends Component {
  render() {
    return (
      <Layout>
        <Helmet>
          <title>About</title>
        </Helmet>

        <IboxContent title="About Ulauncher Extensions">
          <h2>How to Use Them?</h2>
          <p>Open Ulauncher Preferences and click "Add Extension" link:</p>
          <p>
            <img src={extPrefs} width="100%" alt="Ulauncher Preferences" />
          </p>

          <h2>What Ulauncher Extensions Are?</h2>
          <p>Ulauncher extensions are Python programs that run as separate processes along with the app.</p>
          <p>
            When you run Ulauncher it starts all available extensions so they are ready to react to user events. All
            extensions are terminated when Ulauncher app is closed or crashed.
          </p>

          <h2>Want to Build Your Own?</h2>
          <p>
            Interested in creating extensions? Visit the
            <a href="http://docs.ulauncher.io/" target="_blank" rel="noopener noreferrer">
              {' '}
              official extension documentation
            </a>
            to follow guides and best practices.
          </p>
        </IboxContent>
      </Layout>
    )
  }
}

export default About
