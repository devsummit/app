import { fromJS } from 'immutable';

/*
* import constants
*/

import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD,
  GET_TRANSACTION_RESPONSE,
  IS_FETCHING_TRANSACTION
} from './constants';


/*
* initial state of reducers
*/
const initialState = fromJS({
  inputFields: {
    emailDetail: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    vaNumber: '',
    cardNumber: '',
    transactionResponse: '',
    isFetchingTransaction: false
  },
  errorFields: {
    errorEmailDetail: false,
    errorFirstName: false,
    errorLastName: false,
    errorPhoneNumber: false,
    errorVaNumber: false
  }
})

function paymentDetailReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SINGLE_ERROR_FIELD:
      return state.setIn([ 'inputFields', action.field ], action.value);
    case UPDATE_SINGLE_INPUT_FIELD:
      return state.setIn([ 'inputFields', action.field ], action.value);
    case GET_TRANSACTION_RESPONSE:
      return state.set('transactionResponse', action.payload);
    case IS_FETCHING_TRANSACTION:
      return state.set('isFetchingTransaction', action.status);
    default:
      return state;
  }
}

/*
 * export the reducer
 */

export default paymentDetailReducer;
