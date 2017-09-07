import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

import {
  FETCH_SPEAKER_LIST
} from './constants';

/* 
 * Get speaker data
*/

export function fetchSpeakerList() {
  return (dispatch) => {
    getAccessToken()
      .then((token) => {
        const headers = { Authorization: token };
        DevSummitAxios.get('api/v1/speakers', { headers })
          .then((response) => {
            dispatch({
              type: FETCH_SPEAKER_LIST,
              payloads: response.data.data
            });
          });
      });
  };
}

