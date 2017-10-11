import { CHECK_URL, STEP_BACK, SUBMIT } from './AddExtensionActionTypes'

const initState = {
  isFetching: false,
  step: 0,
  formData: {},
  errors: {},
  error: null
}

export default function reducer(state = initState, action) {
  const { description: error, errors } = action.payload || {}
  switch (action.type) {
    case STEP_BACK:
      return {
        ...state,
        step: state.step - 1,
        errors: {}
      }

    case `${SUBMIT}_PENDING`:
    case `${CHECK_URL}_PENDING`:
      return {
        ...state,
        error: null,
        isFetching: true
      }

    case `${CHECK_URL}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        errors: { GithubUrl: error || 'Connection error!' }
      }

    case `${CHECK_URL}_FULFILLED`:
      const { data } = action.payload
      return {
        ...state,
        formData: {
          GithubUrl: data.GithubUrl,
          Name: data.Name,
          Description: data.Description,
          DeveloperName: data.DeveloperName
        },
        step: state.step + 1,
        isFetching: false
      }

    case `${SUBMIT}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        errors: errors || {},
        error: error || 'Connection error!'
      }

    case `${SUBMIT}_FULFILLED`:
      return {
        ...initState
      }

    default:
      return state
  }
}
