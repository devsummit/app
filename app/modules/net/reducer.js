import { fromJS } from 'immutable';

import {
  NETWORK_CHANGE,
} from './constants';

const initialState = fromJS({
  online: true,
});

function netReducer(state = initialState, action) {
  switch (action.type) {
    case NETWORK_CHANGE:
      return state.set('online', action.value);
    default:
      return state;
  }
}

export default netReducer;
