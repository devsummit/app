import { AsyncStorage, Alert } from 'react-native';
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
  UPDATE_IS_LOADING,
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
 * @param {status: status to be set}
 * Update the isNotRegistered
 */
export function updateisLoading(status) {
  return {
    type: UPDATE_IS_LOADING,
    status
  }
}

/*
 * Log user in
 * save access_token & refresh_token to asyncstorage
 */
export function login() {
  return (dispatch, getState) => {
    const { fields } = getState().get('main').toJS();
    const { username, password } = fields;

    dispatch(updateisLoading(true));
    DevSummitAxios.post('/auth/login', {
      username,
      password
    }).then(async (response) => {
      if (response && response.data && response.data.meta.success) {
        const resData = response.data.data;
        const roleId = JSON.stringify(response.data.included.role_id);
        const profileData = JSON.stringify(response.data.included);
        const boothData = JSON.stringify(response.data.included.booth);
        try {
          await AsyncStorage.multiSet([
            [ 'access_token', resData.access_token ],
            [ 'refresh_token', resData.refresh_token ],
            [ 'role_id', roleId ],
            [ 'profile_data', profileData ]
          ]);
        } catch (error) {
          console.log(error, 'error caught');
        }
        dispatch(updateIsLogIn(true));
      } else if (!response.data.meta.success && response.data.meta.message === "username not found") {
        Alert.alert('Login Failed', response.data.meta.message, [
          {text: 'Register', onPress: () => Actions.registerEmail()},
          {text: 'Cancel'}
        ]);
      } else {
        Alert.alert('Login Failed', response.data.meta.message);
      }
      dispatch(updateisLoading(false));
    }).catch((err) => console.log(err))
  };
}

export function loginMobile(mobileToken) {
  return (dispatch) => {
    dispatch(updateisLoading(true));

    DevSummitAxios.post('/auth/login', {
      provider: 'mobile',
      token: mobileToken
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (response) => {
      console.log(response);
      if (response && response.data && response.data.meta.success) {
        const resData = response.data.data;
        const roleId = JSON.stringify(response.data.included.role_id);
        const profileData = JSON.stringify(response.data.included);
        try {
          await AsyncStorage.multiSet([
            [ 'access_token', resData.access_token ],
            [ 'refresh_token', resData.refresh_token ],
            [ 'role_id', roleId ],
            [ 'profile_data', profileData ]
          ]);
        } catch (error) {
          console.log(error, 'error caught');
        }
        dispatch(updateIsLogIn(true));
      } else if (!response.data.meta.success && response.data.meta.message === "username not found") {
        Alert.alert('Login Failed', response.data.meta.message);
      } else {
        Alert.alert('Login Failed', response.data.meta.message);
      }
    }).catch(err => console.log(err));
    dispatch(updateisLoading(false));
  };
}

export function loginGoogle() {
  return (dispatch) => {
    const manager = new OAuthManager('devsummit');
    manager.configure({
      google: {
        callback_url: GOOGLE_CALLBACK_URL,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET
      }
    });
    manager.authorize('google', { scopes: 'email' })
      .then((resp) => {
        if (resp.authorized) {
          dispatch(updateIsLoading(true));
          DevSummitAxios.post('/auth/login', {
            provider: resp.provider,
            token: resp.response.credentials.idToken
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(async (response) => {
            if (response && response.data && response.data.meta.success) {
              const resData = response.data.data;
              const roleId = JSON.stringify(response.data.included.role_id);
              const profileData = JSON.stringify(response.data.included);
              try {
                await AsyncStorage.multiSet([
                  [ 'access_token', resData.access_token ],
                  [ 'refresh_token', resData.refresh_token ],
                  [ 'role_id', roleId ],
                  [ 'profile_data', profileData ]
                ]);
              } catch (error) {
                console.log(error, 'error caught');
              }
              dispatch(updateIsLogIn(true));
            } else if (!response.data.meta.success && response.data.meta.message === "username not found") {
              Alert.alert('Login Failed', response.data.meta.message);
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
                };
                Actions.registerEmail({ prefilledData });
              }).catch(err => console.log(err));
            }
            dispatch(updateisLoading(false));
          }).catch((err) => {
            console.log(err);
            dispatch(updateisLoading(false));
          });
        }
      }).catch((err) => { console.log(err); });
  };
}

export function loginFacebook() {
  return (dispatch) => {
    const manager = new OAuthManager('devsummit');
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
        dispatch(updateisLoading(true));
        DevSummitAxios.post('/auth/login', data, { headers })
          .then(async (response) => {
            if (response && response.data && response.data.meta.success) {
              const resData = response.data.data;
              const roleId = JSON.stringify(response.data.included.role_id);
              const profileData = JSON.stringify(response.data.included);
              try {
                await AsyncStorage.multiSet([
                  [ 'access_token', resData.access_token ],
                  [ 'refresh_token', resData.refresh_token ],
                  [ 'role_id', roleId ],
                  [ 'profile_data', profileData ]
                ]);
              } catch (error) {
                console.log(error, 'error caught');
              }
              dispatch(updateIsLogIn(true));
            } else if (!response.data.meta.success && response.data.meta.message === "username not found") {
              Alert.alert('Login Failed', response.data.meta.message);
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
                };
                Actions.registerEmail({ prefilledData });
              }).catch(err => console.log(err));
            }
            dispatch(updateisLoading(false));
          }).catch((err) => {
            console.log(err.response);
            dispatch(updateisLoading(false));
          })
          .catch((err) => { console.log(err.response); });
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
      dispatch(updateisLoading(true));
      DevSummitAxios.post('/auth/login', data, { headers })
        .then(async (response) => {
          if (response && response.data && response.data.meta.success) {
            const resData = response.data.data;
            const roleId = JSON.stringify(response.data.included.role_id);
            const profileData = JSON.stringify(response.data.included);
            try {
              await AsyncStorage.multiSet([
                [ 'access_token', resData.access_token ],
                [ 'refresh_token', resData.refresh_token ],
                [ 'role_id', roleId ],
                [ 'profile_data', profileData ]
              ]);
            } catch (error) {
              console.log(error, 'error caught');
            }
            dispatch(updateIsLogIn(true));
          } else if (!response.data.meta.success && response.data.meta.message === "username not found") {
            Alert.alert('Login Failed', response.data.meta.message);
            const prefilledData = {
              first_name: info.user.name,
              last_name: '',
              email: '',
              social_id: info.user.id_str,
              username: info.user.screen_name.toLowerCase()
            };
            Actions.registerEmail({ prefilledData });
          }
          dispatch(updateisLoading(false));
        }).catch((err) => {
          console.log(err);
          dispatch(updateisLoading(false));
        });
    }).catch((error) => { console.log(error); });
  };
}

export function subscribeNewsletter() {
  return (dispatch, getState) => {
    const { fields } = getState().get('main').toJS();
    const { email } = fields;

    const headers = { 'Content-Type': 'application/json' };
    DevSummitAxios.post('/api/v1/newsletters', { email }, { headers }).then((response) => {
      if (response && response.data && response.data.meta.success) {
        dispatch(updateIsSubscribed(true));
      }
    });
  };
}
