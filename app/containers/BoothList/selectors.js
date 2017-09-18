import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectMainReducer = () => state => state.get('booth');

export const getAvatar = () => createSelector(
    selectMainReducer(),
    state => state.get('avatar')
  );