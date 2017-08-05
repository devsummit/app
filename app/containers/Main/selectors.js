/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectMainReducer = () => (state) => state.get('main');

/**
 *  Selects the username field data
 *  Returns object
 */
export const getFields = () => createSelector(
  selectMainReducer(),
  (state) => state.get('fields').toJS()
);

/**
 *  Get logged in status
 *  Returns boolean
 */
export const isLoggedIn = () => createSelector(
  selectMainReducer(),
  (state) => state.get('isLoggedIn')
);

