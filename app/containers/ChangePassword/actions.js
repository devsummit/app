import { AsyncStorage } from 'react-native';

import {
	DevSummitAxios
} from '../../helpers'

/*
 * import constants
 */

import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD,
  UPDATE_IS_PASSWORD_UPDATED,
  UPDATE_IS_PASSWORD_WRONG
} from './constants'


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
	}
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
	}
}

export function updateIsPasswordUpdate(status) {
  return {
    type: UPDATE_IS_PASSWORD_UPDATED,
    status
  };
}

export function updateIsPasswordWrong(status) {
  return {
    type: UPDATE_IS_PASSWORD_WRONG,
    status
  };
}

export function changePassword() {
  return (dispatch, getState) => {
    const { inputFields } = getState().get('changePassword').toJS();
    const { current_password, new_password, confirm_password } = inputFields;

    AsyncStorage.getItem('access_token', (err, result) => {
      DevSummitAxios.patch('/auth/me/changepassword', {
        old_password: current_password,
        new_password
      }, {
        headers: {
          Authorization: result
        }
      }).then((response) => {
        if (response && response.data && response.data.meta.success) {
          dispatch(updateIsPasswordUpdate(true));
        } else {
          dispatch(updateIsPasswordWrong(true));
        }
      });
    });
  }
}
