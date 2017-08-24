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

export const getRoleId = async () => {
  const roleId = await AsyncStorage.getItem('role_id');
  return JSON.parse(roleId);
};

export const getProfileData = async () => {
  const profileData = await AsyncStorage.getItem('profile_data');
  return JSON.parse(profileData);
};
