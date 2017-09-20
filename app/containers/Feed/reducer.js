import { fromJS } from 'immutable';
import {
  FETCH_FEEDS,
  IS_FETCHING_FEEDS,
  POST_FEEDS,
  IS_POST_FEEDS
} from './constants';

const initialState = fromJS({
  feeds: [],
  postFeed: {},
  isFetching: false,
  isPosting: false
});

function feedReducer(state = initialState, action) {

  switch(action.type) {

    case IS_FETCHING_FEEDS:
      return state.set('isFetching', action.status);

    case FETCH_FEEDS:
      return state.set('feeds', fromJS(action.payloads));

    case IS_POST_FEEDS:
      return state.set('isPosting', action.status);

    case POST_FEEDS:
      return state.set('postFeed', fromJS(action.payloads));

    default:
      return state;

  }

}

export default feedReducer;
