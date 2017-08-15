/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectRegisterMenuReducer = () => state => state.get('registerMenu');

/**
 *  Get logged in status
 *  Returns boolean
 */
export const isRegistered = () => createSelector(
  selectRegisterMenuReducer(),
  state => state.get('isRegistered')
);
