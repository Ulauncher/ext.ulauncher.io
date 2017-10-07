import * as types from './auth0ActionTypes'
import authService from './AuthService'

const initState = {
  isFetching: false,
  session: authService.getSession(),
  error: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case `${types.SET_SESSION}_PENDING`:
      return {
        ...state,
        isFetching: true,
        error: null
      }
    case `${types.SET_SESSION}_FULFILLED`:
    case `${types.RENEW_SESSION}_FULFILLED`:
      return {
        ...state,
        session: action.payload,
        isFetching: false,
        error: null
      }
    case `${types.SET_SESSION}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }

    case types.LOGOUT:
      return {
        ...state,
        session: null
      }

    default:
      return state
  }
}
