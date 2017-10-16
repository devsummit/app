import PayPal from 'react-native-paypal';
import { DevSummitAxios, getAccessToken } from '../../helpers';
import payment from '../../services/payment';
import { getOrderDetail } from '../OrderDetail/actions';
/*
 * import constants
 */
import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD,
  IS_PAYING_WITH_PAYPAL,
  GET_TICKET_TYPES,
  CREATE_ORDER
} from './constants';

/*
 * import Paypal Constants
 */
import { PAYPAL_CLIENT_ID, PAYPAL_CURRENCY, PAYPAL_RATE, PAYPAL_ENV } from '../../constants';

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

export function createOrderExhibitor(ticketId, callback) {
  return (dispatch) => {
    const data = {
      order_details: [
        {
          count: 1,
          ticket_id: ticketId
        }
      ],
      payment_type: 'offline'
    };
    payment
      .post(data)
      .then((response) => {
        callback();
        dispatch(getOrderDetail(response.data.data.id));
      })
      .catch(err => console.log(err));
  };
}

export function getTickets() {
  return (dispatch) => {
    payment.get().then((response) => {
      dispatch({
        type: GET_TICKET_TYPES,
        payload: response.data.data
      });
    });
  };
}
/*
 * Initiate payment with PayPal
 * @param {order: order data}
 */
export function payWithPaypal(order, callback = () => {}) {
  return (dispatch) => {
    dispatch(isPayingWithPaypal(true));
    PayPal.paymentRequest({
      clientId: PAYPAL_CLIENT_ID,
      environment: PAYPAL_ENV,
      price: (order.price * order.count).toFixed(2).toString(),
      currency: PAYPAL_CURRENCY,
      description: 'Ticket for full 3-day event'
    })
      .then(({ confirmation }) => {
        const { response } = confirmation;
        return getAccessToken()
          .then((accessToken) => {
            const data = {
              order_id: order.order_id,
              transaction_id: response.id,
              payment_type: 'paypal'
            };
            return DevSummitAxios.post('/api/v1/payments/confirm', data, {
              headers: { Authorization: accessToken }
            });
          })
          .then((result) => {
            console.log('result', result);
            dispatch(isPayingWithPaypal(false));
            callback(result);
          })
          .catch((error) => {
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
