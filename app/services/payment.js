import Api from './api';

export default {
  get: () => Api.get('/api/v1/tickets'),
  post: payload => Api.post('/api/v1/orders', payload),
  confirm: payload => Api.post('/api/v1/payments/confirm', payload)
};
