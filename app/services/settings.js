import Api from './api';

export default {
  patch: (firstName, lastName, boothInfo, job, summary) => Api.patch('/auth/me/changesetting')
}
;
