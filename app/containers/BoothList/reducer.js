import { fromJS } from 'immutable';

import {
  FETCH_BOOTH_LIST,
  IS_FETCHING_BOOTHS
} from './constants';

const initialState = fromJS({
  booth: [],
  isFetching: false
});

function boothListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOTH_LIST:
      return state.set('booth', action.payloads);
    case IS_FETCHING_BOOTHS:
      return state.set('isFetching', action.status);
    default:
      return state;
  }
}

export default boothListReducer;
