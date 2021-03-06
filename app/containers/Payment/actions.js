import { Platform } from 'react-native';
import PayPal from 'react-native-paypal';
import Toast from 'react-native-simple-toast';
import LoaderHandler from 'react-native-busy-indicator/LoaderHandler';
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
  UPDATE_USER_ID,
  UPDATE_ORDER,
  GET_TICKET_TYPES,
  CREATE_ORDER
} from './constants';

/*
 * import Paypal Constants
 */
import { PAYPAL_CLIENT_ID, PAYPAL_CURRENCY, PAYPAL_RATE, PAYPAL_ENV } from '../../constants';

// update user id
export function updateUserId(value) {
  return {
    type: UPDATE_USER_ID,
    value
  };
}

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

export function payWithBankTransfer(userId, order, referalCode, callback = () => ({})) {
  return (dispatch) => {
    const orderItems = Object.keys(order).map((key) => {
      return order[key];
    });
    const data = {
      order_details: orderItems,
      payment_type: 'offline',
      referal_code: referalCode
    };
    let done = false;
    setTimeout(() => {
      if (!done) {
        Toast.show('Timed out. Please try again');
        LoaderHandler.hideLoader();
      }
      done = true;
    }, 30 * 1000);
    payment
      .post(data)
      .then((response) => {
        if (!done) {
          if (response.data && response.data.meta.success) {
            callback({
              ...response.data.data,
              ...response.data.included[0]
            });
          } else {
            Toast.show('You already registered as hackaton');
            LoaderHandler.hideLoader();
          }
        }
      })
      .catch((error) => {
        if (!done) {
          Toast.show('Sorry, something went wrong');
          LoaderHandler.hideLoader();
        }
      });
  };
}

export function payWithPaypal(order, callback = () => {}, ticketId) {
  return (dispatch) => {
    dispatch(isPayingWithPaypal(true));
    const orderItems = ticketId
      ? [ { count: 1, ticket_id: ticketId } ]
      : Object.keys(order).map(key => order[key]);

    const data = {
      order_details: orderItems,
      payment_type: 'paypal'
    };
    payment
      .post(data)
      .then((response) => {
        if (response.data.included[0].ticket.type === 'user') {
          return Promise.all([
            Promise.resolve(response.data.data),
            PayPal.paymentRequest({
              clientId: PAYPAL_CLIENT_ID,
              environment: PAYPAL_ENV,
              price: response.data.included
                .reduce((sum, item) => sum + item.price * item.count, 0)
                .toString(),
              currency: PAYPAL_CURRENCY,
              description: 'Devsummit event ticket'
            })
          ]);
        }
        return Promise.all([
          Promise.resolve(response.data.data),
          PayPal.paymentRequest({
            clientId: PAYPAL_CLIENT_ID,
            environment: PAYPAL_ENV,
            price: response.data.included
              .reduce((sum, item) => sum + item.price * item.count, 0)
              .toString(),
            currency: PAYPAL_CURRENCY,
            description: `Devsummit ${response.data.included[0].ticket.type}`
          })
        ]);
      })
      .then(([ order, result ]) => {
        let response;
        if (Platform.OS === 'android') {
          response = JSON.parse(result).response;
        } else {
          response = result.confirmation.response;
        }
        return payment.confirm({
          order_id: order.id,
          transaction_id: response.id,
          payment_type: 'paypal'
        });
      })
      .then((result) => {
        dispatch(isPayingWithPaypal(false));
        callback(result);
      })
      .catch((error) => {
        dispatch(isPayingWithPaypal(false));
        callback(false);
      });
  };
}
