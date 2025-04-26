import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { FormGroup, Col, FormControl, ControlLabel, HelpBlock, Button, Alert } from 'react-bootstrap'
import { stepBack, submitExtension } from './AddExtensionActions'
import ScreenshotDropzone from '../extCommon/ScreenshotDropzone'

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
      Description: this.formValues.Description,
      Images: this.props.screenshots.images
    }

    this.props.actions.submitExtension(extension, this.props.history)
  }

  render() {
    const { error, errors, formData, isFetching } = this.props.state
    const { stepBack } = this.props.actions
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup validationState={errors.Name && 'error'}>
          <ControlLabel className="col-sm-2">Name</ControlLabel>
          <Col sm={10}>
            <FormControl type="text" defaultValue={formData.Name} onChange={this.handleChange('Name')} />
            <HelpBlock>{errors.Name}</HelpBlock>
          </Col>
        </FormGroup>

        <FormGroup validationState={errors.Description && 'error'}>
          <ControlLabel className="col-sm-2">Description</ControlLabel>
          <Col sm={10}>
            <FormControl type="text" defaultValue={formData.Description} onChange={this.handleChange('Description')} />
            <HelpBlock>{errors.Description}</HelpBlock>
          </Col>
        </FormGroup>

        <ScreenshotDropzone existingImages={this.props.screenshots.images} />

        <Col smOffset={2} sm={10}>
          {error && (
            <Alert bsStyle="danger">
              <i className="fa fa-exclamation-triangle" />
              &nbsp;{error}
            </Alert>
          )}
          <FormGroup>
            <Button onClick={stepBack}>
              <i className="fa fa-arrow-left" /> Previous
            </Button>
            <Button type="submit" bsStyle="primary" disabled={isFetching || !this.props.screenshots.images}>
              {isFetching && (
                <span>
                  <i className="fa fa-spin fa-spinner" />
                  &nbsp;
                </span>
              )}
              Submit
            </Button>
          </FormGroup>
        </Col>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  state: state.ext.add,
  screenshots: state.ext.screenshots
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ stepBack, submitExtension }, dispatch)
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Step2)
)
