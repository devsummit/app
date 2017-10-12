import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

import {
  FETCH_BOOTH_LIST,
  IS_FETCHING_BOOTHS
} from './constants';

/*
 * Get speaker data
*/

export function isFetchingBooths(status) {
  return {
    type: IS_FETCHING_BOOTHS,
    status
  };
}

export function fetchBoothList() {
  return (dispatch) => {
    dispatch(isFetchingBooths(true));

    getAccessToken()
      .then((token) => {
        const headers = { Authorization: token };
        DevSummitAxios.get('api/v1/booths', { headers })
          .then(async (response) => {
            await dispatch({
              type: FETCH_BOOTH_LIST,
              payloads: response.data.data
            });
            dispatch(isFetchingBooths(false))
          });
      });
  };
}
