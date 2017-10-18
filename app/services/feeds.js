import Api from './api';

export default {
  get: page => Api.get(`/feeds?page=${page}`),
  post: data => Api.post('/feeds', data),
  delete: id => Api.delete(`/feeds/${id}`),
  report: data => Api.post('/feeds/reports', data)
};
