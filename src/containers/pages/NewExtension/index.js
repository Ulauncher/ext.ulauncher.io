import React from 'react'
import { connect } from 'react-redux'
import Layout from '../Layout'

import ProjectUrl from './ProjectUrl'
import Info from './Info'

class NewExtension extends React.Component {
  constructor(props) {
    super(props)

    this.showStep = this.showStep.bind(this)

    this.steps = [
      {
        title: 'Enter URL'
      },
      {
        title: 'Edit Info'
      }
    ]
  }

  showStep() {
    let { step } = this.props.newExtension

    switch (step) {
      case 2:
        return <Info />

      case 1:
      default:
        return <ProjectUrl />
    }
  }

  render() {
    let { step } = this.props.newExtension

    return (
      <Layout>
        <div className="wrapper wrapper-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="ibox">
                  <div className="ibox-title">
                    <h5>Submit extension</h5>
                  </div>
                  <div className="ibox-content">
                    <div className="wizard clearfix">
                      <div className="steps clearfix">
                        <ul>
                          {this.steps.map((item, i) => (
                            <li key={i.toString()} className={i + 1 === step ? 'current' : i + 1 <= step ? 'done' : ''}>
                              <span className="item">
                                <span className="number">{i + 1}.</span> {item.title}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="content clearfix">
                        <div className="step-content body current">
                          <div className="m-t-md">
                            <div className="col-lg-12">{this.showStep()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default connect(state => {
  return {
    newExtension: state.newExtension
  }
})(NewExtension)
