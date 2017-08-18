import axios from 'axios';
import { AsyncStorage } from 'react-native';

import { API_BASE_URL } from './constants';

export const DevSummitAxios = axios.create({
  baseURL: API_BASE_URL
});

export const getAccessToken = async () => {
  const token = await AsyncStorage.getItem('access_token');
  return token;
};
