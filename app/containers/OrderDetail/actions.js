import { DevSummitAxios, getAccessToken } from '../../helpers';

/*
 * import constants
 */
import {
  SET_TICKET_TYPE,
  UPDATE_ORDER,
  SET_ORDER
} from './constants';

// get order detail

export function getOrderDetail(orderId) {
  return (dispatch, getState) => {
    getAccessToken().then((accessToken) => {
      DevSummitAxios.get(`/api/v1/orders/${orderId}/details`, {
        headers: { Authorization: accessToken }
      }).then((response) => {
        dispatch({ type: SET_ORDER, data: response.data.data });
      }).catch((err) => { console.log(err.response); });
    }).catch((error) => { });
  };
}

export function updateOrder(action, detaild) {
  return (dispatch, getState) => {
    const { order } = getState().get('orderDetail').toJS();
    const ord = order.filter((item) => {
      return item.id === detaild;
    })
    const firstOrder = ord[0]
    if (action === 'increase') {
      if (firstOrder) {
        firstOrder.count += 1;
        dispatch({ type: UPDATE_ORDER, id: order.indexOf(firstOrder), payload: firstOrder });
      } else {
        const payload = { ticket_id: order.indexOf(ord), count: 1 };
        dispatch({ type: UPDATE_ORDER, id: order.indexOf(ord), payload });
      }
    }

    if (action === 'decrease') {
      if (firstOrder && firstOrder.count > 0) {
        firstOrder.count -= 1;
        dispatch({ type: UPDATE_ORDER, id: order.indexOf(firstOrder), payload: firstOrder });
      }
    }
  };
}
