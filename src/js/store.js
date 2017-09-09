import { applyMiddleware, createStore } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import sequenceAction from 'redux-sequence-action';

import reducer from "./reducers"

const middleware = applyMiddleware(promise(), thunk, logger(), sequenceAction)

export default createStore(reducer, middleware)