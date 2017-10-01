import * as types from './auth0ActionTypes'
import authService from './AuthService'

export const handleAuthentication = history => {
  const sessionPromise = authService.handleAuthentication().then(() => {
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
