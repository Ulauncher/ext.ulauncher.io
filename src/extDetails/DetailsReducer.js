import { FETCH_ITEM, RESET_STATE, SET_ITEM } from './DetailsActions'

const initState = {
  isFetching: false,
  item: null,
  error: null
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case `${FETCH_ITEM}_PENDING`:
      return {
        ...state,
        isFetching: true
      }

    case `${FETCH_ITEM}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }

    case `${FETCH_ITEM}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        error: null,
        item: action.payload.data
      }

    case RESET_STATE:
      return { ...initState }

    case SET_ITEM:
      return {
        ...initState,
        item: action.item
      }

    default:
      return state
  }
}
