import Auth0Lock from 'auth0-lock'
import jwtDecode from 'jwt-decode'

const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN
const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
  auth: {
    autoParseHash: true,
    redirectUrl: `${window.location.origin}/auth0-callback`,
    responseType: 'token',
    params: { scope: 'openid email user_metadata picture' }
  }
})
const localStorageKey = 'auth0Session'

export class AuthService {
  constructor(lock) {
    this.lock = lock
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  login() {
    this.lock.show()
  }

  logout() {
    localStorage.removeItem(localStorageKey)
    localStorage.removeItem('profile')
  }

  getSession() {
    const sessionJson = localStorage.getItem(localStorageKey)
    return sessionJson ? JSON.parse(sessionJson) : null
  }

  getTokenExpirationDate() {
    const token = this.getToken()
    const decoded = jwtDecode(token)
    if (!decoded.exp) {
      return null
    }

    const date = new Date(0)
    date.setUTCSeconds(decoded.exp)
    return date
  }

  isTokenExpired() {
    const token = this.getToken()
    if (!token) {
      return true
    }
    const date = this.getTokenExpirationDate(token)
    const offsetSeconds = 0
    if (!date) {
      return false
    }
    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000)
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
    let session = {
      user: {
        email: authResult.idTokenPayload.email,
        emailVerified: authResult.idTokenPayload.email_verified
      },
      accessToken: authResult.accessToken,
      idToken: authResult.idToken,
      expiresAt: expiresAt
    }
    localStorage.setItem(localStorageKey, JSON.stringify(session))
  }

  getToken() {
    return (this.getSession() || {}).idToken
  }

  parseHash(hash) {
    return new Promise((resolve, reject) => {
      this.lock.resumeAuth(hash, (err, authResult) => {
        if (err) {
          return reject(err)
        }

        this.setSession(authResult)
        resolve()
      })
    })
  }
}

export default new AuthService(lock)
