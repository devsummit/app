import { fromJS } from 'immutable';

/*
 * import contants
 */
import {
  SET_TICKET_TYPE,
  UPDATE_ORDER,
  SET_ORDER,
  IS_UPDATING_ORDER,
  UPDATE_ORDER_STATUS,
  RESET_STATE
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  ticketTypes: [],
  order: [],
  isUpdatingOrder: false,
  updateOrderStatus: ''
});

function orderDetailReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TICKET_TYPE:
      return state.set('ticketTypes', action.data);
    case SET_ORDER:
      return state.set('order', fromJS(action.data));
    case UPDATE_ORDER:
      return state.setIn([ 'order', action.id ], fromJS(action.payload));
    case IS_UPDATING_ORDER:
      return state.set('isUpdatingOrder', action.status);
    case UPDATE_ORDER_STATUS:
      return state.set('updateOrderStatus', action.status);
    case RESET_STATE:
      state = initialState;
      return state;
    default:
      return state;
  }
}

/*
 * export the reducer
 */
export default orderDetailReducer;
