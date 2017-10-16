/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectPaymentMethodReducer = () => state => state.get('methodPayment');

/**
 *  Selects the username field data
 *  Returns object
 */
export const getInputFields = () =>
  createSelector(selectPaymentMethodReducer(), state => state.get('inputFields').toJS());

/**
 *  Selects the error checkeing field data
 *  Returns object
 */
export const getErrorFields = () =>
  createSelector(selectPaymentMethodReducer(), state => state.get('errorFields').toJS());

export const isPayingWithPaypal = () =>
  createSelector(selectPaymentMethodReducer(), state => state.get('isPayingWithPaypal'));

export const getTicketTypes = () =>
  createSelector(selectPaymentMethodReducer(), state => state.get('ticketTypes').toJS());
