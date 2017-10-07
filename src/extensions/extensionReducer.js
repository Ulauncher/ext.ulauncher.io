export default function createReducer(actionType) {
  const initState = {
    isFetching: false,
    error: null,
    items: null
  }

  return function reducer(state = initState, action) {
    switch (action.type) {
      case `${actionType.FETCH_ITEMS}_PENDING`:
        return {
          ...state,
          isFetching: true
        }

      case `${actionType.FETCH_ITEMS}_REJECTED`:
        const { description } = action.payload
        return {
          ...state,
          isFetching: false,
          error: description || action.payload.toString() || 'Connection error'
        }

      case `${actionType.FETCH_ITEMS}_FULFILLED`:
        return {
          ...state,
          isFetching: false,
          error: null,
          items: action.payload.data
        }

      case actionType.RESET_STATE:
        return { ...initState }

      default:
        return state
    }
  }
}
