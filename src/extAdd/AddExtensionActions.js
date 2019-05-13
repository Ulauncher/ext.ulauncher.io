import * as api from '../api'
import { CHECK_URL, STEP_BACK, SUBMIT } from './AddExtensionActionTypes'

export function stepBack() {
  return { type: STEP_BACK }
}

export function submitExtension(data, history) {
  return {
    type: SUBMIT,
    payload: (async () => {
      let errors = {}
      if (!data.Name) {
        errors.Name = 'Name cannot be empty'
      }
      if (!data.Description) {
        errors.Description = 'Description cannot be empty'
      }

      if (Object.keys(errors).length) {
        const e = { errors }
        throw e
      }

      let resp = await api.submitExtension(data)
      history.push(`/-/${resp.data.ID}`)
    })()
  }
}

export function validateExtensionUrl(url) {
  return {
    type: CHECK_URL,
    payload: (async () => {
      let e
      if (!url) {
        e = { error: { description: 'Please enter URL' } }
        throw e
      } else if (!url.match(/^http(s)?:\/\/(www\.)?github\.com\/[A-z 0-9 _ -]+\/[A-z 0-9 _ -]+\/?$/i)) {
        e = { error: { description: 'Invalid Github URL' } }
        throw e
      }

      return api.checkProject(url)
    })()
  }
}
