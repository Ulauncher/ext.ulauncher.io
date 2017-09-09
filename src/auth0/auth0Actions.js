import * as types from './auth0ActionTypes'
import authService from './AuthService'

export const handleAuthentication = (hash, history) => {
  const sessionPromise = authService.parseHash(hash).then(() => {
    history.replace(sessionStorage.getItem('redirectAfterLogIn') || '/')
    sessionStorage.removeItem('redirectAfterLogIn')
    return authService.getSession()
  })
  return {
    type: types.AUTH0_SET_SESSION,
    payload: sessionPromise
  }
}

export const login = history => {
  sessionStorage.setItem('redirectAfterLogIn', history.location.pathname)
  authService.login()

  return {
    type: types.AUTH0_LOGIN
  }
}

export const logout = history => {
  authService.logout()
  setTimeout(() => {
    history.push('/')
  }, 0)

  return {
    type: types.AUTH0_LOGOUT
  }
}
