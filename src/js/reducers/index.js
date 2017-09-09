import { combineReducers } from "redux"

import auth from "./auth"
import newExtension from "./newExtension"
import extensionInfo from "./extensionInfo"
import extensions from "./extensions"

export default combineReducers({
  auth,
  newExtension,
  extensions,
  extensionInfo
})