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


export function updateRegisterStatus(status, title, message) {
  return {
    type: UPDATE_REGISTER_STATUS,
    status,
    title,
    message
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
    dispatch(toggleIsRegistering(true));
    const { inputFields } = getState().get('registerEmail').toJS();

    const {
      first_name, role, email, password, username, referer
    } = inputFields || null;

    const { last_name } = inputFields || '';

    const role_id = role === 'attendee' ? 2 : role === 'booth' ? 3 : 5;

    if (first_name && role && email && password && username) {
      DevSummitAxios.post('/auth/register', {
        first_name, last_name, username, email, password, referer
      }).then(async (response) => {
        console.log('landing here response', response);
        if (response && response.data.data && response.data.meta.success) {
          await dispatch(updateRegisterStatus(true, 'Success', 'You have been registered'));
        } else if (response.data.data !== null && !response.data.meta.success) {
          await dispatch(updateRegisterStatus(true, 'Registered', 'You already registered'));
        } else if (response.data.data === null && !response.data.meta.success) {
          await dispatch(updateRegisterStatus(true, 'Failed', response.data.meta.message[0]));
        }
        dispatch(toggleIsRegistering(false));
      }).catch((error) => {
        console.log(error, 'error caught');
      });
    }
  };
}
