import { createSelector } from 'reselect';

const selectListBoothReducer = () => state => state.get('boothList');

// const selectListHackatonReducer = () => state => state.get('hackatonList');

export const getListBooth = () => createSelector(
  selectListBoothReducer(),
  state => state.get('booth')
);

export const getIsFetchingBooths = () => createSelector(
  selectListBoothReducer(),
  state => state.get('isFetching')
);

export const getListHackaton = () => createSelector(
  selectListBoothReducer(),
  state => state.get('hackaton')
);

export const getIsFetchingHackatons = () => createSelector(
  selectListBoothReducer(),
  state => state.get('isFetching2')
);
