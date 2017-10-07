import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import Helmet from 'react-helmet'
import copy from 'copy-to-clipboard'
import { FormGroup, InputGroup, Button, FormControl, Tooltip } from 'react-bootstrap'
import Layout from '../layout/Layout'
import HttpError from '../error/HttpError'
import LoadingAnimation from '../layout/LoadingAnimation'
import { fetchItem, resetState } from './DetailsActions'

class Details extends Component {
  constructor(props) {
    super(props)
    this.copyUrl = this.copyUrl.bind(this)
    this.state = {
      urlCopied: false
    }
    if (!this.getItem()) {
      this.props.actions.fetchItem(this.props.match.params.id)
    }
  }

  getItem() {
    return this.props.item || this.props.location.state
  }

  componentWillUnmount() {
    this.props.actions.resetState()
  }

  copyUrl() {
    copy(this.getItem().GithubUrl)
    this.setState({ urlCopied: true })
    setTimeout(() => this.setState({ urlCopied: false }), 1e3)
  }

  render() {
    const { isFetching, error } = this.props
    const item = this.getItem()
    if (error) {
      return <HttpError error={error} />
    }
    if (isFetching || !item) {
      return (
        <Layout>
          <LoadingAnimation />
        </Layout>
      )
    }

    const [user, repo] = item.ProjectPath.split('/')
    return (
      <Layout>
        <Helmet>
          <title>{item.Name || '...'}</title>
        </Helmet>
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox product-detail">
              <div className="ibox-content">
                <div className="row">
                  <div className="col-md-5 m-b-lg">
                    <Slider dots infinite={false} speed="300" slidesToShow="1" slidesToScroll="1">
                      {item.Images.map(image => (
                        <div key={image}>
                          <img
                            className="center-block"
                            style={{ width: 'auto', maxWidth: '100%' }}
                            src={image}
                            alt={`Screen shot ${item.Name} Ulauncher extension`}
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                  <div className="col-md-offset-1 col-md-6">
                    <h2 className="font-bold"> {item.Name} </h2>

                    <div className="text-muted m-b-md">
                      <small>by {item.DeveloperName}</small>
                    </div>

                    <FormGroup>
                      <InputGroup>
                        <InputGroup.Button>
                          <Button bsStyle="primary" title="Copy to clipboard" onClick={this.copyUrl}>
                            <i className="fa fa-clipboard" />
                          </Button>
                          {this.state.urlCopied && (
                            <Tooltip placement="bottom" className="in" id="tooltip-copied">
                              Copied!
                            </Tooltip>
                          )}
                        </InputGroup.Button>
                        <FormControl type="text" defaultValue={item.GithubUrl} />
                      </InputGroup>
                    </FormGroup>

                    <div className="m-t-xl m-b-xl">{item.Description}</div>

                    <iframe
                      title="Github Stars"
                      src={`https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=watch&count=true`}
                      allowTransparency
                      frameBorder="0"
                      scrolling="0"
                      width="100px"
                      height="20px"
                    />
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

const mapStateToProps = state => ({
  ...state.details
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ fetchItem, resetState }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Details)
