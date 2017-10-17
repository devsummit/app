import { fromJS } from 'immutable';

/*
* import constants
*/

import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD,
  IS_PAYING_WITH_PAYPAL,
  GET_TICKET_TYPES
} from './constants';

/*
* initial state of reducers
*/
const initialState = fromJS({
  inputFields: {
    paymentType: 'credit_card',
    bankDestination: 'mandiri'
  },
  errorFields: {},
  isPayingWithPaypal: false,
  ticketTypes: []
});

function registerPaymentReducer(state = initialState, action) {
  switch (action.type) {
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
