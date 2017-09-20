import { fromJS } from 'immutable';

/*
 * import contants
 */
import {
  SET_NOTIFICATION,
  IS_FETCHING_NOTIFICATION,
  RESET_STATE,
  ADD_NEXT_NOTIFICATION,
  SET_NEXT_URL
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  setNotification: [],
  isFetchingNotification: false,
  nextUrl: ''
});

function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATION:
      return state.set('setNotification', fromJS(action.payload));
    case IS_FETCHING_NOTIFICATION:
      return state.set('isFetchingNotification', action.status);
    case ADD_NEXT_NOTIFICATION:
      return state.set('setNotification', fromJS(state.get('setNotification').toJS().concat(action.payload)))
    case SET_NEXT_URL:
      return state.set('nextUrl', action.value);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

/*
 * export the reducer
 */
export default notificationReducer;

