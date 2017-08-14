import { AsyncStorage } from 'react-native';
import OAuthManager from 'react-native-oauth';

import {
  DevSummitAxios
} from '../../helpers';

/*
 * import constants
 */

import {
  UPDATE_SINGLE_FIELD,
  UPDATE_IS_LOGGED_IN
} from './constants';


/*
 * Update the input fields
 * @param {field: name of the field}
 * @param {value: value to be set}
 */
export function updateFields(field, value) {
  return {
    type: UPDATE_SINGLE_FIELD,
    field,
    value
  };
}

/*
 * Log user in
 * save access_token & refresh_token to asyncstorage
 */
export function login() {
  return (dispatch, getState) => {
    const { fields } = getState().get('main').toJS();

    const { username, password } = fields;
    DevSummitAxios.post('/auth/login', {
      username,
      password
    }).then((response) => {
      if (response && response.data && response.data.meta.success) {
        try {
          AsyncStorage.setItem('access_token', responseJson.result.access_token);
          AsyncStorage.setItem('refresh_token', responseJson.result.refresh_token);
        } catch (error) {
          console.log(error, 'error caught');
        }
        dispatch({
          type: UPDATE_IS_LOGGED_IN,
          status: true
        });
      }
    });
  };
}

export function loginGoogle() {
  return (dispatch) => {
    const manager = new OAuthManager('devsummit')
      manager.configure({
        google: {
          callback_url: 'http://localhost/google',
          client_id: '1091376735288-sgpfaq0suha3qakagrsig7bee58enkqr.apps.googleusercontent.com',
          client_secret: 'ZdbNXvmMTy9dcAK8oW-3QPOj'
        }
      });
      manager.authorize('google', {scopes: 'profile'})
      .then(resp => {
        console.log(resp)
        if (resp.authorized) {
          dispatch({
            type: UPDATE_IS_LOGGED_IN,
            status: true
          });
        }
      }).catch(err => console.log(err));
  }
}
