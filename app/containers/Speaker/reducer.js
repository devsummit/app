import { fromJS } from 'immutable';

import {
  FETCH_SPEAKER_LIST
} from './constants';

const initialState = fromJS({
  speaker: []
});

function speakerListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SPEAKER_LIST:
      console.log(action.payloads,'STRING');
      return state.set('speaker', action.payloads);
    default:
      return state;
  }
}

export default speakerListReducer;
