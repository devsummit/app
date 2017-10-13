/*
 * import contants
 */

import { fromJS } from 'immutable';

import {
  UPDATE_SINGLE_FIELD,
  UPDATE_IS_PROFILE_UPDATED,
  UPDATE_AVATAR,
  UPDATE_IS_AVATAR_UPDATED,
  IS_LOADING_LOGOUT,
  UPDATE_IS_LOG_OUT,
  UPDATE_IS_DISABLED
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  fields: {
    username: '',
    firstName: '',
    lastName: '',
    boothInfo: '',
    job: '',
    summary: '',
    profilePic: 'https://museum.wales/media/40374/thumb_480/empty-profile-grey.jpg'
  },
  avatar: 'https://museum.wales/media/40374/thumb_480/empty-profile-grey.jpg',
  isAvatarUpdated: false,
  isDisabled: true,
  isProfileUpdated: false,
  isLoading: false,
  isLogOut: false
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SINGLE_FIELD:
      return state.setIn([ 'fields', action.field ], action.value);
    case UPDATE_IS_PROFILE_UPDATED:
      return state.set('isProfileUpdated', action.status);
    case UPDATE_AVATAR:
      return state.set('avatar', action.value);
    case UPDATE_IS_AVATAR_UPDATED:
      return state.set('isAvatarUpdated', action.status);
    case IS_LOADING_LOGOUT:
      return state.set('isLoading', action.status);
    case UPDATE_IS_LOG_OUT:
      return state.set('isLogOut', action.status);
    case UPDATE_IS_DISABLED:
      return state.set('isDisabled', action.status);
    default:
      return state;
  }
}

/*
 * export the reducer
 */

export default profileReducer;
