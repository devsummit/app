import Api from './api';

export default {
  get: () => Api.get('api/v1/hackaton/team'),
  getBooth: () => Api.get('api/v1/booths')
};
