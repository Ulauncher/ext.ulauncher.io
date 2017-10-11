export default function make(typePrefix, requestFn) {
  const initState = {
    fetching: false,
    payload: null,
    error: null
  }

  const types = {
    HTTP_REQUEST: `${typePrefix}/HTTP_REQUEST`,
    RESET_STATE: `${typePrefix}/RESET_STATE`,
    UPDATE_STATE: `${typePrefix}/UPDATE_STATE`
  }

  const actions = {
    httpRequest(...args) {
      return {
        type: types.HTTP_REQUEST,
        payload: requestFn(...args)
      }
    },

    resetState() {
      return { type: types.RESET_STATE }
    }
  }

  const reducer = (state = initState, action) => {
    switch (action.type) {
      case `${types.HTTP_REQUEST}_PENDING`:
        return {
          ...state,
          payload: null,
          fetching: true
        }

      case `${types.HTTP_REQUEST}_REJECTED`:
        const { description } = action.payload
        return {
          ...state,
          fetching: false,
          error: description || 'Connection error'
        }

      case `${types.HTTP_REQUEST}_FULFILLED`:
        return {
          ...state,
          fetching: false,
          error: null,
          payload: action.payload
        }

      case types.RESET_STATE:
        return { ...initState }

      case types.UPDATE_STATE:
        return {
          ...initState,
          ...action.updates
        }

      default:
        return state
    }
  }

  return {
    types,
    actions,
    reducer
  }
}
