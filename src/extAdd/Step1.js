import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap'
import { validateExtensionUrl } from './AddExtensionActions'

class Step1 extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.actions.validateExtensionUrl(this.githubUrlInput.value)
  }

  render() {
    const { errors, formData, isFetching } = this.props.state
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup validationState={errors.GithubUrl && 'error'}>
          <ControlLabel>Github Project URL</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            defaultValue={formData.GithubUrl}
            placeholder="https://github.com/username/project"
            inputRef={ref => {
              this.githubUrlInput = ref
            }}
          />
          <HelpBlock>{errors.GithubUrl}</HelpBlock>
        </FormGroup>

        <FormGroup>
          <Button type="submit" bsStyle="primary" disabled={isFetching}>
            Next &nbsp;
            {isFetching ? <i className="fa fa-spin fa-spinner" /> : <i className="fa fa-arrow-right" />}
          </Button>
        </FormGroup>
      </form>
    )
  }
}

const mapStateToProps = state => ({ state: state.ext.add })
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ validateExtensionUrl }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Step1)
