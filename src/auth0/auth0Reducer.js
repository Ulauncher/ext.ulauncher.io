import * as types from './auth0ActionTypes'
import authService from './AuthService'

const initState = {
  isFetching: false,
  session: authService.getSession(),
  error: null
}

export default (state = initState, action) => {
  switch (action.type) {
    case `${types.AUTH0_SET_SESSION}_PENDING`:
      return {
        ...state,
        isFetching: true,
        error: null
      }
    case `${types.AUTH0_SET_SESSION}_FULFILLED`:
      return {
        ...state,
        session: action.payload,
        isFetching: false,
        error: null
      }
    case `${types.AUTH0_SET_SESSION}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }

    case types.AUTH0_LOGOUT:
      return {
        ...state,
        session: null
      }

    default:
      return state
  }
}
