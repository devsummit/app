import PayPal from 'react-native-paypal';
import { DevSummitAxios, getAccessToken } from '../../helpers';

/*
 * import constants
 */
import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD,
  IS_PAYING_WITH_PAYPAL
} from './constants';

/*
 * import Paypal Constants
 */
import {
  PAYPAL_CLIENT_ID,
  PAYPAL_CURRENCY,
  PAYPAL_RATE,
  PAYPAL_ENV
} from '../../constants';

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

/*
 * Change the state of paying with PayPal
 * @param {value: set if paying with paypal in progress}
 */
export function isPayingWithPaypal(value) {
  return {
    type: IS_PAYING_WITH_PAYPAL,
    value
  };
}

/*
 * Initiate payment with PayPal
 * @param {order: order data}
 */
export function payWithPaypal(order) {
  return (dispatch) => {
    dispatch(isPayingWithPaypal(true));
    console.log('order', order, order.price * order.count)
    PayPal.paymentRequest({
      clientId: PAYPAL_CLIENT_ID,
      environment: PAYPAL_ENV,
      price: (order.price * order.count).toFixed(2).toString(),
      currency: PAYPAL_CURRENCY,
      description: 'Ticket for full 3-day event'
    }).then(({ confirmation }) => {
      const { response } = confirmation;
      getAccessToken()
        .then((accessToken) => {
          const data = {
            order_id: order.id,
            transaction_id: response.id,
            payment_type: 'paypal'
          };
          return DevSummitAxios.post('/api/v1/payments/confirm', data, {
            headers: { Authorization: accessToken }
          });
        }).then((result) => {
          console.log('response', result);
          dispatch(isPayingWithPaypal(false));
        }).catch((error) => {
          console.log('error', error);
          dispatch(isPayingWithPaypal(false));
        });
    })
      .catch((error) => {
        console.log(error);
        dispatch(isPayingWithPaypal(false));
      });
  };
}
