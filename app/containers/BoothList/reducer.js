import { fromJS } from 'immutable';

import {
  FETCH_BOOTH_LIST,
  IS_FETCHING_BOOTHS,
  FETCH_HACKATON_LIST,
  IS_FETCHING_HACKATONS
} from './constants';

const initialState = fromJS({
  booth: [],
  isFetching: false,
  hackaton: [],
  isFetching2: false
});

function boothListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOTH_LIST:
      return state.set('booth', action.payloads);
    case IS_FETCHING_BOOTHS:
      return state.set('isFetching', action.status);
    case FETCH_HACKATON_LIST:
      return state.set('hackaton', action.payloads);
    case IS_FETCHING_HACKATONS:
      return state.set('isFetching2', action.status);
    default:
      return state;
  }
}

export default boothListReducer;
