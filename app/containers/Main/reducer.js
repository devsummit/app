/*
 * import contants
 */

import { fromJS } from 'immutable';

import {
  UPDATE_SINGLE_FIELD,
  UPDATE_IS_LOGGED_IN,
  UPDATE_IS_SUBSCRIBED,
  UPDATE_IS_NOT_REGISTERED,
  UPDATE_IS_FETCHING,
  FETCH_PROFILE_DATA
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  fields: {
    username: '',
    password: '',
    email: ''
  },
  isLoggedIn: false,
  isSubscribed: false,
  isFetching: false,
  profiledata: {}
});

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_IS_LOGGED_IN:
      return state.set('isLoggedIn', action.status);
    case UPDATE_IS_SUBSCRIBED:
      return state.set('isSubscribed', action.status);
    case UPDATE_IS_FETCHING:
      return state.set('isFetching', action.status);
    case UPDATE_SINGLE_FIELD:
      return state.setIn([ 'fields', action.field ], action.value);
    case FETCH_PROFILE_DATA:
      return state.set('profileData', action.payload);
    default:
      return state;
  }
}

/*
 * export the reducer
 */

export default mainReducer;
