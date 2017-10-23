import Api from './api';

export default {
  get: id => Api.get(`/api/v1/orders/${id}/details`),
  postPaymentProof: form => Api.post('/api/v1/order-verification', form)
};
