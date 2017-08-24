/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectMainReducer = () => state => state.get('orderList');

export const getOrders = () => createSelector(
  selectMainReducer(),
  state => state.get('orders').toJS()
);
