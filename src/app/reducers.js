import { combineReducers } from 'redux'

import auth0 from '../auth0/auth0Reducer'
import add from '../extAdd/AddExtensionReducer'
import browse from '../extBrowse/browseReducer'
import my from '../extMy/myReducer'
import details from '../extDetails/DetailsReducer'

export default combineReducers({
  auth0,
  ext: combineReducers({
    add,
    browse,
    my,
    details
  })
})
