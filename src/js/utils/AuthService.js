import Auth0Lock from 'auth0-lock';
import jwtDecode from 'jwt-decode';

import {AUTH0_CLIENT_ID, AUTH0_DOMAIN} from "../config";

export default class AuthService {

  static getLock() {

    const lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
      auth: {
        redirectUrl: `${window.location.origin}/login`,
        responseType: 'token'
      }
    });
    return lock;
  }

  static logout() {

    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }

  static getProfile() {

    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  static loggedIn() {

    const token = AuthService.getToken();
    return !!token && !AuthService.isTokenExpired(token)
  }

  static getToken() {

    return localStorage.getItem('id_token');
  }

  static getTokenExpirationDate() {

    const token = AuthService.getToken();
    const decoded = jwtDecode(token);
    if (!decoded.exp) {
      return null
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date
  }

  static isTokenExpired() {

    const token = AuthService.getToken();
    if (!token) return true;
    const date = AuthService.getTokenExpirationDate(token);
    const offsetSeconds = 0;
    if (date === null) {
      return false
    }
    return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
  }

  static parseHash(hash, onSuccess, onError) {

    const lock = AuthService.getLock();
    lock.resumeAuth(hash, (err, authResult) => {

      if (err) {
        return onError(err);
      }

      lock.getProfile(authResult.idToken, (error, profile) => {

        if (error) {
          return onError(err);
        } else {

          localStorage.setItem('id_token', authResult.idToken);
          localStorage.setItem('profile', JSON.stringify(profile));

          return onSuccess(profile);
        }

      });

    });
  }
}