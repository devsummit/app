import { fromJS } from 'immutable';
import {
  FETCH_FEEDS,
  SET_LINKS,
  IS_FETCHING_FEEDS,
  IS_FETCHING_MORE_FEEDS,
  UPDATE_FEEDS,
  UPDATE_CURRENT_PAGE,
  LOAD_MORE_FEEDS,
  REMOVE_FEED,
  IS_REMOVE_FEED,
  RESTORE_CURRENT_PAGE
} from './constants';

const initialState = fromJS({
  feeds: [],
  links: {},
  isFetching: false,
  isFetchingMore: false,
  isRemoving: false,
  currentPage: 1
});

function feedReducer(state = initialState, action) {
  switch (action.type) {
    case IS_FETCHING_FEEDS:
      return state.set('isFetching', action.status);

    case IS_FETCHING_MORE_FEEDS:
      return state.set('isFetchingMore', action.status);

    case FETCH_FEEDS:
      return state.set('feeds', fromJS(action.payloads));

    case SET_LINKS:
      return state.set('links', fromJS(action.links));

    case UPDATE_FEEDS:
      return state.set('feeds', fromJS([ action.payloads, ...state.get('feeds').toJS() ]));

    case LOAD_MORE_FEEDS:
      return state.set(
        'feeds',
        fromJS(
          state
            .get('feeds')
            .toJS()
            .concat(action.payloads)
        )
      );

    case UPDATE_CURRENT_PAGE:
      return state.set('currentPage', action.value);

    case REMOVE_FEED:
      return state.set(
        'feeds',
        fromJS([
          ...state
            .get('feeds')
            .toJS()
            .filter(item => item.id !== action.id)
        ])
      );

    case IS_REMOVE_FEED:
      return state.set('isRemoving', action.status);

    case RESTORE_CURRENT_PAGE:
      return state.set('currentPage', 1);

    default:
      return state;
  }
}

export default feedReducer;
