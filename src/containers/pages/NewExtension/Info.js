import React from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import classnames from 'classnames'
import validate from './validate'

import { backToCheckProjectUrl, uploadImages, submitExtension } from '../../../actions/newExtension'

class Info extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.prevStep = this.prevStep.bind(this)

    this.state = {
      data: this.props.newExtension.formData ? this.props.newExtension.formData : {},
      files: this.props.newExtension.files ? this.props.newExtension.files : [],
      errors: {}
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    let data = {}
    data.name = this.refs.name.value
    data.description = this.refs.description.value

    let errors = validate(data, 2)
    if (!Object.keys(errors).length) {
      let extension = {
        GithubUrl: this.state.data.project_url,
        Name: this.refs.name.value,
        Description: this.refs.description.value,
        DeveloperName: this.state.data.developer,
        Images: this.state.files.map(i => i.file)
      }
      this.props.dispatch(submitExtension(extension))
    } else {
      this.setState({ errors: errors })
    }
  }

  prevStep() {
    this.props.dispatch(backToCheckProjectUrl())
  }

  onDrop(files) {
    this.props.dispatch(uploadImages(files))
  }

  render() {
    let { errors } = this.state

    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className={classnames('form-group', { 'has-error': errors.name })}>
          <label className="col-lg-2 control-label">Name</label>

          <div className="col-lg-10">
            <input type="text" ref="name" defaultValue={this.state.data.name} className="form-control" />

            {errors.name && <span className="help-block">{errors.name}</span>}
          </div>
        </div>

        <div className={classnames('form-group', { 'has-error': errors.description })}>
          <label className="col-lg-2 control-label">Description</label>

          <div className="col-lg-10">
            <textarea
              className="form-control"
              name="description"
              ref="description"
              defaultValue={this.state.data.description}
            />

            {errors.description && <span className="help-block">{errors.description}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="col-lg-2 control-label">Screen shots</label>

          <div className="col-lg-10">
            <Dropzone className="text-center p-xl ibox-content" onDrop={this.onDrop.bind(this)}>
              <p>Drop images here or select to upload</p>
            </Dropzone>

            <div className="text-center images-wrapp">
              {this.state.files.map((item, i) => (
                <div className="prev-img">
                  <img src={item.file} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button className="btn btn-sm btn-white" type="button" onClick={this.prevStep}>
              <i class="fa fa-arrow-left" /> Previous
            </button>

            <button className="btn btn-sm btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default connect(state => ({ newExtension: state.newExtension }))(Info)
