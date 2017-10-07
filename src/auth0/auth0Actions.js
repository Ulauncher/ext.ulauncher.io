import * as types from './auth0ActionTypes'
import authService from './AuthService'

export const handleAuthentication = history => {
  const sessionPromise = authService.handleAuthentication().then(() => {
    history.replace(sessionStorage.getItem('redirectAfterLogIn') || '/')
    sessionStorage.removeItem('redirectAfterLogIn')
    return authService.getSession()
  })

  return {
    type: types.SET_SESSION,
    payload: sessionPromise
  }
}

export const login = history => {
  sessionStorage.setItem('redirectAfterLogIn', history.location.pathname)
  authService.login()

  return {
    type: types.LOGIN
  }
}

export const logout = history => {
  authService.logout()
  setTimeout(() => {
    history.push('/')
  }, 0)

  return {
    type: types.LOGOUT
  }
}

let timer
export const renewAuth0Session = session => {
  if (!session) {
    return { type: types.RENEW_SESSION }
  }

  let expiresIn = session.expiresAt - Date.now() - 60e3
  if (expiresIn <= 0) {
    expiresIn = 0
  }

  if (timer) {
    return { type: types.RENEW_SESSION }
  }

  console.log(`Renew Auth0 session in ${expiresIn / 1000} sec`)

  return {
    type: types.RENEW_SESSION,
    payload: new Promise(resolve => {
      timer = setTimeout(async () => {
        await authService.renew()
        timer = null
        resolve(authService.getSession())
      }, expiresIn)
    })
  }
}
