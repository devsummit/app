import { fromJS } from 'immutable';

/*
 * import contants
 */
import {
  SET_TICKET_TYPE,
  UPDATE_ORDER,
  SET_ORDER
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  ticketTypes: [],
  order: []
});

function orderDetailReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TICKET_TYPE:
      return state.set('ticketTypes', action.data);
    case SET_ORDER:
      return state.set('order', fromJS(action.data));
    case UPDATE_ORDER:
      console.log("STATTTEE", state.toJS())
      return state.setIn(['order', action.id ], fromJS(action.payload));
    default:
      return state;
  }
}

/*
 * export the reducer
 */
export default orderDetailReducer;
