import { DETAILS_FETCH } from './DetailsActions'

const initState = {
  isFetching: false,
  item: null,
  error: null
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case `${DETAILS_FETCH}_PENDING`:
      return {
        ...state,
        isFetching: true
      }

    case `${DETAILS_FETCH}_REJECTED`:
      const { error } = action.payload
      return {
        ...state,
        isFetching: false,
        error: error || 'Connection error'
      }

    case `${DETAILS_FETCH}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        error: null,
        item: action.payload.data
      }

    default:
      return state
  }
}
