/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer from global reducer
 */
const selectMainReducer = () => state => state.get('settings');

/**
 *  Selects the username field data
 *  Returns object
 */
export const getFields = () => createSelector(
  selectMainReducer(),
  state => state.get('fields').toJS()
);

export const getIsProfileUpdated = () => createSelector(
  selectMainReducer(),
  state => state.get('isProfileUpdated')
);

export const getAvatar = () => createSelector(
  selectMainReducer(),
  state => state.get('avatar')
);

export const getIsAvatarUpdated = () => createSelector(
  selectMainReducer(),
  state => state.get('isAvatarUpdated')
);

export const getIsLoading = () => createSelector(
  selectMainReducer(),
  state => state.get('isLoading')
);

export const getIsLogOut = () => createSelector(
  selectMainReducer(),
  state => state.get('isLogOut')
);

export const getIsDisabled = () => createSelector(
  selectMainReducer(),
  state => state.get('isDisabled')
);

export const getFeedback = () => createSelector(
  selectMainReducer(),
  state => state.get('feedBack')
);

export const getIsFeedbackPosted = () => createSelector(
  selectMainReducer(),
  state => state.get('isFeedbackPosted')
);

export const getIsLoadingFeedback = () => createSelector(
  selectMainReducer(),
  state => state.get('isLoadingFeedback')
);

export const getModalVisible = () => createSelector(
  selectMainReducer(),
  state => state.get('modalVisible')
);
