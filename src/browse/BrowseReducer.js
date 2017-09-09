import { BROWSE_FETCH } from './BrowseActions'

const initState = {
  isFetching: false,
  items: [],
  error: null
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case `${BROWSE_FETCH}_PENDING`:
      return {
        ...state,
        isFetching: true
      }

    case `${BROWSE_FETCH}_REJECTED`:
      const { error } = action.payload
      return {
        ...state,
        isFetching: false,
        error: error || action.payload.toString() || 'Connection error'
      }

    case `${BROWSE_FETCH}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        error: null,
        items: action.payload.data
      }

    default:
      return state
  }
}
