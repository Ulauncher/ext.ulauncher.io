import React from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import Layout from '../layout/Layout'
import HttpError from '../layout/error/HttpError'
import IboxContent from '../layout/IboxContent'

export class EditExtension extends React.Component {
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

  render() {
    const { isFetching, error } = this.props
    const item = this.getItem()

    if (error) {
      return <HttpError error={error} />
    }

    return (
      <div>
        <Layout>
          <Helmet>
            <title>{item.Name || '...'}</title>
          </Helmet>
          <IboxContent title="Edit Extension" fetching={isFetching}>
            content
          </IboxContent>
        </Layout>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.ext.details
})

export default connect(mapStateToProps)(EditExtension)
