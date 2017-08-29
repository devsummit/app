import axios from 'axios';
import { AsyncStorage } from 'react-native';

import { API_BASE_URL, CLIENT_SECRET } from './constants';

import { updateIsLogOut } from './containers/Profile/actions';

export const DevSummitAxios = axios.create({
  baseURL: API_BASE_URL
});

export const decodeToken = (token) => {
  const base64Url = token.split('.')[0];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export const getAccessToken = async () => {
  const token = await AsyncStorage.getItem('access_token');
  // decode token to acquire exp data
  // check token expiry with new Date().getTime()
  // if still true return the token
  // if not send refresh token to backend
  // if back end response invalid token logout user

  if (!token) { // if token does not exist
    return token;
  }

  const tokenExp = decodeToken(token);
  const exp = Math.floor(new Date().getTime() / 1000);

  if (exp < tokenExp.exp) {
    return token;
  }

  const refreshToken = await AsyncStorage.getItem('refresh_token');

  DevSummitAxios.post('/auth/refreshtoken', { refresh_token: refreshToken })
    .then(async (response) => {
      if (response.data.data ) {
        const keys = ['access_token', 'refresh_token', 'role_id', 'profile_data'];
        await AsyncStorage.multiRemove(keys);
        updateIsLogOut();
      }
      const { access_token: accessToken, refresh_token: refreshtoken } = response.data.data;
      const roleId = JSON.stringify(response.data.included.role_id);
      const profileData = JSON.stringify(response.data.included);
      await AsyncStorage.multiSet([
        [ 'access_token', accessToken ],
        [ 'refresh_token', refreshtoken ],
        [ 'role_id', roleId ],
        [ 'profile_data', profileData ]
      ]);
    })
    .catch(err => err);

  return token;
};

export const getRoleId = async () => {
  const roleId = await AsyncStorage.getItem('role_id');
  return JSON.parse(roleId);
};

export const getProfileData = async () => {
  const profileData = await AsyncStorage.getItem('profile_data');
  return JSON.parse(profileData);
};
