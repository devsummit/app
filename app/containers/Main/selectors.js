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
 *  Get not registered status
 *  Returns boolean
 */
export const getIsNotRegistered = () => createSelector(
  selectMainReducer(),
  state => state.get('isNotRegistered')
);

/**
 *  Get is fetching status
 *  Returns boolean
 */
export const getIsFetching = () => createSelector(
  selectMainReducer(),
  state => state.get('isFetching')
);

/**
 *  Get profile data status
 *  Returns object
 */
export const getProfileData = () => createSelector(
  selectMainReducer(),
  state => state.get('profileData')
);

