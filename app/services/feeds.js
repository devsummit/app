import Api from './api';

export default {
  get: page => Api.get(`/api/v1/feeds?page=${page}`),
  post: data => Api.post('/api/v1/feeds', data),
  delete: id => Api.delete(`/api/v1/feeds/${id}`),
  report: data => Api.post('/api/v1/feeds/reports', data)
};
