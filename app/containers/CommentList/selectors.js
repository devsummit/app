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

export const getIsFetchingMoreComments = () => createSelector(
  selectListCommentReducer(),
  state => state.get('isFetchingMore')
);

export const getNextLinks = () => createSelector(
  selectListCommentReducer(),
  state => state.get('links').toJS()
);

export const getCurrentPage = () => createSelector(
  selectListCommentReducer(),
  state => state.get('currentPage')
);

export const getIsSubmittingComment = () => createSelector(
  selectListCommentReducer(),
  state => state.get('isSubmitting')
);

export const getIsComments = () => createSelector(
  selectListCommentReducer(),
  state => state.get('text')
);
