/*
 * import contants
 */

import { fromJS } from 'immutable';

import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD,
  UPDATE_IS_PASSWORD_UPDATED,
  UPDATE_IS_LOADING,
  UPDATE_IS_PASSWORD_WRONG,
  RESET_STATE
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  inputFields: {
    current_password: '',
    new_password: '',
    confirm_password: ''
  },
  errorFields: {
    error_current_password: false,
    error_new_password: false,
    error_confirm_password: false,
    error_password_not_the_same: false
  },
  isLoading: false,
  isPasswordUpdated: false,
  isPasswordWrong: false
});

function changePasswordReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SINGLE_INPUT_FIELD:
      return state.setIn(['inputFields', action.field], action.value);

    case UPDATE_SINGLE_ERROR_FIELD:
      return state.setIn(['errorFields', action.field], action.value);

    case UPDATE_IS_PASSWORD_UPDATED:
      return state.set('isPasswordUpdated', action.status);

    case UPDATE_IS_LOADING:
      return state.set('isLoading', action.status);

    case UPDATE_IS_PASSWORD_WRONG:
      return state.set('isPasswordWrong', action.status);

    case RESET_STATE:
      return initialState;

    default:
      return state;
  }
}

/*
 * export the reducer
 */

export default changePasswordReducer;
