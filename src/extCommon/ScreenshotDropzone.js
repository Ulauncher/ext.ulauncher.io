import React from 'react'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ControlLabel, Col, FormGroup, HelpBlock } from 'react-bootstrap'
import { actions } from './screenshotDropzoneTAR'

export class ScreenshotDropzone extends React.Component {
  componentDidMount() {
    this.props.actions.setState({
      images: this.props.existingImages
    })
  }

  render() {
    const { actions, error, uploadError, uploading, images } = this.props
    return (
      <FormGroup validationState={error || uploadError ? 'error' : null}>
        <ControlLabel className="col-sm-2">Screen shots</ControlLabel>
        <Col sm={10}>
          <Dropzone className="text-center p-xl ibox-content cursor-pointer" onDrop={actions.uploadImages}>
            <p>
              Drop screen shots here or select to upload
              <span style={{ visibility: uploading ? 'visible' : 'hidden' }}>
                &nbsp; <i className="fa fa-spin fa-spinner" />
              </span>
            </p>
          </Dropzone>
          <div className="text-center images-wrapp">
            {images &&
              images.map((item, i) => (
                <div className="prev-img" key={i}>
                  <div className="controls">
                    {i > 0 && (
                      <a onClick={() => actions.swapLeft(i)}>
                        <i className="fa fa-arrow-circle-left" />
                      </a>
                    )}
                    {i < images.length - 1 && (
                      <a onClick={() => actions.swapRight(i)}>
                        <i className="fa fa-arrow-circle-right" />
                      </a>
                    )}
                    <a onClick={() => actions.removeImage(i)}>
                      <i className="fa fa-minus-circle" />
                    </a>
                  </div>
                  <img src={item} alt="Screen shot" />
                </div>
              ))}
          </div>
          <HelpBlock>{error || uploadError}</HelpBlock>
        </Col>
      </FormGroup>
    )
  }
}

const mapStateToProps = state => ({ ...state.ext.screenshots })

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ScreenshotDropzone)
