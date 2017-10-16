import { fromJS } from 'immutable';
/*
 * import contants
 */

import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD,
  UPDATE_REGISTER_METHOD,
  TOGGLE_IS_REGISTERING,
  UPDATE_REGISTER_STATUS,
  RESET_STATE,
  UPDATE_IS_LOGGED_IN
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  inputFields: {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    role: '',
    socialId: '',
    referer: '',
    verifyPassword: ''
  },
  errorFields: {
    errorFirstName: false,
    errorLastName: false,
    errorUserName: false,
    errorEmail: false,
    errorPassword: false,
    errorPhone: false,
    errorVerifyPassword: false
  },
  registerMethod: 'undefined',
  isRegistering: false,
  isLoggedIn: false,
  isRegistered: {
    status: false,
    title: '',
    message: ''
  }
});

function registerEmailReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SINGLE_INPUT_FIELD:
      return state.setIn([ 'inputFields', action.field ], action.value);

    case UPDATE_SINGLE_ERROR_FIELD:
      return state.setIn([ 'errorFields', action.field ], action.value);

    case UPDATE_REGISTER_METHOD:
      return state.set('registerMethod', action.payload);

    case TOGGLE_IS_REGISTERING:
      return state.set('isRegistering', action.status);

    case UPDATE_REGISTER_STATUS:
      return (state.setIn([ 'isRegistered', 'status' ], action.status)
        .setIn([ 'isRegistered', 'title' ], action.title)
        .setIn([ 'isRegistered', 'message' ], action.message));

    case UPDATE_IS_LOGGED_IN:
      return state.set('isLoggedIn', action.status);

    case RESET_STATE:
      return initialState;

    default:
      return state;
  }
}

/*
 * export the reducer
 */

export default registerEmailReducer;
