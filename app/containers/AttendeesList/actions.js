import { AsyncStorage } from 'react-native';
import * as actions from '../TicketList/actions';
import {
  DevSummitAxios
} from '../../helpers';

import {
  FETCH_ATTENDEES,
  IS_FETCHING_ATTENDEES,
  FETCHING_ATTENDEES_STATUS,
  IS_TRANSFERRING_TICKET
} from './constants';


/*
 * Get attendees data
 */

export function isFetchingAttendees(status) {
  return {
    type: IS_FETCHING_ATTENDEES,
    status
  };
}

export function fetchingAttendeesStatus(status) {
  return {
    type: FETCHING_ATTENDEES_STATUS,
    status
  };
}

export function fetchAttendees() {
  return (dispatch) => {
    dispatch(isFetchingAttendees(true));
    AsyncStorage.getItem('access_token')
      .then((token) => {
        const headers = { Authorization: token };
        DevSummitAxios.get('api/v1/attendees', { headers })
          .then((response) => {
            if ('data' in response.data) {
              if (!('message' in response.data.data)) {
                dispatch(isFetchingAttendees(false));
                if (response.data.data.length === 0) {
                  dispatch(fetchingAttendeesStatus(false));
                } else {
                  dispatch(fetchingAttendeesStatus(response.data.meta.success));
                }
              }
              dispatch({
                type: FETCH_ATTENDEES,
                payloads: response.data.data
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
}

export function isTransferringTicket(status) {
  return {
    type: IS_TRANSFERRING_TICKET,
    status
  };
}

export function transferTicket(ticketId, receiverId) {
  return (dispatch) => {
    dispatch(isTransferringTicket(true));
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
            dispatch(isTransferringTicket(false));
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
