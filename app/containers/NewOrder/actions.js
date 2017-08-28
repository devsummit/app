import { Actions } from 'react-native-router-flux';
import { DevSummitAxios, getAccessToken } from '../../helpers';

/*
 * import constants
 */
import {
  SET_TICKET_TYPE,
  UPDATE_ORDER
} from './constants';

export function getTicketType() {
  return (dispatch) => {
    getAccessToken().then((accessToken) => {
      DevSummitAxios.get('/api/v1/tickets', {
        headers: { Authorization: accessToken }
      }).then((response) => {
        if (response && response.data && response.data.meta.success) {
          dispatch({
            type: SET_TICKET_TYPE,
            data: response.data.data
          });
        }
      })
        .catch((err) => { console.log('error', err); });
    });
  };
}

export function updateOrder(action, typeId) {
  return (dispatch, getState) => {
    const { ticketTypes, order } = getState().get('newOrder').toJS();
    const ticket = ticketTypes.filter((obj) => {
      return obj.id === typeId;
    })[0];

    if (action === 'increase') {
      if (order[typeId]) {
        order[typeId].count += 1;
        dispatch({ type: UPDATE_ORDER, id: typeId, payload: order[typeId] });
      } else {
        const payload = { ticket_id: typeId, count: 1, price: ticket.price };
        dispatch({ type: UPDATE_ORDER, id: typeId, payload });
      }
    }

    if (action === 'decrease') {
      if (order[typeId] && order[typeId].count > 0) {
        order[typeId].count -= 1;
        dispatch({ type: UPDATE_ORDER, id: typeId, payload: order[typeId] });
      }
    }
  };
}

export function placeOrder() {
  return (dispatch, getState) => {
    const { order } = getState().get('newOrder').toJS();
    const orderItems = Object.keys(order).map((key) => { return order[key]; });
    const data = { order_details: orderItems };

    getAccessToken().then((accessToken) => {
      DevSummitAxios.post('api/v1/orders', data, {
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.data && response.data.meta) {
          Actions.orderDetail({ orderId: response.data.data.id });
        }
      })
        .catch((err) => {});
    });
  }
}
