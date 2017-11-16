import { fromJS } from 'immutable';

/*
 * import contants
 */
import {
  SET_ORDER_LIST,
  IS_FETCHING_ORDERS,
  SET_CONFIRM_PAYMENT,
  IS_CONFIRMING_PAYMENT,
  PENDING_ORDERS,
  REDEEM_COUNTER,
  UPDATE_SINGLE_INPUT_FIELD,
  IS_CONFIRM_EMAIL,
  FETCH_COMMUNITY,
  FETCH_TICKET,
  IS_FETCHING_TICKETS
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  orders: [],
  tickets: [],
  community: {},
  isFetchingOrders: false,
  isFetchingTicket: false,
  isConfirmingPayment: false,
  pendingOrder: 0,
  redeemCounter: 0,
  inputFields: {
    email: ''
  },
  isConfirmEmail: false
});

function orderListReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SINGLE_INPUT_FIELD:
      return state.setIn([ 'inputFields', action.field ], action.value);
    case SET_ORDER_LIST:
      return state.set('orders', fromJS(action.data));
    case IS_FETCHING_ORDERS:
      return state.set('isFetchingOrders', action.status);
    case SET_CONFIRM_PAYMENT:
      return state.setIn(
        [ 'orders', action.idx, 'payment', 'transaction_status' ],
        action.payload.transaction_status
      );
    case IS_CONFIRMING_PAYMENT:
      return state.set('isConfirmingPayment', action.status);
    case PENDING_ORDERS:
      return state.set('pendingOrder', action.value);
    case REDEEM_COUNTER:
      return state.set('redeemCounter', action.value);
    case IS_CONFIRM_EMAIL:
      return state.set('isConfirmEmail', action.status);
    case FETCH_COMMUNITY:
      return state.set('community', action.payloads);
    case FETCH_TICKET:
      return state.set('tickets', fromJS(action.data));
    case IS_FETCHING_TICKETS:
      return state.set('isFetchingTicket', action.status);
    default:
      return state;
  }
}

/*
 * export the reducer
 */
export default orderListReducer;
