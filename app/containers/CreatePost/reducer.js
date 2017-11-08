import { fromJS } from 'immutable';
import {
  IS_POST_FEEDS,
  UPDATE_IMAGE,
  UPDATE_TEXT,
  CLEAR_TEXT_FIELD,
  CLEAR_IMAGE
} from './constants';

const initialState = fromJS({
  image: {},
  message: '',
  isPosting: false
});

function createPostReducer(state = initialState, action) {
  switch (action.type) {
    case IS_POST_FEEDS:
      return state.set('isPosting', action.status);

    case UPDATE_IMAGE:
      return state.set('image', fromJS(action.image));

    case UPDATE_TEXT:
      return state.set('message', action.value);

    case CLEAR_TEXT_FIELD:
      return state.set('message', '');

    case CLEAR_IMAGE:
      return state.set('image', fromJS({}));

    default:
      return state;
  }
}

export default createPostReducer;
