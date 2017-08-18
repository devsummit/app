import { fromJS } from 'immutable';

import {
  FETCH_ATTENDEES,
  IS_FETCHING_ATTENDEES,
  IS_TRANSFERRING_TICKET,
  FETCHING_ATTENDEES_STATUS
} from './constants';

const initialState = fromJS({
  attendees: [],
  isFetchingAttendees: false,
  isTransferringTicket: false,
  fetchingAttendeeStatus: true
});

function attendeesListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ATTENDEES:
      return state.set('attendees', action.payloads);
    case IS_FETCHING_ATTENDEES:
      return state.set('isFetchingAttendees', action.status);
    case IS_TRANSFERRING_TICKET:
      return state.set('isTransferringTicket', action.status);
    case FETCHING_ATTENDEES_STATUS:
      return state.set('fetchingAttendeeStatus', action.status);
    default:
      return state;
  }
}

export default attendeesListReducer;
