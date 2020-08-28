import React from 'react'
import { connect } from 'react-redux'
import Layout from '../layout/Layout'
import { Helmet } from 'react-helmet'
import Step1 from './Step1'
import Step2 from './Step2'
import IboxContent from '../layout/IboxContent'
import Wizard from '../layout/Wizard'

export class AddExtension extends React.Component {
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

        <IboxContent title="Submit Extension">
          <Wizard current={this.props.step} steps={this.steps} />
        </IboxContent>
      </Layout>
    )
  }
}

export default connect(state => ({ step: state.ext.add.step }))(AddExtension)
