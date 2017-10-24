import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

import {
  FETCH_BOOTH_LIST,
  IS_FETCHING_BOOTHS
} from './constants';

import boothList from '../../services/boothList';
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

    boothList
      .get()
      .then((response) => {
        dispatch({
          type: FETCH_BOOTH_LIST,
          payloads: response.data.data
        });
        dispatch(isFetchingBooths(false));
      });
  };
}
