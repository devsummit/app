import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

import {
  FETCH_BOOTH_LIST,
  IS_FETCHING_BOOTHS,
  FETCH_HACKATON_LIST,
  IS_FETCHING_HACKATONS
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

export function isFetchingHackatons(status) {
  return {
    type: IS_FETCHING_HACKATONS,
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

export function fetchHackatonList() {
  return (dispatch) => {
    dispatch(isFetchingHackatons(true));

    getAccessToken()
      .then((token) => {
        const headers = { Authorization: token };
        DevSummitAxios.get('api/v1/hackaton/team', { headers })
          .then( (response) => {
            console.log('landing here fetchHackatonList', response);
            dispatch({
              type: FETCH_HACKATON_LIST,
              payloads: response.data.data
            });
            dispatch(isFetchingHackatons(false))
          });
      });
  };
}
