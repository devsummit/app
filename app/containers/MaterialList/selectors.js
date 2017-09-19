import { createSelector } from 'reselect';

const selectListMaterialReducer = () => state => state.get('materialList');

export const getListMaterial = () => createSelector(
  selectListMaterialReducer(),
  state => state.get('material')
);

export const getInputFields = () => createSelector(
  selectListMaterialReducer(),
  state => state.get('inputFields').toJS()
);

export const getModalStatus = () => createSelector(
  selectListMaterialReducer(),
  state => state.get('visible')                                                                   
);
