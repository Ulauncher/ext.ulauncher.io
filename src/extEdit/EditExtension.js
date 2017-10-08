import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import { reduxForm } from 'redux-form'
import { Alert, FormGroup, ButtonToolbar, Button } from 'react-bootstrap'
import Layout from '../layout/Layout'
import HttpError from '../layout/error/HttpError'
import IboxContent from '../layout/IboxContent'
import ReduxFormInput from '../layout/ReduxFormInput'
import submitEditForm from './submitEditForm'

export class EditExtension extends React.Component {
  constructor(props) {
    super(props)
    if (!this.getItem()) {
      this.props.actions.fetchItem(this.props.match.params.id)
    }
  }

  getItem() {
    return this.props.item || this.props.location.state
  }

  render() {
    let { isFetching, fetchingError, error, handleSubmit, submitting, submitEditForm } = this.props
    const item = this.getItem()

    if (error || fetchingError) {
      return <HttpError error={error || fetchingError} />
    }

    return (
      <div>
        <Layout>
          <Helmet>
            <title>{item ? item.Name : '...'}</title>
          </Helmet>
          <IboxContent title="Edit Extension" fetching={isFetching}>
            <form className="form-horizontal" onSubmit={handleSubmit(submitEditForm)}>
              <FormGroup>
                <label className="col-sm-2 control-label">Github URL</label>
                <div className="col-sm-10">
                  <p className="form-control-static">{item.GithubUrl}</p>
                </div>
              </FormGroup>
              <ReduxFormInput label="Name" name="Name" />
              <ReduxFormInput label="Description" name="Description" />
              <ReduxFormInput label="Developer Name" name="DeveloperName" />

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

const mapStateToProps = state => {
  const { profile, ...rest } = state.clientProfile
  let initialValues = null
  if (profile) {
    let { userId, salesPerson, ...editableFields } = profile
    initialValues = editableFields
  }

  return {
    initialValues: initialValues,
    profile,
    submitEditForm,
    details: state.ext.details
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getClientProfile }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'initializeFromState' })(EditExtension))
