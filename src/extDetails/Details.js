import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import copy from 'copy-to-clipboard'
import { FormGroup, InputGroup, Button, FormControl, Tooltip } from 'react-bootstrap'

import Layout from '../layout/Layout'
import HttpError from '../layout/error/HttpError'
import LoadingAnimation from '../layout/LoadingAnimation'
import makeTypesActionsReducer from '../api/makeTypesActionsReducer'
import withComments from '../comments/withComments'
import DisqusComments from '../comments/DisqusComments'
import { fetchItem } from '../api'
import './gh-button.css'

const { actions, reducer } = makeTypesActionsReducer('EXT/DETAILS', fetchItem)
export { reducer }

export class Details extends Component {
  constructor(props) {
    super(props)
    this.copyUrl = this.copyUrl.bind(this)
    this.showComments = this.showComments.bind(this)
    this.state = {
      urlCopied: false,
      showComments: false
    }
    if (!this.getItem()) {
      this.props.actions.httpRequest(this.props.match.params.id)
    }
  }

  showComments() {
    this.setState(state => ({ showComments: !state.showComments }))
  }

  getItem() {
    return this.props.payload ? this.props.payload.data : this.props.location.state
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
    const { isFetching, error, currentUser, comments } = this.props
    const { showComments } = this.state
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
    const githubIssuesUrl = `https://github.com/${user}/${repo}/issues`
    return (
      <Layout>
        <Helmet>
          <title>{item.Name}</title>
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

                    <div className="m-t-xl m-b-xl">
                      {item.Description}
                      {item.User === currentUser && (
                        <p className="m-t text-righ">
                          <Link to={`/-/${item.ID}/edit`} className="btn btn-xs btn-outline btn-primary">
                            <i className="fa fa-pencil" /> Edit
                          </Link>
                        </p>
                      )}
                    </div>

                    <div className="github-btn">
                      <a href={githubIssuesUrl} className="gh-btn" title="Report Issue">
                        <i className="fa fa-bug" /> <span className="gh-text">Report Issue</span>
                      </a>
                    </div>
                    <iframe
                      title="Github Stars"
                      src={`https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=watch&count=true`}
                      allowTransparency
                      frameBorder="0"
                      scrolling="0"
                      width="100px"
                      height="20px"
                    />

                    {comments && (
                      <a className="clearfix show m-t-sm" onClick={this.showComments}>
                        Show archived comments
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {comments &&
        showComments && <DisqusComments comments={comments} githubIssuesUrl={githubIssuesUrl} extId={item.ID} />}
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  ...state.ext.details,
  currentUser: state.auth0.session && state.auth0.session.user.id
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default withComments(connect(mapStateToProps, mapDispatchToProps)(Details))
