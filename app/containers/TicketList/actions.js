import { AsyncStorage } from 'react-native';

import {
  DevSummitAxios
} from '../../helpers';

import {
  FETCH_USER_TICKET,
  IS_FETCHING_USER_TICKET
} from './constants';


/*
 * Get user ticket data
 */
export function isFetchingUserTicket(status) {
  return {
    type: IS_FETCHING_USER_TICKET,
    status
  };
}

export function fetchUserTicket() {
  return (dispatch) => {
    dispatch(isFetchingUserTicket(true));
    AsyncStorage.getItem('access_token')
      .then((token) => {
        const headers = { Authorization: token };
        DevSummitAxios.get('api/v1/user/tickets', { headers })
          .then((response) => {
            dispatch(isFetchingUserTicket(false));
            dispatch({
              type: FETCH_USER_TICKET,
              payloads: response.data.data
            });
          });
      });
  };
}
