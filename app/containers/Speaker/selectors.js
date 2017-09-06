import { createSelector } from 'reselect';

const selectListSpeakerReducer = () => state => state.get('speakerList');

export const getIsFetchingSpeaker = () => createSelector(
  selectListSpeakerReducer(),
  state => state.get('speaker')
);

export const getListSpeaker = () => createSelector(
  selectListSpeakerReducer(),
  state => state.get('speaker')
);

