import { uploadImages as uploadImagesRequest } from '../api'

const initState = {
  uploading: false,
  images: null,
  uploadError: null
}

const types = {
  UPLOAD_REQUEST: `EXT/SCREENSHOTS/UPLOAD_REQUEST`,
  SET_STATE: `EXT/SCREENSHOTS/SET_STATE`,
  RESET_STATE: `EXT/SCREENSHOTS/RESET_STATE`,
  REMOVE_IMAGE: `EXT/SCREENSHOTS/REMOVE_IMAGE`,
  SWAP_LEFT: `EXT/SCREENSHOTS/SWAP_LEFT`,
  SWAP_RIGHT: `EXT/SCREENSHOTS/SWAP_RIGHT`
}

const swapArrayElements = function(arr, indexA, indexB) {
  const newArr = [...arr]
  const temp = newArr[indexA]
  newArr[indexA] = newArr[indexB]
  newArr[indexB] = temp

  return newArr
}

const actions = {
  uploadImages(files) {
    const formData = new FormData()
    files.forEach((f, i) => formData.append('file_' + i, f))

    return {
      type: types.UPLOAD_REQUEST,
      payload: uploadImagesRequest(formData)
    }
  },

  removeImage(index) {
    return {
      type: types.REMOVE_IMAGE,
      index
    }
  },

  setState(updates) {
    return {
      type: types.SET_STATE,
      updates
    }
  },

  resetState() {
    return {
      type: types.RESET_STATE
    }
  },

  swapLeft(index) {
    return {
      type: types.SWAP_LEFT,
      index
    }
  },

  swapRight(index) {
    return {
      type: types.SWAP_RIGHT,
      index
    }
  }
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case `${types.UPLOAD_REQUEST}_PENDING`:
      return {
        ...state,
        uploading: true
      }

    case `${types.UPLOAD_REQUEST}_REJECTED`:
      const { description } = action.images
      return {
        ...state,
        uploading: false,
        uploadError: description || 'Connection error'
      }

    case `${types.UPLOAD_REQUEST}_FULFILLED`:
      return {
        ...state,
        uploading: false,
        uploadError: null,
        images: (state.images || []).concat(action.payload.data)
      }

    case types.REMOVE_IMAGE:
      return {
        ...initState,
        images: state.images.filter((url, index) => action.index !== index)
      }

    case types.SET_STATE:
      return {
        ...initState,
        ...action.updates
      }

    case types.SWAP_LEFT:
      return {
        ...state,
        images: swapArrayElements(state.images, action.index, action.index - 1)
      }

    case types.SWAP_RIGHT:
      return {
        ...state,
        images: swapArrayElements(state.images, action.index, action.index + 1)
      }

    case types.RESET_STATE:
      return { ...initState }

    default:
      return state
  }
}

export { types, actions, reducer }
