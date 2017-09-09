import React from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'

import validate from './validate'
import { checkProjectUrl, checkProjectUrlErrors } from '../../../actions/newExtension'

class ProjectUrl extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      data: this.props.newExtension.formData ? this.props.newExtension.formData : {}
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    let data = {}
    data.project_url = this.refs.project_url.value

    let errors = validate(data, 1)
    if (Object.keys(errors).length === 0) {
      this.props.dispatch(checkProjectUrl(data))
    } else {
      this.props.dispatch(checkProjectUrlErrors(errors))
    }
  }

  render() {
    let { formData, errors, isFetching } = this.props.newExtension

    return (
      <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <div className={classnames('form-group', { 'has-error': errors.project_url })}>
          <label className="col-lg-2 control-label">Github Project URL</label>
          <div className="col-lg-10">
            <input
              type="text"
              ref="project_url"
              defaultValue={formData.project_url}
              className="form-control"
              placeholder="https://github.com/username/project"
            />

            {errors.project_url && <span className="help-block">{errors.project_url}</span>}
          </div>
        </div>

        <div className="form-group">
          <div className="col-lg-offset-2 col-lg-10">
            <button className="btn btn-sm btn-primary" {...isFetching && { disabled: true }} type="submit">
              Next <i className="fa fa-arrow-right" />
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default connect(state => ({ newExtension: state.newExtension }))(ProjectUrl)
