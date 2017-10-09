import { SubmissionError } from 'redux-form'
import { editExtension } from '../api'

export default async function submitEditForm(id, payload) {
  try {
    return await editExtension(id, payload)
  } catch (e) {
    let error = 'Connection error'
    if (e.status === 500) {
      error = 'Internal server error occurred. Please try again.'
    } else if (e.description) {
      error = e.description
    }
    throw new SubmissionError({ _error: error })
  }
}
