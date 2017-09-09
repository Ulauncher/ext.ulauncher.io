import * as ActionTypes from '../actions/newExtension';

export default function reducer(state = {
  isFetching: false,
  step: 1,
  formData: {},
  files: [],
  errors: {}
}, action) {

  switch (action.type) {

    case ActionTypes.CHECK_PROJECT_URL_START:
      return {
        ...state,
        isFetching: true,
        errors: {}
      };

    case ActionTypes.CHECK_PROJECT_URL_SUCCESS:

      return {
        ...state,
        isFetching: false,
        step: 2,
        formData: {
          project_url: action.payload.project_url,
          name: action.payload.info.Name,
          description: action.payload.info.Description,
          developer: action.payload.info.DeveloperName
        },
        errors: {}
      };

    case ActionTypes.CHECK_PROJECT_URL_ERROR:

      return {
        ...state,
        isFetching: false,
        errors: action.payload
      };

    case ActionTypes.BACK_TO_CHECK_PROJECT_URL:

      return {
        ...state,
        step: 1,
        errors: {}
      };

      break;

    case ActionTypes.UPLOAD_IMAGES_SUCCESS:

      console.log(action.payload);

      const f = state.files;
      if (action.payload.files) {

        action.payload.files.forEach(i => f.push({
          file: i
        }));

      }
      return {
        ...state,
        files : f,
        errors: {}
      };

    default:
      return state;
  }
}