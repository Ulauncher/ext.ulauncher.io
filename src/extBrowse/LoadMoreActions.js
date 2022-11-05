import * as api from '../api'
import { HTTP_REQUEST, RESET_STATE, UPDATE_STATE } from './LoadMoreActionTypes'

export function httpRequest(...args) {
  return {
    type: HTTP_REQUEST,
    payload: api.fetchItems(...args)
  }
}

export function resetState() {
  return { type: RESET_STATE }
}

export function onLoadMore(...args) {
  return {
    type: HTTP_REQUEST,
    loadMore: true,
    payload: api.fetchItems(...args)
  }
}
