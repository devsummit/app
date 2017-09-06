import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

import {
  FETCH_SCHEDULE_LIST
} from './constants';

/* 
 * Get schedule data
*/

export function fetchScheduleList() {
  return (dispatch) => {
    getAccessToken()
      .then((token) => {
        const headers = { Authorization: token };
        DevSummitAxios.get('api/v1/schedules', { headers })
          .then((response) => {
            dispatch({
              type: FETCH_SCHEDULE_LIST,
              payloads: response.data.data
            });
            console.log(response);
          });
      });
  };
}

