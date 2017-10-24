import Api from './api';

export default {
  updateFcmToken: token => Api.patch(`auth/me/updatefcmtoken`, null, null, { json: {token}}),
};
