import { DevSummitAxios, getAccessToken } from '../../helpers';

/*
 * import constants
 */
import {
  SET_TICKET_TYPE,
  UPDATE_ORDER,
  SET_ORDER
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

export function getOrderDetail(orderId) {
  return (dispatch, getState) => {
    getAccessToken().then((accessToken) => {
      DevSummitAxios.get(`/api/v1/orders/${orderId}/details`, {
        headers: { Authorization: accessToken }
      }).then((response) => {
        const order = {};
        console.log('response', response);
        response.data.data.forEach((item) => {
          order[item.ticket_id] = item;
        });

        dispatch({ type: SET_ORDER, data: order });
      }).catch((err) => { console.log(err.response); });
    }).catch((error) => {});
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
        const payload = { ticket_id: typeId, count: 1 };
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
