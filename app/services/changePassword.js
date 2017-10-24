import Api from './api';
import {
  AUTH_BASE_URL
} from '../constants';

export default {
  patch: inputFields => Api.put(`${AUTH_BASE_URL}/auth/me/changepassword`, inputFields)
  // getNext: nextUrl => 
}
;
