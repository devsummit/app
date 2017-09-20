import { fromJS } from 'immutable';
/*
 * import contants
 */

import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD,
  UPDATE_REGISTER_METHOD,
  UPDATE_REGISTER_STATUS,
  TOGGLE_IS_REGISTERING,
  RESET_STATE
} from './constants';


/*
 * initial state of reducers
 */
const initialState = fromJS({
  inputFields: {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    role: '',
    socialId: '',
    referer: ''
  },
  errorFields: {
    errorFirstName: false,
    errorLastName: false,
    errorUserName: false,
    errorEmail: false,
    errorPassword: false,
    errorPhone: false

  },
  registerMethod: 'undefined',
  isRegistering: false,
  isRegistered: {
    status: false,
    title: '',
    message: ''
  }
});

function registerPhoneReducer(state = initialState, action) {
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

    case RESET_STATE:
      return initialState;

    default:
      return state;
  }
}

/*
 * export the reducer
 */

export default registerPhoneReducer;
