import { fromJS } from 'immutable';

import {
  FETCH_USER_TICKET,
  IS_FETCHING_USER_TICKET,
  FETCHING_USER_TICKET_STATUS,
  UPDATE_INPUT_FIELDS,
  IS_TRANSFER_TICKET
} from './constants';

const initialState = fromJS({
  userTicket: [],
  fields: {
    receiver: '',
    user_ticket_id: null,
    password: ''
  },
  isFetchingUserTicket: false,
  fetchingTicketStatus: false,
  isTransferTicket: false
});

function ticketListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_TICKET:
      return state.set('userTicket', action.payloads);
    case IS_FETCHING_USER_TICKET:
      return state.set('isFetchingUserTicket', action.status);
    case FETCHING_USER_TICKET_STATUS:
      return state.set('fetchingTicketStatus', action.status);
    case UPDATE_INPUT_FIELDS:
      return state.setIn(['fields', action.fields], action.value);
    case IS_TRANSFER_TICKET:
      return state.set('isTransferTicket', action.status);
    default:
      return state;
  }
}

export default ticketListReducer;
