import { fromJS } from 'immutable';

import {
  FETCH_ATTENDEES,
  IS_TRANSFERRING_TICKET
} from './constants';

const initialState = fromJS({
  attendees: [],
  isTransferringTicket: false
});

function attendeesListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ATTENDEES:
      return state.set('attendees', action.payloads);
    case IS_TRANSFERRING_TICKET:
      return state.set('isTransferringTicket', action.status);
    default:
      return state;
  }
}

export default attendeesListReducer;
