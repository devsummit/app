import Api from './api';

export default {
  get: () => Api.get('/auth/me/changepassword', {
    old_password: current_password,
    new_password
  }, {
    headers: {
      Authorization: token
    }
  })
};
