/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectMainReducer = () => state => state.get('orderList');

/**
 *  Selects the field data
 *  Returns object
 */
export const getOrders = () => createSelector(
  selectMainReducer(),
  state => state.get('orders').toJS()
);

export const getIsFetchingOrders = () => createSelector(
  selectMainReducer(),
  state => state.get('isFetchingOrders').toJS()
);
