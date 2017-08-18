/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectChangePasswordReducer = () => (state) => state.get('changePassword');

/**
 *  Selects the username field data
 *  Returns object
 */
export const getInputFields = () => createSelector(
  selectChangePasswordReducer(),
  (state) => state.get('inputFields').toJS()
);

/**
 *  Selects the error checkeing field data
 *  Returns object
 */
export const getErrorFields = () => createSelector(
  selectChangePasswordReducer(),
  (state) => state.get('errorFields').toJS()
);

export const getIsPasswordUpdated = () => createSelector(
  selectChangePasswordReducer(),
  (state) =>  state.get('isPasswordUpdated')
);

export const getIsPasswordWrong = () => createSelector(
  selectChangePasswordReducer(),
  (state) => state.get('isPasswordWrong')
);
