import { Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';
import { DevSummitAxios, getAccessToken } from '../../helpers';
import orderdetail from '../../services/orderdetail';
/*
 * import constants
 */
import {
  // SET_TICKET_TYPE,
  UPDATE_ORDER,
  SET_ORDER,
  IS_UPDATING_ORDER,
  UPDATE_ORDER_STATUS,
  IS_CONFIRMING_PAYMENT,
  SET_CONFIRM_PAYMENT,
  SET_PAYMENT_PROOF,
  SET_ORDER_ID
  // RESET_STATE
} from './constants';

import * as actions from '../OrderList/actions';
// get order detail

export function updateIsUpdatingOrder(status) {
  return {
    type: IS_UPDATING_ORDER,
    status
  };
}

export function setPaymentProof(value) {
  return { type: SET_PAYMENT_PROOF, value };
}

export function setOrderId(value) {
  return { type: SET_ORDER_ID, value };
}

export function orderVerification(order, image) {
  return (dispatch) => {
    const form = new FormData();

    if (Platform.OS === 'ios' && image.sourceURL) {
      form.append('payment_proof', {
        uri: image.sourceURL
      });
    }

    if (image.path) {
      form.append('payment_proof', {
        uri: image.path,
        type: image.mime,
        name: 'image.jpg'
      });
    }
    form.append('order_id', order);
    orderdetail
      .postPaymentProof(form)
      .then((response) => {
        dispatch(setPaymentProof(response.data.data.payment_proof));
        Toast.show(response.data.meta.message);
      })
      .catch((err) => {
        Toast.show('Sorry, something went wrong');
        console.log('ERROR', err);
      });
  };
}

export function getOrderDetail(orderId) {
  return (dispatch) => {
    dispatch(updateIsUpdatingOrder(true));

    orderdetail
      .get(orderId)
      .then((response) => {
        if (response.data.included.verification) {
          dispatch(setPaymentProof(response.data.included.verification.payment_proof));
        }
        dispatch({ type: SET_ORDER, data: response.data });
        dispatch(updateIsUpdatingOrder(false));
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
}

export function setUpdateOrderStatus(status) {
  return {
    type: UPDATE_ORDER_STATUS,
    status
  };
}

export function submitUpdateOrder(orders) {
  return (dispatch) => {
    // dispatch(updateIsUpdatingOrder(true));
    orders.forEach((item, i) => {
      if (orders[i] !== undefined) {
        getAccessToken()
          .then((token) => {
            DevSummitAxios.patch(
              `/api/v1/orders/${orders[i].order_id}/details/${orders[i].id}`,
              {
                count: orders[i].count
              },
              {
                headers: { Authorization: token }
              }
            )
              .then((response) => {})
              .catch((err) => {
                console.log(err.response);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
    // not working yet, need asynchronous loop
    // dispatch(updateIsUpdatingOrder(false));
    // dispatch({ type: RESET_STATE });
    dispatch(actions.getOrderList());
    Actions.pop();
  };
}

export function updateOrder(action, detaild) {
  return (dispatch, getState) => {
    const { data } = getState()
      .getIn([ 'orderDetail', 'order' ])
      .toJS();
    const ord = data.filter((item) => {
      return item.id === detaild;
    });
    const firstOrder = ord[0];
    if (action === 'increase') {
      if (firstOrder) {
        firstOrder.count += 1;
        dispatch({ type: UPDATE_ORDER, id: data.indexOf(firstOrder), payload: firstOrder });
      } else {
        const payload = { ticket_id: data.indexOf(ord), count: 1 };
        dispatch({ type: UPDATE_ORDER, id: data.indexOf(ord), payload });
      }
    }

    if (action === 'decrease') {
      if (firstOrder && firstOrder.count > 0) {
        firstOrder.count -= 1;
        dispatch({ type: UPDATE_ORDER, id: data.indexOf(firstOrder), payload: firstOrder });
      }
    }
  };
}

export function updateIsConfirmingPayment(status) {
  return {
    type: IS_CONFIRMING_PAYMENT,
    status
  };
}

export function confirmPayment(id) {
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
              payload: response.data.data
            });
          }
          dispatch(updateIsConfirmingPayment(false));
        })
        .catch((err) => {
          console.log('error here', err);
        });
    });
  };
}
