import { fromJS } from 'immutable';

/*
* import constants
*/

import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD
} from './constants';


/*
* initial state of reducers
*/
const initialState = fromJS({
  inputFields: {
    paymentType: 'credit_card',
    bankDestination: 'mandiri'
  },
  errorFields: {

  }
});

function registerPaymentReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SINGLE_ERROR_FIELD:
      return state.setIn([ 'inputFields', action.field ], action.value);

    case UPDATE_SINGLE_INPUT_FIELD:
      return state.setIn([ 'inputFields', action.field ], action.value);

    default:
      return state;
  }
}

/*
 * export the reducer
 */

export default registerPaymentReducer;
