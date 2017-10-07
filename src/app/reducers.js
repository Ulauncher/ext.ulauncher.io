import { combineReducers } from 'redux'

import auth0 from '../auth0/auth0Reducer'
import addExtension from '../addExtension/AddExtensionReducer'
import browse from '../browse/browseReducer'
import my from '../my/myReducer'
import details from '../details/DetailsReducer'

export default combineReducers({
  auth0,
  addExtension,
  browse,
  my,
  details
})
