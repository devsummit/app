import Api from './api';

export default {
  get: () => Api.get('/documents'),
  patch: data => Api.patch(`/documents/${data.id}`),
  delete: id => Api.delete(`/documents/${id}`)
}
;
