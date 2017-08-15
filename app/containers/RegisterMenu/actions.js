import { AsyncStorage } from 'react-native';
import OAuthManager from 'react-native-oauth';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

import {
  DevSummitAxios
} from '../../helpers';

/*
 * import constants
 */

import {
  UPDATE_IS_REGISTERED,
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FB_CLIENT_ID,
  FB_CLIENT_SECRET
} from './constants';

export function registerGoogle() {
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
          axios.get('https://www.googleapis.com/plus/v1/people/me', {
            headers: {
              Accept: 'application/json',
              Authorization: resp.response.credentials.authorizationHeader
            }
          }).then((response) => {
            const prefilledData = {
              first_name: response.data.name.givenName,
              last_name: response.data.name.familyName,
              email: response.data.emails[0].value,
              social_id: response.data.id
            }
            Actions.registerEmail({prefilledData: prefilledData})
            console.log('first_name',response.data.name.givenName)
            console.log('last_name',response.data.name.familyName)
            console.log('social_id',response.data.id)
            console.log('email',response.data.emails[0].value)

          }).catch(err => console.log(err));
        }
      }).catch(err => console.log(err));
  }
}

export function registerFacebook() {
  return (dispatch) => {
    const manager = new OAuthManager('devsummit')
    manager.configure({
      facebook: {
        client_id: FB_CLIENT_ID,
        client_secret: FB_CLIENT_SECRET
      }
    });
    manager.authorize('facebook', { scopes: 'public_profile,email' })
      .then((resp) => {
        if (resp.authorized) {
          axios.get('https://graph.facebook.com/me?fields=id,first_name,last_name,email', {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${resp.response.credentials.accessToken}`
            }
          }).then((response) => {
            const prefilledData = {
              first_name: response.data.first_name,
              last_name: response.data.last_name,
              email: response.data.email,
              social_id: response.data.id
            }
            Actions.registerEmail({ prefilledData })
          }).catch(err => console.log(err));
        }
      }).catch(err => console.log(err));
  }
}
