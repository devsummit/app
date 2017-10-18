import Api from './api';

export default {
  get: id => Api.get(`/attendees/${id}`),
  getPhoto: id => Api.get(`/booths/galleries/${id}`),
  patch: form => Api.get('/booths/galleries/update_logo', form)
};
