import Api from './api';

export default {
  get: id => Api.get(`/orders/${id}/details`),
  postPaymentProof: form => Api.post('/order-verification', form)
};
