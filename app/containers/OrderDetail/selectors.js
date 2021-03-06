/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectMainReducer = () => state => state.get('orderDetail');

export const getTicketTypes = () =>
  createSelector(selectMainReducer(), state => state.get('ticketTypes').toJS());

export const getOrder = () =>
  createSelector(selectMainReducer(), state => state.get('order').toJS());

export const getIsUpdatingOrder = () =>
  createSelector(selectMainReducer(), state => state.get('isUpdatingOrder'));

export const getUpdateOrderStatus = () =>
  createSelector(selectMainReducer(), state => state.get('updateOrderStatus'));

export const getIsConfirmingPayment = () =>
  createSelector(selectMainReducer(), state => state.get('isConfirmingPayment'));

export const getPaymentProof = () =>
  createSelector(selectMainReducer(), state => state.get('imageUrl'));

export const getOrderId = () =>
  createSelector(selectMainReducer(), state => state.get('orderId'));

export const getUploadProgress = () =>
  createSelector(selectMainReducer(), state => state.get('uploadProgress'));
