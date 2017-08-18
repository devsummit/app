import { createSelector } from 'reselect';


const selectListTicketReducer = () => state => state.get('ticketList');


export const getListTicket = () => createSelector(
  selectListTicketReducer(),
  state => state.get('userTicket')
);

export const getIsFetchingTicket = () => createSelector(
  selectListTicketReducer(),
  state => state.get('isFetchingUserTicket')
);

export const getFetchingUserTicketStatus = () => createSelector(
  selectListTicketReducer(),
  state => state.get('fetchingTicketStatus')
);
