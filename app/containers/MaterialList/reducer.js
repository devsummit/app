import { fromJS } from 'immutable';

import {
  FETCH_MATERIAL_LIST,
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_MODAL_STATUS,
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
    file: null
  }
});

function materialListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MATERIAL_LIST:
      return state.set('material', action.payloads);
    case UPDATE_MODAL_STATUS:
      return state.set('visible', action.status);
    case ADD_MATERIAL_ITEM:
      return state.set('material', action.material)
    case UPDATE_SINGLE_INPUT_FIELD:
      return state.setIn(['fields', action.field], action.value);
    case IS_FETCHING_MATERIAL:
      return state.set('isFetchingMaterial', action.status);
    case DELETE_MATERIAL_LIST:
      return state.set('deleteMaterialList', action);
    default:
      return state;
  }
}

export default materialListReducer;
