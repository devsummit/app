/*
 * import contants
 */

import { fromJS } from 'immutable';

import {
  SET_TICKET_TYPE
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  ticketTypes: []
});

function newOrderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TICKET_TYPE:
      console.log('reducer', action.data);
      return state.set('ticketTypes', action.data);
    default:
      return state;
  }
}

/*
 * export the reducer
 */

export default newOrderReducer;
