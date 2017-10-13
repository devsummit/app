import Toast from 'react-native-simple-toast';
import { DevSummitAxios, getAccessToken } from '../../helpers';
import { updateDataStorage } from '../Profile/actions';
/*
 * import constants
 */
import {
  SET_ORDER_LIST,
  IS_FETCHING_ORDERS,
  IS_CONFIRMING_PAYMENT,
  SET_CONFIRM_PAYMENT,
  PENDING_ORDERS,
  REDEEM_COUNTER
} from './constants';

export function redeemCounter() {
  return (dispatch) => {
    getAccessToken().then((accessToken) => {
      DevSummitAxios.get('/api/v1/me', {
        headers: { Authorization: accessToken }
      }).then((profile) => {
        const value = profile.data.data.referal_count;
        dispatch({
          type: REDEEM_COUNTER,
          value
        });
        dispatch(updateDataStorage(profile.data));
      });
    });
  };
}

export function submitReferal() {
  return (dispatch) => {
    getAccessToken().then((accessToken) => {
      DevSummitAxios.post(
        '/api/v1/referals/reward',
        {},
        {
          headers: { Authorization: accessToken }
        }
      )
        .then((response) => {
          const value = response.data.meta.success ? 11 : 0;
          dispatch({
            type: REDEEM_COUNTER,
            value
          });
          Toast.show(response.data.meta.message, Toast.LONG);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
}

// update fetch transaction status
export function updateIsFetchingOrders(status) {
  return {
    type: IS_FETCHING_ORDERS,
    status
  };
}

export function pendingOrder(value) {
  return {
    type: PENDING_ORDERS,
    value
  };
}

export function getOrderList() {
  return (dispatch) => {
    dispatch(updateIsFetchingOrders(true));
    dispatch(redeemCounter());
    getAccessToken()
      .then((accessToken) => {
        DevSummitAxios.get('/api/v1/orders', {
          headers: { Authorization: accessToken }
        })
          .then((response) => {
            if (response.data && response.data.meta.success) {
              const validOrder = response.data.data.filter(item => item.payment);
              dispatch({
                type: SET_ORDER_LIST,
                data: validOrder
              });
              let pendingCounter = 0;
              response.data.data.map((order) => {
                if (!order.payment || order.payment.transaction_status !== 'capture') {
                  pendingCounter += 1;
                }
              });
              dispatch(pendingOrder(pendingCounter));
              dispatch(updateIsFetchingOrders(false));
            }
          })
          .catch((err) => {
            dispatch(updateIsFetchingOrders(false));
            console.log(err.response);
          });
      })
      .catch(() => {
        console.log('fail get access token');
      });
  };
}

export function updateIsConfirmingPayment(status) {
  return {
    type: IS_CONFIRMING_PAYMENT,
    status
  };
}

export function confirmPayment(id, idx) {
  return (dispatch) => {
    dispatch(updateIsConfirmingPayment(true));
    getAccessToken().then((accessToken) => {
      DevSummitAxios.patch(
        `/api/v1/payments/status/${id}`,
        {},
        {
          headers: { Authorization: accessToken }
        }
      )
        .then((response) => {
          if (response.data && response.data.data) {
            dispatch({
              type: SET_CONFIRM_PAYMENT,
              payload: response.data.data,
              idx
            });
          }
          dispatch(updateIsConfirmingPayment(false));
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };
}
