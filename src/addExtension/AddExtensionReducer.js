import { ADD_EXT_STEP_BACK, ADD_EXT_CHECK_URL, ADD_EXT_UPLOAD_IMAGES, ADD_EXT_SUBMIT } from './AddExtensionActionTypes'

const initState = {
  isFetching: false,
  uploadingImages: false,
  step: 0,
  formData: {
    Images: []
  },
  errors: {},
  error: null
}

export default function reducer(state = initState, action) {
  const { description: error, errors } = action.payload || {}
  switch (action.type) {
    case ADD_EXT_STEP_BACK:
      return {
        ...state,
        step: state.step - 1,
        errors: {}
      }

    case `${ADD_EXT_SUBMIT}_PENDING`:
    case `${ADD_EXT_CHECK_URL}_PENDING`:
      return {
        ...state,
        error: null,
        isFetching: true
      }

    case `${ADD_EXT_CHECK_URL}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        errors: { GithubUrl: error || 'Connection error!' }
      }

    case `${ADD_EXT_CHECK_URL}_FULFILLED`:
      const { data } = action.payload
      return {
        ...state,
        formData: {
          GithubUrl: data.GithubUrl,
          Name: data.Name,
          Description: data.Description,
          DeveloperName: data.DeveloperName,
          Images: data.Images || []
        },
        step: state.step + 1,
        isFetching: false
      }

    case `${ADD_EXT_UPLOAD_IMAGES}_PENDING`:
      return {
        ...state,
        uploadingImages: true
      }

    case `${ADD_EXT_UPLOAD_IMAGES}_REJECTED`:
      return {
        ...state,
        uploadingImages: false,
        errors: { Images: action.payload.error.description }
      }

    case `${ADD_EXT_UPLOAD_IMAGES}_FULFILLED`:
      return {
        ...state,
        formData: {
          ...state.formData,
          Images: [...state.formData, ...action.payload.data]
        },
        uploadingImages: false
      }

    case `${ADD_EXT_SUBMIT}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        errors: errors || {},
        error: error || 'Connection error!'
      }

    case `${ADD_EXT_SUBMIT}_FULFILLED`:
      return {
        ...initState
      }

    default:
      return state
  }
}
