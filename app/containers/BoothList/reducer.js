import { fromJS } from 'immutable';

import {
  FETCH_BOOTH_LIST
} from './constants';

const initialState = fromJS({
  booth: []
});

function boothListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOTH_LIST:
      return state.set('booth', action.payloads);
    default:
      return state;
  }
}

export default boothListReducer;
