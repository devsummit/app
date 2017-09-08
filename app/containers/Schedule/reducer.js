import { fromJS } from 'immutable';

import {
  FETCH_SCHEDULE_LIST
} from './constants';

const initialState = fromJS({
  schedule: []
});

function scheduleListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SCHEDULE_LIST:
      console.log(action.payloads,'STRING');
      return state.set('schedule', action.payloads);
    default:
      return state;
  }
}

export default scheduleListReducer;
