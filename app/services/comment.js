import Api from './api';

export default {
  getComments: id => Api.get(`api/v1/feeds/${id}/comments`),
  postComment: (id, content) => Api.post(`api/v1/feeds/${id}/comments`, { content }),
  moreComments: link => Api.get(link)
};
