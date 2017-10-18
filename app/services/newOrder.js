import Api from './api';

export default {
  get: () => Api.get('/tickets'),
  post: data => Api.post('/orders', data),
  postReferal: () => Api.post('/referals/check')
};
