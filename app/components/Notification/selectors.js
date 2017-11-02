/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectMainReducer = () => state => state.get('notificationList');


export const getNotification = () => createSelector(
  selectMainReducer(),
  state => state.get('setNotification').toJS()
);

export const getIsFetchingNotification = () => createSelector(
  selectMainReducer(),
  state => state.get('isFetchingNotification')
);

