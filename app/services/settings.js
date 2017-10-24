import Api from './api';

export default {
  post: feedBack => Api.post('/user-feedback', feedBack)
};
