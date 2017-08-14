import { fromJS } from 'immutable';
/*
 * import contants
 */

import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD,
  UPDATE_REGISTER_METHOD,
  UPDATE_REGISTER_STATUS
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  inputFields: {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    role: ''
  },
  errorFields: {
    error_first_name: false,
    error_last_name: false,
    error_username: false,
    error_email: false,
    error_password: false,
    error_phone: false
  },
  registerMethod: 'undefined',
  isRegistering: false,
  isRegistered: false
});

function registerEmailReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SINGLE_INPUT_FIELD:
      return state.setIn([ 'inputFields', action.field ], action.value);

    case UPDATE_SINGLE_ERROR_FIELD:
      return state.setIn([ 'errorFields', action.field ], action.value);

    case UPDATE_REGISTER_METHOD:
      return state.set('registerMethod', action.payload);

    case UPDATE_REGISTER_STATUS:
      return state.set('isRegistered', action.status);

    default:
      return state;
  }
}

/*
 * export the reducer
 */

export default registerEmailReducer;
