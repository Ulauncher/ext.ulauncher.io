import axios from "axios";
import AuthService from '../utils/AuthService'

import {API_ENDPOINT} from '../config';

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

export function fetchItems () {
  return function (dispatch) {
    dispatch({ type: FETCH_REQUEST });

    if (!AuthService.getToken()) {
      return dispatch({ type: FETCH_ERROR, payload: err });
    }

    axios.defaults.headers.common['Authorization'] = 'Bearer '.concat(AuthService.getToken());

    axios.get(API_ENDPOINT + '/stg/extensions')
      .then((response) => {
        dispatch({ type: FETCH_SUCCESS, payload: response.data.data })
      })
      .catch((err) => {
        dispatch({ type: FETCH_ERROR, payload: err })
      })
  }
}