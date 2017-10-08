import { combineReducers } from 'redux'

import auth0 from '../auth0/auth0Reducer'
import add from '../extAdd/AddExtensionReducer'
import { reducer as browse } from '../extBrowse/Browse'
import { reducer as my } from '../extMy/My'
import { reducer as details } from '../extDetails/Details'

export default combineReducers({
  auth0,
  ext: combineReducers({
    add,
    browse,
    my,
    details
  })
})
