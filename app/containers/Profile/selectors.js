/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectMainReducer = () => state => state.get('profile');

/**
 *  Selects the username field data
 *  Returns object
 */
export const getFields = () => createSelector(
  selectMainReducer(),
  state => state.get('fields').toJS()
);

export const getIsProfileUpdated = () => createSelector(
  selectMainReducer(),
  state => state.get('isProfileUpdated')
);

export const getIsLogOut = () => createSelector(
  selectMainReducer(),
  state => state.get('isLogOut')
);
