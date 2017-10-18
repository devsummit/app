import Api from './api';

export default {
  post: value => Api.post('/referals/submit'),
  patch: (username, firstName, lastName, profilePic, boothInfo, job, summary, points) => Api.post('/auth/me/changesetting')
}
;
