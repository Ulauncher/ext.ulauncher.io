import { combineReducers } from 'redux'
import makeTypesActionsReducer from '../api/makeTypesActionsReducer'
import { fetchItem, deleteItem } from '../api'

const { actions: getActions, reducer: item } = makeTypesActionsReducer('EXT/EDIT', fetchItem)
const { actions: deleteActions, reducer: del } = makeTypesActionsReducer('EXT/DELETE', deleteItem)

export const actions = {
  fetchItem: getActions.httpRequest,
  resetFetchState: getActions.resetState,
  deleteItem: deleteActions.httpRequest,
  resetDeleteState: deleteActions.resetState
}

export const reducer = combineReducers({
  item,
  del
})
