import * as api from '../api'
import { ADD_EXT_CHECK_URL, ADD_EXT_STEP_BACK, ADD_EXT_UPLOAD_IMAGES, ADD_EXT_SUBMIT } from './AddExtensionActionTypes'

export function stepBack() {
  return { type: ADD_EXT_STEP_BACK }
}

export function uploadImages(files) {
  var formData = new FormData()
  files.forEach((f, i) => formData.append('file_' + i, f))

  return {
    type: ADD_EXT_UPLOAD_IMAGES,
    payload: api.uploadImages(formData)
  }
}

export function submitExtension(data, history) {
  return {
    type: ADD_EXT_SUBMIT,
    payload: new Promise((resolve, reject) => {
      let errors = {}
      if (!data.Name) {
        errors.Name = 'Name cannot be empty'
      }
      if (!data.Description) {
        errors.Description = 'Description cannot be empty'
      }

      if (!Object.keys(errors).length) {
        resolve()
      } else {
        reject({ errors })
      }
    }).then(() => api.submitExtension(data).then(({ data }) => history.push(`/-/${data.ID}`)))
  }
}

export function validateExtensionUrl(url) {
  return {
    type: ADD_EXT_CHECK_URL,
    payload: new Promise((resolve, reject) => {
      if (!url) {
        reject({ error: { description: 'Please enter URL' } })
      } else if (!url.match(/^http(s)?:\/\/(www\.)?github\.com\/[A-z 0-9 _ -]+\/[A-z 0-9 _ -]+\/?$/i)) {
        reject({ error: { description: 'Invalid Github URL' } })
      } else {
        resolve()
      }
    }).then(() => api.checkManifest(url))
  }
}
