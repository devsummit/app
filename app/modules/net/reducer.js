import { fromJS } from 'immutable';

import {
  NETWORK_CHANGE,
  NETWORK_STATUS_CHANGE
} from './constants';

const initialState = fromJS({
  online: true,
  connection: 'wifi'
});

function netReducer(state = initialState, action) {
  switch (action.type) {
    case NETWORK_STATUS_CHANGE:
      return state.set('online', action.value);
    case NETWORK_CHANGE:
      return state.set('connection', action.value);
    default:
      return state;
  }
}

export default netReducer;
