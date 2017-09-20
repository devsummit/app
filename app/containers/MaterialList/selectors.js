import { createSelector } from 'reselect';

const selectListMaterialReducer = () => state => state.get('materialList');

export const getListMaterial = () => createSelector(
  selectListMaterialReducer(),
  state => state.get('material').toJS()
);

export const getInputFields = () => createSelector(
  selectListMaterialReducer(),
  state => state.get('fields').toJS()
);

export const getModalStatus = () => createSelector(
  selectListMaterialReducer(),
  state => state.get('visible')
);

export const getIsFetchingMaterial = () => createSelector(
  selectListMaterialReducer(),
  state => state.get('isFetchingMaterial')
);

