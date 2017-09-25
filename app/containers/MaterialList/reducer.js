import { fromJS } from 'immutable';

import {
  FETCH_MATERIAL_LIST,
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_MODAL_STATUS,
  UPDATE_FLAG_MATERIAL,
  ADD_MATERIAL_ITEM,
  IS_FETCHING_MATERIAL,
  DELETE_MATERIAL_LIST
} from './constants';

const initialState = fromJS({
  material: [],
  isFetchingMaterial: false,
  visible: false,
  fields: {
    title: '',
    summary: '',
    file: null,
    is_used: 0
  }
});

function materialListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MATERIAL_LIST:
      return state.set('material', fromJS(action.payloads));
    case UPDATE_MODAL_STATUS:
      return state.set('visible', action.status);
    case ADD_MATERIAL_ITEM:
      return state.set('material', fromJS([action.data, ...state.get('material').toJS()]))
    case UPDATE_SINGLE_INPUT_FIELD:
      return state.setIn(['fields', action.field], action.value);
    case UPDATE_FLAG_MATERIAL:
      const newData = state.getIn(['material', action.key]).toJS();
      newData[action.field] = action.value;
      return state.setIn(['material', action.key], fromJS(newData));
    case IS_FETCHING_MATERIAL:
      return state.set('isFetchingMaterial', action.status);
    case DELETE_MATERIAL_LIST:
      return state.set('material', fromJS([ ...state.get('material').toJS().filter(item => item.id !== action.id)]) );
    default:
      return state;
  }
}

export default materialListReducer;
