import { AsyncStorage } from 'react-native';
import * as actions from '../TicketList/actions';
import {
  DevSummitAxios
} from '../../helpers';

import {
  FETCH_ATTENDEES,
  IS_TRANSFERRING_TICKET
} from './constants';


/*
 * Get attendees data
 */

export function fetchAttendees() {
  return (dispatch) => {
    AsyncStorage.getItem('access_token')
      .then((token) => {
        const headers = { Authorization: token };
        DevSummitAxios.get('api/v1/attendees', { headers })
          .then((response) => {
            dispatch({
              type: FETCH_ATTENDEES,
              payloads: response.data.data
            });
          });
      });
  };
}

export function isFetchingUserTicket(status) {
  return {
    type: IS_TRANSFERRING_TICKET,
    status
  };
}

export function transferTicket(ticketId, receiverId) {
  return (dispatch) => {
    dispatch(isFetchingUserTicket(true));
    AsyncStorage.getItem('access_token')
      .then((token) => {
        const headers = {
          Authorization: token,
          'Content-Type': 'application/json'
        };
        DevSummitAxios.put('api/v1/user/tickets',
          {
            ticket_id: ticketId,
            receiver_id: receiverId
          },
          { headers })
          .then((response) => {
            dispatch(actions.fetchUserTicket());
            dispatch(isFetchingUserTicket(false));
            dispatch({
              type: FETCH_ATTENDEES,
              payloads: response.data.data
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };
}
