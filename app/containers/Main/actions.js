import { AsyncStorage } from 'react-native';
import OAuthManager from 'react-native-oauth';
import { twitter } from 'react-native-simple-auth';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import {
  DevSummitAxios
} from '../../helpers';

/*
 * import constants
 */

import {
  UPDATE_SINGLE_FIELD,
  UPDATE_IS_LOGGED_IN,
  UPDATE_IS_SUBSCRIBED,
  UPDATE_IS_NOT_REGISTERED,
  UPDATE_IS_FETCHING,
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

/*
 * Update the isLogIn
 * @param {status: status to be set}
 */

export function updateIsLogIn(status) {
  return {
    type: UPDATE_IS_LOGGED_IN,
    status
  };
}

/*
 * Update the isSubscribed
 * @param {status: status to be set}
 */

export function updateIsSubscribed(status) {
  return {
    type: UPDATE_IS_SUBSCRIBED,
    status
  };
}

/*
 * Update the isNotRegistered
 * @param {status: status to be set}
 */

export function updateIsNotRegistered(status) {
  return {
    type: UPDATE_IS_NOT_REGISTERED,
    status
  };
}

/*
 * Update the isNotRegistered
 * @param {status: status to be set}
 */

export function updateIsFetching(status) {
  return {
    type: UPDATE_IS_FETCHING,
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

    dispatch(updateIsFetching(true));
    DevSummitAxios.post('/auth/login', {
      username,
      password
    }).then((response) => {
      if (response && response.data && response.data.meta.success) {
        try {
          AsyncStorage.setItem('access_token', response.data.data.access_token);
          AsyncStorage.setItem('refresh_token', response.data.data.refresh_token);
          AsyncStorage.setItem('role_id', response.data.included.role_id);
        } catch (error) {
          console.log(error, 'error caught');
        }
        dispatch(updateIsLogIn(true));
        dispatch({
          type: FETCH_PROFILE_DATA,
          payload: response.data.included
        });
      } else if (!response.data.meta.success && response.data.meta.message === "user is not registered") {
        dispatch(updateIsFetching(false));
        dispatch(updateIsNotRegistered(true))
      }
    }).catch((err) => { console.log(err) })
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
          dispatch(updateIsFetching(true));
          DevSummitAxios.post('/auth/login', {
            provider: resp.provider,
            token: resp.response.credentials.idToken
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {
            dispatch(updateIsFetching(false));
            if (response && response.data && response.data.meta.success) {
              try {
                AsyncStorage.setItem('access_token', response.data.data.access_token);
                AsyncStorage.setItem('refresh_token', response.data.data.refresh_token);
                AsyncStorage.setItem('role_id', response.data.included.role_id);
              } catch (error) {
                console.log(error, 'error caught');
              }
              dispatch(updateIsLogIn(true));
              dispatch({
                type: FETCH_PROFILE_DATA,
                payload: response.data.included
              });
            } else if (!response.data.meta.success && response.data.meta.message === "user is not registered") {
              axios.get('https://www.googleapis.com/plus/v1/people/me', {
                headers: {
                  Accept: 'application/json',
                  Authorization: resp.response.credentials.authorizationHeader
                }
              }).then((rsp) => {
                const prefilledData = {
                  first_name: rsp.data.name.givenName,
                  last_name: rsp.data.name.familyName,
                  email: rsp.data.emails[0].value,
                  social_id: rsp.data.id
                }
                Actions.registerEmail({prefilledData: prefilledData})
              }).catch(err => console.log(err));
            }
          }).catch((err) => {
            console.log(err)
            dispatch(updateIsFetching(false));
          })
        }
      }).catch((err) => { console.log(err); });
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
        dispatch(updateIsFetching(true))
        DevSummitAxios.post('/auth/login', data, { headers })
          .then((response) => {
            dispatch(updateIsFetching(false));
            if (response && response.data && response.data.meta.success) {
              try {
                AsyncStorage.setItem('access_token', response.data.data.access_token);
                AsyncStorage.setItem('refresh_token', response.data.data.refresh_token);
                AsyncStorage.setItem('role_id', response.data.included.role_id);
              } catch (error) {
                console.log(error, 'error caught');
              }
              dispatch(updateIsLogIn(true));
              dispatch({
                type: FETCH_PROFILE_DATA,
                payload: response.data.included
              });
            } else if (!response.data.meta.success && response.data.meta.message === "user is not registered") {
              axios.get('https://graph.facebook.com/me?fields=id,first_name,last_name,email', {
                headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${resp.response.credentials.accessToken}`
                }
              }).then((rsp) => {
                const prefilledData = {
                  first_name: rsp.data.first_name,
                  last_name: rsp.data.last_name,
                  email: rsp.data.email,
                  social_id: rsp.data.id
                }
                Actions.registerEmail({ prefilledData })
              }).catch(err => console.log(err));
            }
          }).catch((err) => {
            console.log(err)
            dispatch(updateIsFetching(false));
          })
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
      dispatch(updateIsFetching(true));
      DevSummitAxios.post('/auth/login', data, { headers })
        .then((response) => {
          dispatch(updateIsFetching(false));
          if (response && response.data && response.data.meta.success) {
            try {
              AsyncStorage.setItem('access_token', response.data.data.access_token);
              AsyncStorage.setItem('refresh_token', response.data.data.refresh_token);
              AsyncStorage.setItem('role_id', response.data.included.role_id);
            } catch (error) {
              console.log(error, 'error caught');
            }
            dispatch(updateIsLogIn(true));
            dispatch({
              type: FETCH_PROFILE_DATA,
              payload: response.data.included
            });
          } else if (!response.data.meta.success && response.data.meta.message === "user is not registered") {
            const prefilledData = {
              first_name: info.user.name,
              last_name: '',
              email: '',
              social_id: info.user.id_str,
              username: info.user.screen_name.toLowerCase()
            }
            Actions.registerEmail({ prefilledData })
          }
        }).catch((err) => {
          console.log(err)
          dispatch(updateIsFetching(false));
        })
    }).catch((error) => { console.log(error) });
  };
}

export function subscribeNewsletter() {
  return (dispatch, getState) => {
    const { fields } = getState().get('main').toJS();
    const { email } = fields;

    const headers = { 'Content-Type': 'application/json' };
    DevSummitAxios.post('/api/v1/newsletters', {email}, {headers}).then((response) => {
      if (response && response.data && response.data.meta.success) {
        dispatch(updateIsSubscribed(true));
      }
    });
  }
}
