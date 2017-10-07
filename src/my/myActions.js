import * as api from '../api'
import { FETCH_ITEMS, RESET_STATE } from './myActionTypes'

export function fetchMyItems() {
  return {
    type: FETCH_ITEMS,
    payload: api.fetchMyItems()
  }
}

export function resetState() {
  return { type: RESET_STATE }
}
