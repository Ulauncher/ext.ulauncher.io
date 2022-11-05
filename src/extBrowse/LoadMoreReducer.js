import { HTTP_REQUEST, RESET_STATE, UPDATE_STATE } from './LoadMoreActionTypes'

const initState = {
  fetching: false,
  payload: null,
  loadMore: false,
  loadedMore: null,
  error: null
}

function reducer(state = initState, action) {
  switch (action.type) {
    case `${HTTP_REQUEST}_PENDING`:
      return {
        ...state,
        payload: null,
        fetching: true
      }

    case `${HTTP_REQUEST}_REJECTED`:
      const { description } = action.payload
      return {
        ...state,
        fetching: false,
        error: description || 'Connection error'
      }

    case `${HTTP_REQUEST}_FULFILLED`:
      return {
        ...state,
        fetching: false,
        error: null,
        payload: state.loadMore ? state.payload : action.payload,
        loadedMore: state.loadMore ? (state.loadedMore || []).concat(action.payload) : []
      }

    case RESET_STATE:
      return { ...initState }

    case UPDATE_STATE:
      return {
        ...initState,
        ...action.updates
      }

    default:
      return state
  }
}

export { reducer }
