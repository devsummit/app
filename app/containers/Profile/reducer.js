/*
 * import contants
 */

import { fromJS } from 'immutable';

import {
  UPDATE_SINGLE_FIELD
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  fields: {
    username: '',
    password: '',
    profilePic: ''
  }
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SINGLE_FIELD:
      return state.setIn([ 'fields', action.field ], action.value);
    default:
      return state;
  }
}

/*
 * export the reducer
 */

export default profileReducer;
