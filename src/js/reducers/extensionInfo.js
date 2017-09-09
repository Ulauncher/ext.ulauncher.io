import * as ActionTypes from '../actions/extensionInfo';

export default function reducer(state = {
  currentImage: 0,
  extensionInfo: {}
}, action) {

  switch (action.type) {
    case ActionTypes.SELECT_EXTENSION:

      return {
        currentImage: 0,
        extensionInfo: action.payload,
      };

    case ActionTypes.CHANGE_IMAGE:

      return {
        currentImage: action.payload,
        extensionInfo: state.extensionInfo,
      };

    default:
      return state;
  }
}