import * as actions from '../AttendeesList/actions';

import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

import {
  FETCH_USER_TICKET,
  IS_FETCHING_USER_TICKET,
  FETCHING_USER_TICKET_STATUS
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

export function fetchUserTicketStatus(status) {
  return {
    type: FETCHING_USER_TICKET_STATUS,
    status
  };
}

export function fetchUserTicket() {
  return (dispatch) => {
    dispatch(isFetchingUserTicket(true));
    getAccessToken()
      .then((token) => {
        const headers = { Authorization: token };
        DevSummitAxios.get('api/v1/user/tickets', { headers })
          .then((response) => {
            if ('data' in response.data) {
              if (!('message' in response.data.data)) {
                if (response.data.data.length === 0) {
                  dispatch(fetchUserTicketStatus(false));
                } else {
                  dispatch(fetchUserTicketStatus(response.data.meta.success));
                }
              }
              dispatch(isFetchingUserTicket(false));
              dispatch(actions.isTransferringTicket(false));
              dispatch({
                type: FETCH_USER_TICKET,
                payloads: response.data.data
              });
            }
          })
          .catch((error) => { return console.log(error.response); });
      }).catch((err) => {
        console.log(err);
      });
  };
}
