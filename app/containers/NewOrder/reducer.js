import { fromJS } from 'immutable';

/*
 * import contants
 */
import {
  SET_TICKET_TYPE,
  UPDATE_ORDER,
  IS_UPDATING_ORDER
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  ticketTypes: [],
  order: {},
  isUpdatingOrder: false
});

function newOrderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TICKET_TYPE:
      return state.set('ticketTypes', action.data);
    case UPDATE_ORDER:
      return state.setIn([ 'order', action.id ], fromJS(action.payload));
    case IS_UPDATING_ORDER:
      return state.set('isUpdatingOrder', action.status);
    default:
      return state;
  }
}

/*
 * export the reducer
 */
export default newOrderReducer;
