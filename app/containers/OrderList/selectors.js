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
export const getOrders = () =>
  createSelector(selectMainReducer(), state => state.get('orders').toJS());

export const getIsFetchingOrders = () =>
  createSelector(selectMainReducer(), state => state.get('isFetchingOrders'));

export const getIsConfirmingPayment = () =>
  createSelector(selectMainReducer(), state => state.get('isConfirmingPayment'));

export const getPendingOrders = () =>
  createSelector(selectMainReducer(), state => state.get('pendingOrder'));

export const getRedeemCode = () =>
  createSelector(selectMainReducer(), state => state.get('redeemCounter'));

export const getReedemStatus = () =>
  createSelector(selectMainReducer(), state => state.get('redeemStatus'));

export const getInputFields = () =>
  createSelector(selectMainReducer(), state => state.get('inputFields').toJS());

export const getIsConfirmEmail = () =>
  createSelector(selectMainReducer(), state => state.get('isConfirmEmail'));

export const getIsConfirmingEmail = ()  =>
  createSelector(selectMainReducer(), state => state.get('isConfirmingEmail'));
