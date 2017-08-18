import { fromJS } from 'immutable';

import {
  FETCH_USER_TICKET,
  IS_FETCHING_USER_TICKET,
  FETCHING_USER_TICKET_STATUS
} from './constants';

const initialState = fromJS({
  userTicket: [],
  isFetchingUserTicket: false,
  fetchingTicketStatus: false
});

function ticketListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_TICKET:
      return state.set('userTicket', action.payloads);
    case IS_FETCHING_USER_TICKET:
      return state.set('isFetchingUserTicket', action.status);
    case FETCHING_USER_TICKET_STATUS:
      return state.set('fetchingTicketStatus', action.status);
    default:
      return state;
  }
}

export default ticketListReducer;
