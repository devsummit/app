import { Actions } from 'react-native-router-flux';
import { DevSummitAxios, getAccessToken } from '../../helpers';
import * as actions from '../OrderList/actions';

/*
 * import constants
 */
import {
  SET_TICKET_TYPE,
  UPDATE_ORDER,
  IS_GETTING_REFERAL,
  GET_REFERAL,
  UPDATE_SINGLE_ERROR_FIELD,
  UPDATE_SINGLE_INPUT_FIELD,
  RESET_STATE,
  IS_GET_TICKET_TYPE
} from './constants';

export function isGetTicketType(status) {
  return {
    type: IS_GET_TICKET_TYPE,
    status
  };
}

export function getTicketType() {
  return (dispatch) => {
    dispatch(isGetTicketType(true));
    getAccessToken().then((accessToken) => {
      DevSummitAxios.get('/api/v1/tickets', {
        headers: { Authorization: accessToken }
      }).then((response) => {
        if (response && response.data && response.data.meta.success) {
          dispatch({
            type: SET_TICKET_TYPE,
            data: response.data.data
          });
          dispatch(isGetTicketType(false));
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

export function placeOrder(redirect = () => {}) {
  return (dispatch, getState) => {
    const { order, inputFields, referal } = getState().get('newOrder').toJS();
    const orderItems = Object.keys(order).map((key) => { return order[key]; });
    let data = {};
    if (inputFields && inputFields.isUsingReferal === true && referal && referal.referal_code) {
      data = {
        order_details: orderItems,
        referal_code: referal.referal_code
      };
    } else {
      data = { order_details: orderItems };
    }

    getAccessToken().then((accessToken) => {
      DevSummitAxios.post('api/v1/orders', data, {
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.data && response.data.meta) {
          redirect({
            ...response.data.data,
            ...response.data.included[0]
          });
        }
      })
        .catch((err) => { console.log(err); });
    });
  };
}

export function updateInputFields(field, value) {
  return {
    type: UPDATE_SINGLE_INPUT_FIELD,
    field,
    value
  };
}

export function updateErrorFields(field, status) {
  return {
    type: UPDATE_SINGLE_ERROR_FIELD,
    field,
    status
  };
}

export function updateIsGettingReferal(status) {
  return {
    type: IS_GETTING_REFERAL,
    status
  };
}

export function reset() {
  return (dispatch) => {
    dispatch({ type: RESET_STATE });
    dispatch(getTicketType());
  };
}

export function GetReferal() {
  return (dispatch, getState) => {
    dispatch(updateIsGettingReferal(true));
    const { referalCode } = getState().getIn([ 'newOrder', 'inputFields' ]).toJS();
    getAccessToken().then((accessToken) => {
      DevSummitAxios.post('api/v1/referals/check', { referal_code: referalCode }, {
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.data && response.data.data) {
          dispatch({
            type: GET_REFERAL,
            payload: response.data
          });
        }
        dispatch(updateIsGettingReferal(false));
      }).catch((err) => {
        console.log(err);
        dispatch(updateIsGettingReferal(false));
      });
    });
  };
}
