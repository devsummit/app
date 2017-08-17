import { fromJS } from 'immutable';

import {
  FETCH_USER_TICKET,
  IS_FETCHING_USER_TICKET
} from './constants';

const initialState = fromJS({
  userTicket: [],
  isFetchingUserTicket: false
});

function ticketListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_TICKET:
      return state.set('userTicket', action.payloads);
    case IS_FETCHING_USER_TICKET:
      return state.set('isFetchingUserTicket', action.status);
    default:
      return state;
  }
}

export default ticketListReducer;
