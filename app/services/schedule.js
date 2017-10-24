import Api from './api';

export default {
  get: () => Api.get('schedules?filter=day')
}
;
