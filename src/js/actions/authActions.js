import {browserHistory} from 'react-router';
import AuthService from '../utils/AuthService';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const loginSuccess = (profile) => {

  browserHistory.push('/');

  return {
    type: LOGIN_SUCCESS,
    profile
  }

};

export const loginError = (err) => {

  browserHistory.push('/');

  return {
    type: LOGIN_ERROR,
    err
  }

};

export const login = () => {

  const lock = AuthService.getLock();
  lock.show();

  return {
    type: LOGIN_REQUEST
  }
};

export function logout() {

  AuthService.logout();

  return {
    type: LOGOUT_SUCCESS
  }
}