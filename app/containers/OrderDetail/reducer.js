import { fromJS } from 'immutable';

/*
 * import contants
 */
import {
  SET_TICKET_TYPE,
  UPDATE_ORDER,
  UPDATE_UPLOAD_PROGRESS,
  SET_ORDER,
  IS_UPDATING_ORDER,
  UPDATE_ORDER_STATUS,
  RESET_STATE,
  SET_CONFIRM_PAYMENT,
  IS_CONFIRMING_PAYMENT,
  SET_PAYMENT_PROOF,
  SET_ORDER_ID
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  ticketTypes: [],
  order: {},
  uploadProgress: 0,
  isUpdatingOrder: false,
  updateOrderStatus: '',
  isConfirmingPayment: false,
  imageUrl: '',
  orderId: ''
});

function orderDetailReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDER_ID:
      return state.set('orderId', action.value);
    case UPDATE_UPLOAD_PROGRESS:
      return state.set('uploadProgress', action.progress);
    case SET_TICKET_TYPE:
      return state.set('ticketTypes', fromJS(action.data));
    case SET_ORDER:
      return state.set('order', fromJS(action.data));
    case UPDATE_ORDER:
      return state.setIn([ 'order', 'data', action.id ], fromJS(action.payload));
    case IS_UPDATING_ORDER:
      return state.set('isUpdatingOrder', action.status);
    case UPDATE_ORDER_STATUS:
      return state.set('updateOrderStatus', action.status);
    case SET_CONFIRM_PAYMENT:
      return state.setIn(
        [ 'order', 0, 'payment', 'transaction_status' ],
        action.payload.transaction_status
      );
    case IS_CONFIRMING_PAYMENT:
      return state.set('isConfirmingPayment', action.status);
    case SET_PAYMENT_PROOF:
      return state.set('imageUrl', action.value);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

/*
 * export the reducer
 */
export default orderDetailReducer;
