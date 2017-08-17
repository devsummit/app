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
