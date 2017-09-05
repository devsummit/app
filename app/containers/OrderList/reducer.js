import { fromJS } from 'immutable';

/*
 * import contants
 */
import {
  SET_ORDER_LIST,
  IS_FETCHING_ORDERS,
  SET_CONFIRM_PAYMENT,
  IS_CONFIRMING_PAYMENT
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  orders: [],
  isFetchingOrders: false,
  isConfirmingPayment: false
});

function orderListReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER_LIST:
      return state.set('orders', fromJS(action.data));
    case IS_FETCHING_ORDERS:
      return state.set('isFetchingOrders', action.status);
    case SET_CONFIRM_PAYMENT:
      return state.setIn([ 'orders', action.idx, 'payment', 'transaction_status' ], action.payload.transaction_status);
    case IS_CONFIRMING_PAYMENT:
      return state.set('isConfirmingPayment', action.status);
    default:
      return state;
  }
}

/*
 * export the reducer
 */
export default orderListReducer;
