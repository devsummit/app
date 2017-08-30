import { fromJS } from 'immutable';

/*
 * import contants
 */
import {
  SET_ORDER_LIST,
  IS_FETCHING_ORDERS
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  orders: [],
  isFetchingOrders: false
});

function orderListReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER_LIST:
      return state.set('orders', fromJS(action.data));
    case IS_FETCHING_ORDERS:
      return state.set('isFetchingOrders', action.status);
    default:
      return state;
  }
}

/*
 * export the reducer
 */
export default orderListReducer;
