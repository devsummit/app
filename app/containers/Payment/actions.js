/*
 * import constants
 */

import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD
} from './constants';
import PayPal from 'react-native-paypal';
import {
  PAYPAL_CLIENT_ID,
  PAYPAL_CURRENCY,
  PAYPAL_RATE
} from '../../constants'

/*
 * Update the input fields
 * @param {field: name of the field}
 * @param {value: value to be set}
 */
export function updateInputFields(field, value) {
  return {
    type: UPDATE_SINGLE_INPUT_FIELD,
    field,
    value
  };
}

/*
 * Update the error of input fields
 * @param {field: name of the field}
 * @param {value: value to be set}
 */
export function updateErrorFields(field, value) {
  return {
    type: UPDATE_SINGLE_ERROR_FIELD,
    field,
    value
  };
}

export function payWithPaypal(order) {
  console.log({order, PAYPAL_RATE});
  return (dispatch) => {
      PayPal.paymentRequest({
        clientId: PAYPAL_CLIENT_ID,
        environment: PayPal.SANDBOX,
        price: (order.amount / PAYPAL_RATE).toFixed(2).toString(),
        currency: PAYPAL_CURRENCY,
        description: 'Ticket for full 3-day event'
      }).then(response => console.log(response))
      .catch(error => console.log(error))
  }
}
