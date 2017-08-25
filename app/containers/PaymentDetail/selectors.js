/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectPaymentDetailReducer = () => state => state.get('detailPayment');

/**
 *  Selects the username field data
 *  Returns object
 */
export const getInputFields = () => createSelector(
  selectPaymentDetailReducer(),
  state => state.get('inputFields').toJS()
);

/**
 *  Selects the error checkeing field data
 *  Returns object
 */
export const getErrorFields = () => createSelector(
  selectPaymentDetailReducer(),
  state => state.get('errorFields').toJS()
);

export const getIsFetchingTransaction = () => createSelector(
  selectPaymentDetailReducer(),
  state => state.get('isFetchingTransaction')
);

export const getTransactionResponse = () => createSelector(
  selectPaymentDetailReducer(),
  state => state.get('transactionResponse')
);
