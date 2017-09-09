import * as api from '../api'

export const DETAILS_FETCH = 'DETAILS_FETCH'

export function fetchItem(id) {
  return {
    type: DETAILS_FETCH,
    payload: api.fetchItem(id)
  }
}
