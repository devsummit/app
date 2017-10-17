import { AsyncStorage } from 'react-native';

import { DevSummitAxios } from '../../helpers';
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
/*
  * Register user
  */
export function register(callBack) {
  return (dispatch, getState) => {
    dispatch(toggleIsRegistering(true));
    const { inputFields } = getState()
      .get('registerEmail')
      .toJS();

    const { firstName, email, password, username } = inputFields || null;

    const { lastName, referer } = inputFields || '';

    // const role_id = role === 'attendee' ? 2 : role === 'booth' ? 3 : 5;
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      username,
      referer
    };

    if (firstName && email && password && username) {
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
              // await AsyncStorage.setItem('profile_email', JSON.stringify(response.data.data.email));
              callBack();
              // await dispatch(updateRegisterStatus(true, 'Success', 'You have been registered, please login to continue'));
            }
          } catch (err) {
            console.log(err, 'error cought');
          }

          // else if (response.data.data !== null && !response.data.meta.success) {
          //   await dispatch(updateRegisterStatus(true, 'Registered', 'You already registered'));
          // } else if (response.data.data === null && !response.data.meta.success) {
          //   await dispatch(updateRegisterStatus(true, 'Failed', response.data.meta.message.concat(' please login using your existing account')));
          // }
          dispatch(toggleIsRegistering(false));
        })
        .catch((error) => {
          console.log(error, 'error caught');
        });
    }
  };
}
