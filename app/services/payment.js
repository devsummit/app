import Api from './api';

export default {
  get: () => Api.get('/tickets'),
  post: payload => Api.post('/orders', payload),
  confirm: payload => Api.post('/payments/confirm', payload)
};
