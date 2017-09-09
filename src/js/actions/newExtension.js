import axios from "axios";
import AuthService from '../utils/AuthService'

import {API_ENDPOINT} from '../config';

export const CHECK_PROJECT_URL_START = 'CHECK_PROJECT_URL_START';

export const CHECK_PROJECT_URL_SUCCESS = 'CHECK_PROJECT_URL_SUCCESS';

export const CHECK_PROJECT_URL_ERROR = 'CHECK_PROJECT_URL_ERROR';

export const BACK_TO_CHECK_PROJECT_URL = 'BACK_TO_CHECK_PROJECT_URL';

export const UPLOAD_IMAGES_START = 'UPLOAD_IMAGES_START';

export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';

export const UPLOAD_IMAGES_ERROR = 'UPLOAD_IMAGES_ERROR';

export function checkProjectUrl(data) {
  return function (dispatch) {

    dispatch({ type: CHECK_PROJECT_URL_START });

    if (!AuthService.getToken()) {
      return dispatch({ type: CHECK_PROJECT_URL_ERROR});
    }

    axios.defaults.headers.common['Authorization'] = 'Bearer '.concat(AuthService.getToken());

    axios.get(API_ENDPOINT + '/stg/check-manifest?url=' + data.project_url, {
      responseType: 'json'
    }).then((response) => {

        dispatch({ type: CHECK_PROJECT_URL_SUCCESS, payload:  {
          project_url: data.project_url,
          info: response.data.data
        }})
      })
      .catch((err) => {

        let errors = {};
        if (err.response.data.error.description) {
          errors.project_url = err.response.data.error.description;
        }

        dispatch({ type: CHECK_PROJECT_URL_ERROR, payload: errors})
      })
  }
}

export function checkProjectUrlErrors(errors){

  return function (dispatch) {

    dispatch({ type: CHECK_PROJECT_URL_ERROR, payload: errors })
  }

}

export function backToCheckProjectUrk(){

  return function (dispatch) {

    dispatch({ type: BACK_TO_CHECK_PROJECT_URL, payload: {} })
  }

}

export function uploadImages (files) {

  return function (dispatch) {

    dispatch({ type: UPLOAD_IMAGES_START });

    if (!AuthService.getToken()) {
      return dispatch({ type: CHECK_PROJECT_URL_ERROR });
    }

    axios.defaults.headers.common['Authorization'] = 'Bearer '.concat(AuthService.getToken());

    var data = new FormData();
    files.forEach((f, i) => data.append('file_' + i, f));

    axios.post(API_ENDPOINT + '/stg/upload-images', data)
      .then((response) => {

        dispatch({ type: UPLOAD_IMAGES_SUCCESS, payload:  {
          files: response.data.data
        }})

    })
      .catch((err) => {

        let errors = {};
        if (err.response.data.error.description) {
          errors.project_url = err.response.data.error.description;
        }

        dispatch({ type: UPLOAD_IMAGES_ERROR, payload: errors})
      });

  }
}