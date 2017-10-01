import auth0Client, { WebAuth } from 'auth0-js'

const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID
const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN
const auth0 = new WebAuth({
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
  redirectUri: `${window.location.origin}/auth0-callback`,
  audience: `https://${AUTH0_DOMAIN}/userinfo`,
  responseType: 'token id_token',
  scope: 'openid'
})
const localStorageKey = 'auth0Session'

export class AuthService {
  constructor(auth0) {
    this.auth0 = auth0
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult)
          resolve()
        } else {
          reject(err || 'accessToken or/and idToken are missing')
        }
      })
    })
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

  login() {
    this.auth0.authorize()
  }

  logout() {
    localStorage.removeItem(localStorageKey)
  }

  isAuthenticated() {
    const session = this.getSession()
    if (!session) {
      return false
    }
    // Check whether the current time is past the
    // access token's expiry time
    return Date.now() < session.expiresAt
  }

  getSession() {
    const sessionJson = localStorage.getItem(localStorageKey)
    return sessionJson ? JSON.parse(sessionJson) : null
  }

  getToken() {
    return (this.getSession() || {}).idToken
  }
}

export default new AuthService(auth0, auth0Client)
