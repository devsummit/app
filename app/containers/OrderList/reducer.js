import { fromJS } from 'immutable';

/*
 * import contants
 */
import {
  SET_ORDER_LIST
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  orders: []
});

function orderListReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER_LIST:
      return state.set('orders', fromJS(action.data));
    default:
      return state;
  }
}

/*
 * export the reducer
 */
export default orderListReducer;
