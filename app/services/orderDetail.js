import Api from './api';

export default {
  get: orderId => Api.get(`/orders/${orderId}/details`),
  patch: id => Api.patch(`/payments/status/${id}`)
};
