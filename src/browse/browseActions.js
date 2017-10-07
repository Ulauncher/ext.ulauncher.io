import * as api from '../api'
import { FETCH_ITEMS, RESET_STATE } from './browseActionTypes'

export function fetchBrowseItems() {
  return {
    type: FETCH_ITEMS,
    payload: api.fetchItems()
  }
}

export function resetState() {
  return { type: RESET_STATE }
}
