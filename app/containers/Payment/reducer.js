import { fromJS } from 'immutable';

/*
* import constants
*/

import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD,
  IS_PAYING_WITH_PAYPAL,
  UPDATE_USER_ID,
  UPDATE_ORDER,
  GET_TICKET_TYPES
} from './constants';

/*
* initial state of reducers
*/
const initialState = fromJS({
  inputFields: {
    referalCode: ''
  },
  userId: '',
  // orders: {},
  referal: {},
  errorFields: {
    referalCode: false
  },
  isPayingWithPaypal: false,
  ticketTypes: []
});

function registerPaymentReducer(state = initialState, action) {
  switch (action.type) {
    // case UPDATE_ORDER:
    //   return state.setIn([ 'orders', action.id ], action.value);
    case UPDATE_USER_ID:
      return state.set('userId', action.value);
    case UPDATE_SINGLE_ERROR_FIELD:
      return state.setIn([ 'inputFields', action.field ], action.value);
    case UPDATE_SINGLE_INPUT_FIELD:
      return state.setIn([ 'inputFields', action.field ], action.value);
    case IS_PAYING_WITH_PAYPAL:
      return state.set('isPayingWithPaypal', action.value);

    case GET_TICKET_TYPES:
      return state.set('ticketTypes', fromJS(action.payload));

    default:
      return state;
  }
}

/*
 * export the reducer
 */

export default registerPaymentReducer;
