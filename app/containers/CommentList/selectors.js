import { createSelector } from 'reselect';

const selectListCommentReducer = () => state => state.get('comments');

// const selectListHackatonReducer = () => state => state.get('hackatonList');

export const getListComments = () => createSelector(
  selectListCommentReducer(),
  state => state.get('comments').toJS()
);

export const getIsFetchingComments = () => createSelector(
  selectListCommentReducer(),
  state => state.get('isFetching')
);

export const getIsComments = () => createSelector(
  selectListCommentReducer(),
  state => state.get('text')
);

export const getIsSubmittingComments = () => createSelector(
  selectListCommentReducer(),
  state => state.get('isSubmitting')
);
