import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'
import { reduxForm } from 'redux-form'
import { Alert, FormGroup, ButtonToolbar, Button } from 'react-bootstrap'
import { actions as toastrActions } from 'react-redux-toastr'

import Layout from '../layout/Layout'
import HttpError from '../layout/error/HttpError'
import IboxContent from '../layout/IboxContent'
import ReduxFormInput from '../layout/ReduxFormInput'
import ScreenshotDropzone from '../extCommon/ScreenshotDropzone'
import submitEditForm from './submitEditForm'
import { actions } from './editExtensionTAR'

export class EditExtension extends React.Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.updatedItem = null

    this.props.actions.resetDeleteState()
    this.props.actions.fetchItem(this.props.match.params.id)
  }

  getItem() {
    if (this.updatedItem) {
      return this.updatedItem
    }
    const { payload } = this.props.itemState
    return payload && payload.data
  }

  async onSubmit(data) {
    const item = this.getItem()
    const resp = await this.props.submitEditForm(item.ID, {
      ...data,
      Images: this.props.newImages
    })
    this.updatedItem = resp.data
    this.props.toastr.add({
      type: 'success',
      title: 'Success',
      message: 'Extension has been saved',
      options: { showCloseButton: true }
    })
  }

  onDelete() {
    this.props.toastr.showConfirm({
      message: 'You sure?',
      options: {
        okText: 'Yes',
        cancelTex: 'No',
        onOk: () => this.props.actions.deleteItem(this.getItem().ID)
      }
    })
  }

  render() {
    let { itemState, delState, error, handleSubmit, submitting } = this.props
    const item = this.getItem()

    if (delState.payload) {
      const myExt = { pathname: '/my', state: { deleted: true } }
      return <Redirect to={myExt} />
    }

    if (itemState.error || delState.error) {
      return <HttpError error={itemState.error || delState.error} />
    }

    return (
      <div>
        <Layout>
          <Helmet>
            <title>{item && item.Name}</title>
          </Helmet>
          <IboxContent title="Edit Extension" fetching={itemState.fetching}>
            <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit)}>
              <FormGroup>
                <label className="col-sm-2 control-label">Github URL</label>
                <div className="col-sm-10">
                  <p className="form-control-static">{item && item.GithubUrl}</p>
                </div>
              </FormGroup>
              <ReduxFormInput label="Name" name="Name" />
              <ReduxFormInput label="Description" name="Description" />
              <ReduxFormInput label="Developer Name" name="DeveloperName" />

              {item && <ScreenshotDropzone existingImages={item.Images} />}

              <FormGroup>
                <div className="col-sm-10 col-sm-offset-2">
                  {error && <Alert bsStyle="danger">{error}</Alert>}
                  <ButtonToolbar>
                    <Button bsStyle="primary" type="submit" disabled={submitting}>
                      {submitting && (
                        <span>
                          <i className="fa fa-spinner fa-spin" />&nbsp;
                        </span>
                      )}
                      Save
                    </Button>
                    <Button onClick={this.onDelete} disabled={delState.fetching}>
                      {delState.fetching ? (
                        <span>
                          <i className="fa fa-spinner fa-spin" />&nbsp;
                        </span>
                      ) : (
                        <span>
                          <i className="fa fa-minux" />&nbsp;
                        </span>
                      )}
                      Remove
                    </Button>
                  </ButtonToolbar>
                </div>
              </FormGroup>
            </form>
          </IboxContent>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  let item
  try {
    item = state.ext.edit.item.payload.data
  } catch (e) {}

  return {
    initialValues: item && {
      Name: item.Name,
      Description: item.Description,
      DeveloperName: item.DeveloperName
    },
    submitEditForm,
    itemState: state.ext.edit.item,
    delState: state.ext.edit.del,
    newImages: state.ext.screenshots.images
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  toastr: bindActionCreators(toastrActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'initializeFromState'
  })(EditExtension)
)
