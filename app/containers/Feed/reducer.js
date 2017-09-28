import { fromJS } from 'immutable';
import {
  FETCH_FEEDS,
  IS_FETCHING_FEEDS,
  UPDATE_FEEDS,
  IS_POST_FEEDS,
  UPDATE_IMAGE,
  UPDATE_TEXT,
  CLEAR_TEXT_FIELD,
  CLEAR_IMAGE,
  UPDATE_CURRENT_PAGE,
  LOAD_MORE_FEEDS,
  REMOVE_POST,
  IS_REMOVE_POST
} from './constants';

const initialState = fromJS({
  feeds: [],
  image: {},
  message: '',
  isFetching: false,
  isPosting: false,
  isRemoving: false,
  currentPage: 1
});

function feedReducer(state = initialState, action) {

  switch (action.type) {

    case IS_FETCHING_FEEDS:
      return state.set('isFetching', action.status);

    case FETCH_FEEDS:
      return state.set('feeds', fromJS(action.payloads));

    case IS_POST_FEEDS:
      return state.set('isPosting', action.status);

    case UPDATE_FEEDS:
      return state.set('feeds', fromJS([ action.payloads, ...state.get('feeds').toJS() ]));

    case LOAD_MORE_FEEDS:
      return state.set('feeds', fromJS(state.get('feeds').toJS().concat(action.payloads)));

    case UPDATE_IMAGE:
      return state.set('image', fromJS(action.image));

    case UPDATE_TEXT:
      return state.set('message', action.value);

    case CLEAR_TEXT_FIELD:
      return state.set('message', '');

    case CLEAR_IMAGE:
      return state.set('image', fromJS({}));

    case UPDATE_CURRENT_PAGE:
      return state.set('currentPage', action.value);

    case REMOVE_POST:
      return state.set('feeds', fromJS([ ...state.get('feeds').toJS().filter(item => item.id !== action.id)]));

    case IS_REMOVE_POST:
      return state.set('isRemoving', action.status);

    default:
      return state;

  }

}

export default feedReducer;
