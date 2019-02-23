import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import { getComments } from '../api'
import makeTypesActionsReducer from '../api/makeTypesActionsReducer'

const { actions, reducer } = makeTypesActionsReducer('EXT/COMMENTS', getComments)
export { reducer }

/**
 * returns a higher-order component with 'comments' in props
 */
export default function withComments(WrappedComponent) {
  class WithComments extends React.Component {
    componentDidMount() {
      const { actions, match } = this.props
      actions.httpRequest(match.params.id)
    }

    componentWillUnmount() {
      this.props.actions.resetState()
    }

    render() {
      const { comments, ...rest } = this.props
      const { fetching, error, payload } = comments
      return <WrappedComponent comments={!fetching && !error && payload} {...rest} />
    }
  }

  WithComments.displayName = `WithComments(${getDisplayName(WrappedComponent)})`

  const mapStateToProps = state => ({
    comments: state.ext.comments
  })

  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })

  return compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(WithComments)
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
