import Api from './api';

export default {
  get: () => Api.get('/orders'),
  update: id => Api.patch(`/payments/status/${id}`),
  countRedeem: () => Api.get('/me'),
  claimReward: () => Api.post('/referals/reward', {}),
  postConfirmEmail: () => Api.post('/api/v1/confirm-email/resend', {})
};
