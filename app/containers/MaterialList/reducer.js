import { fromJS } from 'immutable';

import {
  FETCH_MATERIAL_LIST,
  UPDATE_SINGLE_INPUT_FIELD
} from './constants';

const initialState = fromJS({
  material: [],
  fields: {
    title: '',
    summary: '',
    file: null
  }
});

function materialListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MATERIAL_LIST:
      return state.set('material', action.payloads);
    case UPDATE_SINGLE_INPUT_FIELD:
      return state.setIn([ 'fields', action.field ], action.value);
    default:
      return state;
  }
}

export default materialListReducer;
