import Api from './api';
import {
  AUTH_BASE_URL
} from '../constants';

export default {
  post: inputFields => Api.post(`${AUTH_BASE_URL}/auth/register`, inputFields)
  // getNext: nextUrl => 
}
;
