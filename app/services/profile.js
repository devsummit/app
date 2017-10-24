import Api from './api';
import {
  AUTH_BASE_URL
} from '../constants';

export default {
  post: value => Api.post('/referals/submit'),
  patch: fields => Api.put(`${AUTH_BASE_URL}/auth/me/changesetting`, fields)
}
;
