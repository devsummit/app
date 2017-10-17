import { AsyncStorage } from 'react-native';
import { DevSummitAxios } from '../../helpers';

import { AsyncStorage } from 'react-native';

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

import { ROLES } from '../../constants';

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
export function register(callBack = () => {}) {
  return (dispatch, getState) => {
    dispatch(toggleIsRegistering(true));
    const { inputFields } = getState()
      .get('registerPhone')
      .toJS();
    const { firstName, email, password, userName, socialId, provider, token, referer } =
      inputFields || null;
    let { role } = inputFields || null;
    const { lastName } = inputFields || '';

    if (firstName && role && email && socialId && provider && userName && token) {
      role = Object.keys(ROLES).find(key => ROLES[key] === role);
      const data = {
        first_name: firstName,
        last_name: lastName,
        username: userName,
        email,
        password,
        role,
        social_id: socialId,
        provider,
        token,
        referer
      };
      DevSummitAxios.post('/auth/register', data)
        .then(async (response) => {
          const resData = response.data.data;
          const roleId = JSON.stringify(response.data.included.role_id);
          const profileData = JSON.stringify(response.data.included);
          try {
            if (response && response.data.data && response.data.meta.success) {
              AsyncStorage.multiSet([
                [ 'access_token', resData.access_token ],
                [ 'refresh_token', resData.refresh_token ],
                [ 'role_id', roleId ],
                [ 'profile_data', profileData ]
              ]);
              callBack();
<<<<<<< HEAD
            }
            if (response && response.data.data && response.data.meta.success) {
              dispatch(
                updateRegisterStatus(true, 'Success', 'You have been registered, please login.')
              );
            } else if (response.data.data !== null && !response.data.meta.success) {
              dispatch(updateRegisterStatus(true, 'Registered', 'You already registered'));
            } else if (response.data.data === null && !response.data.meta.success) {
              dispatch(updateRegisterStatus(true, 'Failed', response.data.meta.message[0]));
=======
              dispatch(updateRegisterStatus(true, 'Success', 'You have been registered'));
            } else if (response.data.data !== null && !response.data.meta.success) {
              dispatch(updateRegisterStatus(true, 'Registered', 'You already registered'));
            } else if (response.data.data === null && !response.data.meta.success) {
              dispatch(updateRegisterStatus(true, 'Failed', response.data.meta.message.concat(' please login using your existing account')));
>>>>>>> change flow after register
            }
          } catch (err) {
            console.log(err, 'error cought');
          }
          dispatch(toggleIsRegistering(false));
        })
        .catch((error) => {
          dispatch(toggleIsRegistering(false));
          console.log(error, 'error caught');
        });
    }
  };
}
