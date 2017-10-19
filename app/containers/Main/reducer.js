/*
 * import contants
 */

import { fromJS } from 'immutable';

import {
  UPDATE_SINGLE_FIELD,
  UPDATE_IS_LOGGED_IN,
  UPDATE_IS_SUBSCRIBED,
  UPDATE_IS_NOT_REGISTERED,
  UPDATE_IS_LOADING,
  FETCH_PROFILE_DATA,
  UPDATE_IS_RESETED
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
  isLoading: false,
  isLoggedIn: false,
  isSubscribed: false,
  isReseted: false
});

function mainReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_IS_LOGGED_IN:
      return state.set('isLoggedIn', action.status);
    case UPDATE_IS_SUBSCRIBED:
      return state.set('isSubscribed', action.status);
    case UPDATE_SINGLE_FIELD:
      return state.setIn([ 'fields', action.field ], action.value);
    case UPDATE_IS_LOADING:
      return state.set('isLoading', action.status);
    case UPDATE_IS_RESETED:
      return state.set('isReseted', action.status);
    default:
      return state;
  }
}

/*
 * export the reducer
 */

export default mainReducer;
