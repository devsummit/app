import { createSelector } from 'reselect';

const selectListBoothReducer = () => state => state.get('boothList');

export const getListBooth = () => createSelector(
  selectListBoothReducer(),
  state => state.get('booth')
);

export const getIsFetchingBooths = () => createSelector(
  selectListBoothReducer(),
  state => state.get('isFetching')
);
