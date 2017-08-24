import {
  DevSummitAxios
} from '../../helpers';

/*
 * import constants
 */

import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD,
  UPDATE_REGISTER_METHOD,
  TOGGLE_IS_REGISTERING,
  UPDATE_REGISTER_STATUS,
  RESET_STATE
} from './constants';


/*
 * Update the input fields
 * @param {field: name of the field}
 * @param {value: value to be set}
 */
export function updateInputFields(field, value) {
  return {
    type: UPDATE_SINGLE_INPUT_FIELD,
    field,
    value
  };
}


/*
 * Update register method
 * @param {value: value to be set}
 */
export function updateRegisterMethod(payload) {
  return {
    type: UPDATE_REGISTER_METHOD,
    payload
  };
}


/*
 * Update the error of input fields
 * @param {field: name of the field}
 * @param {value: value to be set}
 */
export function updateErrorFields(field, value) {
  return {
    type: UPDATE_SINGLE_ERROR_FIELD,
    field,
    value
  };
}


/*
 * update the is registering status
 * @param {value: value to be set (boolean)}
 */
export function toggleIsRegistering(status) {
  return {
    type: TOGGLE_IS_REGISTERING,
    status
  };
}


export function updateRegisterStatus(status) {
  return {
    type: UPDATE_REGISTER_STATUS,
    status
  };
}

export function resetState() {
  return {
    type: RESET_STATE
  };
}

/*
 * Register user
 */
export function register() {
  return (dispatch, getState) => {
    const { inputFields } = getState().get('registerEmail').toJS();

    const {
      first_name, role, email, password, username, social_id
    } = inputFields || null;

    const { last_name } = inputFields || '';

    const role_id = role === 'attendee' ? 1 : role === 'booth' ? 2 : 3;

    if (first_name && role && email && password && username) {
      DevSummitAxios.post('/auth/register', {
        first_name, last_name, username, email, password, role: role_id, social_id
      }).then((response) => {
        if (response && response.data && response.data.meta.success) {
          // do something
          dispatch(updateRegisterStatus(true));
        }
      }).catch((error) => {
        console.log(error, 'error caught');
      });
    }
  };
}
