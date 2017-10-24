import Api from './api';

export default {
  get: () => Api.get('/user/tickets'),
  post: payloads => Api.post('/tickets/transfer', payloads)
}
;
