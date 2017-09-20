import { createSelector } from 'reselect';


export const selectFeedReducer = () => state => state.get('feed')


export const getIsFetchingFeeds = () => createSelector(
  selectFeedReducer(),
  state => state.get('isFetching')
);

export const getFetchFeeds = () => createSelector(
  selectFeedReducer(),
  state => state.get('feeds').toJS()
);

export const getIsPostingFeed = () => createSelector(
  selectFeedReducer(),
  state => state.get('isPosting')
);

export const getPostFeed = () => createSelector(
  selectFeedReducer(),
  state => state.get('postFeed').toJS()
);
