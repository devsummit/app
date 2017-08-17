import { createSelector } from 'reselect';


const selectAttendeesReducer = () => state => state.get('attendeesList');


export const getAttendees = () => createSelector(
  selectAttendeesReducer(),
  state => state.get('attendees')
);

export const getIsTransferring = () => createSelector(
  selectAttendeesReducer(),
  state => state.get('isTransferringTicket')
);
