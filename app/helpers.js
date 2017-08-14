import axios from 'axios';
import qs from 'qs';

import { API_BASE_URL } from './constants';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const DevSummitAxios = axios.create({
  baseURL: API_BASE_URL,
  paramsSerializer: params => qs.stringify(params)
});
