/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectMainReducer = () => state => state.get('newOrder');


export const getTicketTypes = () => createSelector(
  selectMainReducer(),
  state => state.get('ticketTypes')
);

export const isGetTicketType = () => createSelector(
  selectMainReducer(),
  state => state.get('isGetTicketType')
);

export const getOrder = () => createSelector(
  selectMainReducer(),
  state => state.get('order').toJS()
);

export const getIsUpdatingOrder = () => createSelector(
  selectMainReducer(),
  state => state.get('isUpdatingOrder')
);

export const getReferal = () => createSelector(
  selectMainReducer(),
  state => state.get('referal').toJS()
);

export const getIsGettingReferal = () => createSelector(
  selectMainReducer(),
  state => state.get('isGettingReferal')
);

/**
 *  Selects the field data
 *  Returns object
 */
export const getInputFields = () => createSelector(
  selectMainReducer(),
  state => state.get('inputFields').toJS()
);

/**
 *  Selects the error checkeing field data
 *  Returns object
 */
export const getErrorFields = () => createSelector(
  selectMainReducer(),
  state => state.get('errorFields').toJS()
);
