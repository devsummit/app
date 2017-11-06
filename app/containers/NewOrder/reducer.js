import { fromJS } from 'immutable';

/*
 * import contants
 */
import {
  SET_TICKET_TYPE,
  UPDATE_ORDER,
  IS_UPDATING_ORDER,
  GET_REFERAL,
  IS_GETTING_REFERAL,
  UPDATE_SINGLE_ERROR_FIELD,
  UPDATE_SINGLE_INPUT_FIELD,
  RESET_STATE,
  IS_GET_TICKET_TYPE
} from './constants';

/*
 * initial state of reducers
 */
const initialState = fromJS({
  ticketTypes: [],
  order: {},
  referal: {
    data: '',
    meta: ''
  },
  isGettingReferal: false,
  isUpdatingOrder: false,
  isGetTicketType: false,
  inputFields: {
    referalCode: '',
    isUsingReferal: false
  },
  errorFields: {
    referalCode: false
  }
});

function newOrderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TICKET_TYPE:
      return state.set('ticketTypes', action.data);
    case UPDATE_ORDER:
      return state.setIn([ 'order', action.id ], fromJS(action.payload));
    case IS_UPDATING_ORDER:
      return state.set('isUpdatingOrder', action.status);
    case GET_REFERAL:
      return state.set('referal', fromJS(action.payload));
    case IS_GETTING_REFERAL:
      return state.set('isGettingReferal', action.status);
    case UPDATE_SINGLE_ERROR_FIELD:
      return state.setIn([ 'errorFields', action.field ], action.status);
    case UPDATE_SINGLE_INPUT_FIELD:
      return state.setIn([ 'inputFields', action.field ], action.value);
    case IS_GET_TICKET_TYPE:
      return state.set('isGetTicketType', action.status);
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
}

/*
 * export the reducer
 */
export default newOrderReducer;
