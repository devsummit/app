/*
 * import contants
 */

import { fromJS } from 'immutable';

import {
  UPDATE_SINGLE_FIELD,
  UPDATE_IS_PROFILE_UPDATED
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  fields: {
    username: '',
    firstName: '',
    lastName: '',
    profilePic: 'https://museum.wales/media/40374/thumb_480/empty-profile-grey.jpg'
  },
  isProfileUpdated: false
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SINGLE_FIELD:
      return state.setIn([ 'fields', action.field ], action.value);
    case UPDATE_IS_PROFILE_UPDATED:
      return state.set('isProfileUpdated', action.status);
    default:
      return state;
  }
}

/*
 * export the reducer
 */

export default profileReducer;
