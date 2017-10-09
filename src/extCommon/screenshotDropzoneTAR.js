import { uploadImages as uploadImagesRequest } from '../api'

const initState = {
  uploading: false,
  images: null,
  error: null
}

const types = {
  UPLOAD_REQUEST: `EXT/SCREENSHOTS/UPLOAD_REQUEST`,
  SET_STATE: `EXT/SCREENSHOTS/SET_STATE`,
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
  uploadImages(extId, files) {
    return {
      type: types.UPLOAD_REQUEST,
      images: uploadImagesRequest(extId, files)
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
        error: description || 'Connection error'
      }

    case `${types.UPLOAD_REQUEST}_FULFILLED`:
      return {
        ...state,
        uploading: false,
        error: null,
        images: action.images
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

    default:
      return state
  }
}

export { types, actions, reducer }
