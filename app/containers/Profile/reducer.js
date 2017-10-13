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
  UPDATE_IS_DISABLED,
  UPDATE_REFERAL_CODE,
  UPDATE_IS_CODE_CONFIRMED,
  UPDATE_HAVE_REFERED
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
    profilePic: 'https://museum.wales/media/40374/thumb_480/empty-profile-grey.jpg',
    points: ''
  },
  codeReferal: '',
  haveRefered: 0,
  avatar: 'https://museum.wales/media/40374/thumb_480/empty-profile-grey.jpg',
  isAvatarUpdated: false,
  isDisabled: true,
  isProfileUpdated: false,
  isLoading: false,
  isLogOut: false,
  isCodeConfirmed: false
});

function profileReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SINGLE_FIELD:
      return state.setIn([ 'fields', action.field ], action.value);
    case UPDATE_REFERAL_CODE:
      return state.set('codeReferal', action.value);
    case UPDATE_IS_CODE_CONFIRMED:
      return state.set('isCodeConfirmed', action.status)
    case UPDATE_HAVE_REFERED:
      return state.set('haveRefered', action.value)
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
