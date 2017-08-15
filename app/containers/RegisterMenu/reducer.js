/*
 * import contants
 */

import { fromJS } from 'immutable';

import {
  UPDATE_IS_REGISTERED
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  isRegistered: false
});

function registerMenuReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_IS_REGISTERED:
      return state.set('isRegistered', action.status);
    default:
      return state;
  }
}

/*
 * export the reducer
 */

export default registerMenuReducer;
