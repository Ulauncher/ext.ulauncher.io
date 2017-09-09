import { MY_FETCH } from './MyActions'

const initState = {
  isFetching: false,
  items: [],
  error: null
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case `${MY_FETCH}_PENDING`:
      return {
        ...state,
        isFetching: true
      }

    case `${MY_FETCH}_REJECTED`:
      const { error } = action.payload
      return {
        ...state,
        isFetching: false,
        error: error || 'Connection error'
      }

    case `${MY_FETCH}_FULFILLED`:
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
