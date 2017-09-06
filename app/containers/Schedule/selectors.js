import { createSelector } from 'reselect';

const selectListScheduleReducer = () => state => state.get('scheduleList');

export const getListSchedule = () => createSelector(
  selectListScheduleReducer(),
  state => state.get('schedule')
);

