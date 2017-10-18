import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

import schedule from '../../services/schedule';

import { FETCH_USER_SCHEDULE } from './constants';

export function fetchUserSchedule() {
  return (dispatch) => {
    schedule.get()
      .then((response) => {
        dispatch({
          type: FETCH_USER_SCHEDULE,
          payloads: response.data.data
        });
      })
      .catch((error) => { return console.log(error.response); });
  };
}
