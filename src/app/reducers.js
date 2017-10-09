import { combineReducers } from 'redux'

import auth0 from '../auth0/auth0Reducer'
import add from '../extAdd/AddExtensionReducer'
import { LOGOUT } from '../auth0/auth0ActionTypes'
import { reducer as formReducer } from 'redux-form'
import { reducer as browse } from '../extBrowse/Browse'
import { reducer as my } from '../extMy/My'
import { reducer as details } from '../extDetails/Details'
import { reducer as edit } from '../extEdit/EditExtension'
import { reducer as screenshots } from '../extCommon/screenshotDropzoneTAR'

const appReducer = combineReducers({
  auth0,
  ext: combineReducers({
    add,
    browse,
    my,
    details,
    edit,
    screenshots
  }),
  form: formReducer
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
