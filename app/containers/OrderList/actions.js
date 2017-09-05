import { DevSummitAxios, getAccessToken } from '../../helpers';

/*
 * import constants
 */
import {
  SET_ORDER_LIST,
  IS_FETCHING_ORDERS,
  IS_CONFIRMING_PAYMENT,
  SET_CONFIRM_PAYMENT
} from './constants';

// update fetch transaction status
export function updateIsFetchingOrders(status) {
  return {
    type: IS_FETCHING_ORDERS,
    status
  };
}

export function getOrderList() {
  return (dispatch) => {
    dispatch(updateIsFetchingOrders(true));
    getAccessToken().then((accessToken) => {
      DevSummitAxios.get('/api/v1/orders', {
        headers: { Authorization: accessToken }
      }).then((response) => {
        if (response.data && response.data.meta.success) {
          dispatch({
            type: SET_ORDER_LIST,
            data: response.data.data
          });
          dispatch(updateIsFetchingOrders(false));
        }
      }).catch((err) => {
        dispatch(updateIsFetchingOrders(false));
        console.log(err.response);
      });
    }).catch(() => { console.log('fail get access token'); });
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
      DevSummitAxios.patch(`/api/v1/payments/status/${id}`, {}, {
        headers: { Authorization: accessToken }
      }).then((response) => {
        if (response.data && response.data.data) {
          dispatch({
            type: SET_CONFIRM_PAYMENT,
            payload: response.data.data,
            idx
          });
        }
        dispatch(updateIsConfirmingPayment(false));
      }).catch((err) => { console.log(err); });
    });
  };
}
