import * as api from '../api'

export const MY_FETCH = 'MY_FETCH'

export function fetchMyItems() {
  return {
    type: MY_FETCH,
    payload: api.fetchMyItems()
  }
}
