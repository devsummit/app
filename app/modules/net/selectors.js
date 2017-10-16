import { createSelector } from 'reselect';

const selectNetworkReducer = () => state => state.get('network');

export const isOnline = () => createSelector(
  selectNetworkReducer(),
  state => state.get('online')
);
