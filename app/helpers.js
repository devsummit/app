import axios from 'axios';

import { API_BASE_URL } from './constants';

export const DevSummitAxios = axios.create({
  baseURL: API_BASE_URL
});
