import { AsyncStorage } from 'react-native';
import OAuthManager from 'react-native-oauth';
import { twitter } from 'react-native-simple-auth';

import {
  DevSummitAxios
} from '../../helpers';

/*
 * import constants
 */

import {
  UPDATE_SINGLE_FIELD,
  UPDATE_IS_LOGGED_IN,
  FETCH_PROFILE_DATA,
  FB_CLIENT_ID,
  FB_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  TWITTER_CALLBACK,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_KEY_SECRET
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

export function updateIsLogIn(status) {
  return {
    type: UPDATE_IS_LOGGED_IN,
    status
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
        dispatch(updateIsLogIn(true));
        dispatch({
          type: FETCH_PROFILE_DATA,
          payload: response.data.included
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
        callback_url: GOOGLE_CALLBACK_URL,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET
      }
    });
    manager.authorize('google', {scopes: 'email'})
      .then((resp) => {
        if (resp.authorized) {
          DevSummitAxios.post('/auth/login',{
            provider: resp.provider,
            token: resp.response.credentials.idToken
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {
            if (response && response.data && response.data.meta.success) {
              try {
                AsyncStorage.setItem('access_token', response.data.data.access_token);
                AsyncStorage.setItem('refresh_token', response.data.data.refresh_token);
              } catch (error) {
                console.log(error, 'error caught');
              }
              dispatch(updateIsLogIn(true));
              dispatch({
                type: FETCH_PROFILE_DATA,
                payload: response.data.included
              });
            }
          }).catch(err => console.log(err));
        }
      }).catch(err => console.log(err));
  }
}

export function loginFacebook() {
  return (dispatch) => {
    const manager = new OAuthManager('devsummit')
    manager.configure({
      facebook: {
        client_id: FB_CLIENT_ID,
        client_secret: FB_CLIENT_SECRET
      }
    });
    manager.authorize('facebook', { scopes: 'public_profile' })
      .then((resp) => {
        const data = {
          provider: 'facebook',
          token: resp.response.credentials.accessToken
        };
        const headers = { 'Content-Type': 'application/json' };
        DevSummitAxios.post('/auth/login', data, { headers })
          .then((response) => {
            if (response && response.data && response.data.meta.success) {
              try {
                AsyncStorage.setItem('access_token', response.data.data.access_token);
                AsyncStorage.setItem('refresh_token', response.data.data.refresh_token);
              } catch (error) {
                console.log(error, 'error caught');
              }
              dispatch(updateIsLogIn(true));
              dispatch({
                type: FETCH_PROFILE_DATA,
                payload: response.data.included
              });
            }
          })
          .catch((err) => { console.log(err); });
      }).catch((err) => { console.log('error login fb', err); });
  };
}

export function loginTwitter() {
  return (dispatch) => {
    twitter({
      appId: TWITTER_CONSUMER_KEY,
      appSecret: TWITTER_CONSUMER_KEY_SECRET,
      callback: TWITTER_CALLBACK
    }).then((info) => {
      const data = {
        provider: 'twitter',
        token: info.credentials.oauth_token,
        token_secret: info.credentials.oauth_token_secret
      };
      const headers = { 'Content-Type': 'application/json' };
      DevSummitAxios.post('/auth/login', data, { headers })
        .then((response) => {
          if (response && response.data && response.data.meta.success) {
            try {
              AsyncStorage.setItem('access_token', response.data.data.access_token);
              AsyncStorage.setItem('refresh_token', response.data.data.refresh_token);
            } catch (error) {
              console.log(error, 'error caught');
            }
            dispatch(updateIsLogIn(true));
            dispatch({
              type: FETCH_PROFILE_DATA,
              payload: response.data.included
            });
          }
        })
        .catch((err) => { console.log(err); });
    }).catch((error) => {
      console.log(error)
    });
  };
}

export function getAccessToken() {
  return (dispatch) => {
    AsyncStorage.getItem('access_token', (err, result) => {
      if (result) {
        dispatch(updateIsLogIn(true));
      }
    })
  }
}
