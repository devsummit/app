import { createSelector } from 'reselect';

const selectMainReducer = () => state => state.get('boothInfo');

export const getFields = () => createSelector(
  selectMainReducer(),
  state => state.get('fields').toJS()
);

export const getIsBoothPhotoUpdated = () => createSelector(
  selectMainReducer(),
  state => state.get('isBoothPhotoUpdated')
);

export const getBoothPhoto = () => createSelector(
  selectMainReducer(),
  state => state.get('boothPhoto')
);
