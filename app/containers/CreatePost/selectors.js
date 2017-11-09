import { createSelector } from 'reselect';


export const selectCreatePostReducer = () => state => state.get('createPost')

export const getIsPostingFeed = () => createSelector(
  selectCreatePostReducer(),
  state => state.get('isPosting')
);

export const getUpdateImage = () => createSelector(
  selectCreatePostReducer(),
  state => state.get('image').toJS()
);

export const getUpdateText = () => createSelector(
  selectCreatePostReducer(),
  state => state.get('message')
);
