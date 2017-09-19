import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

import {
  FETCH_BOOTH_LIST
} from './constants';

/*
 * Get speaker data
*/

export function fetchBoothList() {
  return (dispatch) => {
    getAccessToken()
      .then((token) => {
        const headers = { Authorization: token };
        DevSummitAxios.get('api/v1/booths', { headers })
          .then(async (response) => {
            await dispatch({
              type: FETCH_BOOTH_LIST,
              payloads: response.data.data
            });
          });
      });
  };
}
