import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import base from 'base-64';
import { API_BASE_URL, CLIENT_SECRET, PRIMARYCOLOR } from './constants';

// import { updateIsLogOut } from './containers/Profile/actions';

export const DevSummitAxios = axios.create({
  baseURL: API_BASE_URL
});

export const decodeToken = (token) => {
  const base64Url = token.split('.')[0];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(base.decode(base64));
};

export const getAccessToken = async () => {
  let token = await AsyncStorage.getItem('access_token');
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

  // if not expired
  if (exp < tokenExp.exp) {
    return token;
  }

  const refreshToken = await AsyncStorage.getItem('refresh_token');

  await DevSummitAxios.post('/auth/refreshtoken', { refresh_token: refreshToken })
    .then(async (response) => {
      if (response.data.data && response.data.data.exist === false) {
        const keys = [ 'access_token', 'refresh_token', 'role_id', 'profile_data' ];
        await AsyncStorage.multiRemove(keys);
        return Actions.main();
      }
      const { access_token: accessToken, refresh_token: refreshtoken } = response.data.data;
      await AsyncStorage.multiSet([
        [ 'access_token', accessToken ],
        [ 'refresh_token', refreshtoken ]
      ]);
      token = accessToken;
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

export const formatDate = (source) => {
  const dt = source.split(' ');
  return `${dt[0]} ${dt[1]}`;
};

export const transactionStatus = (payment) => {
  if (payment) {
    if (payment.fraud_status === 'accept' && payment.transaction_status === 'capture') {
      return {
        message: 'paid',
        color: 'green'
      };
    } else if (payment.fraud_status === 'challenge') {
      return {
        message: 'waiting for authorization',
        color: 'blue'
      };
    } else if (payment.transaction_status === 'pending') {
      return {
        message: 'pending',
        color: 'red'
      };
    }
    return {
      message: payment.transaction_status,
      color: 'grey'
    };
  }
  return {
    message: 'not paid',
    color: PRIMARYCOLOR
  };
};
