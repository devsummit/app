/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectMainReducer = () => state => state.get('profile');

/**
 *  Selects the username field data
 *  Returns object
 */
export const getFields = () => createSelector(
  selectMainReducer(),
  state => state.get('fields').toJS()
);

export const getHaveRefered = () => createSelector(
  selectMainReducer(),
  state => state.get('haveRefered')
)

export const getReferal = () => createSelector(
  selectMainReducer(),
  state => state.get('codeReferal')
);

export const getIsCodeUpdated = () => createSelector(
  selectMainReducer(),
  state => state.get('isCodeUpdated')
)

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

export const getIsLogOut = () => createSelector(
  selectMainReducer(),
  state => state.get('isLogOut')
);

export const getIsDisabled = () => createSelector(
  selectMainReducer(),
  state => state.get('isDisabled')
);
