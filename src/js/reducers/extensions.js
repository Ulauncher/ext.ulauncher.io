import * as ActionTypes from '../actions/extensions';

export default function reducer(state = {
  isFetching: false,
  items: [],
  error: null
}, action) {

  switch (action.type) {

    case ActionTypes.FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };

    case ActionTypes.FETCH_SUCCESS:

      let items = action.payload.map(item => {

        return {
          id: item.ID,
          img: '',
          title: item.Name,
          description: item.Description,
          author: item.DeveloperName
        }

      });

      return {
        ...state,
        isFetching: false,
        items: items
      };

    case ActionTypes.FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };

    default:
      return state
  }
}