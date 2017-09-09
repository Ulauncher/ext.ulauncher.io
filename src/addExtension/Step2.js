import React from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button, Alert } from 'react-bootstrap'
import { stepBack, uploadImages, submitExtension } from './AddExtensionActions'

class Step2 extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.formValues = {
      ...this.props.state.formData
    }
  }

  handleChange(inputName) {
    return e => {
      this.formValues[inputName] = e.target.value
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    let extension = {
      ...this.props.state.formData,
      Name: this.formValues.Name,
      Description: this.formValues.Description
    }

    this.props.actions.submitExtension(extension, this.props.history)
  }

  render() {
    const { error, errors, formData, isFetching, uploadingImages } = this.props.state
    const { uploadImages, stepBack } = this.props.actions
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup validationState={errors.Name && 'error'}>
          <ControlLabel>Name</ControlLabel>
          <FormControl type="text" defaultValue={formData.Name} onChange={this.handleChange('Name')} />
          <HelpBlock>{errors.Name}</HelpBlock>
        </FormGroup>

        <FormGroup validationState={errors.Description && 'error'}>
          <ControlLabel>Description</ControlLabel>
          <FormControl type="text" defaultValue={formData.Description} onChange={this.handleChange('Description')} />
          <HelpBlock>{errors.Description}</HelpBlock>
        </FormGroup>

        <FormGroup validationState={errors.Images && 'error'}>
          <ControlLabel>Screen shots</ControlLabel>
          <Dropzone className="text-center p-xl ibox-content" onDrop={files => uploadImages(files)}>
            <p>
              Drop screen shots here or select to upload
              <span style={{ visibility: uploadingImages ? 'visible' : 'hidden' }}>
                &nbsp; <i className="fa fa-spin fa-spinner" />
              </span>
            </p>
          </Dropzone>

          <div className="text-center images-wrapp">
            {formData.Images.map((item, i) => (
              <div className="prev-img" key={i}>
                <img src={item} alt="Screen shot" />
              </div>
            ))}
          </div>
          <HelpBlock>{errors.Images}</HelpBlock>
        </FormGroup>

        {error && (
          <Alert bsStyle="danger">
            <i className="fa fa-exclamation-triangle" />&nbsp;{error}
          </Alert>
        )}

        <FormGroup>
          <Button onClick={stepBack}>
            <i className="fa fa-arrow-left" /> Previous
          </Button>
          <Button type="submit" bsStyle="primary" disabled={isFetching || !formData.Images.length}>
            {isFetching && (
              <span>
                <i className="fa fa-spin fa-spinner" />&nbsp;
              </span>
            )}
            Submit
          </Button>
        </FormGroup>
      </form>
    )
  }
}

const mapStateToProps = state => ({ state: state.addExtension })
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ stepBack, uploadImages, submitExtension }, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Step2))
