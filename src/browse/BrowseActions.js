import * as api from '../api'

export const BROWSE_FETCH = 'BROWSE_FETCH'

export function fetchItems() {
  return {
    type: BROWSE_FETCH,
    payload: api.fetchItems()
  }
}
