/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectMainReducer = () => state => state.get('main');

/**
 *  Selects the username field data
 *  Returns object
 */
export const getFields = () => createSelector(
  selectMainReducer(),
  state => state.get('fields').toJS()
);

/**
 *  Get logged in status
 *  Returns boolean
 */
export const getIsLoggedIn = () => createSelector(
  selectMainReducer(),
  state => state.get('isLoggedIn')
);

/**
 *  Get subscribed status
 *  Returns boolean
 */
export const getIsSubscribed = () => createSelector(
  selectMainReducer(),
  state => state.get('isSubscribed')
);

/**
 *  Get is loading status
 *  Returns boolean
 */
export const getIsLoading = () => createSelector(
  selectMainReducer(),
  state => state.get('isLoading')
);
