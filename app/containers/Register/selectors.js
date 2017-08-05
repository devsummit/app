/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectRegisterReducer = () => (state) => state.get('register');

/**
 *  Selects the username field data
 *  Returns object
 */
export const getInputFields = () => createSelector(
  selectRegisterReducer(),
  (state) => state.get('inputFields').toJS()
);

/**
 *  Selects the error checkeing field data
 *  Returns object
 */
export const getErrorFields = () => createSelector(
  selectRegisterReducer(),
  (state) => state.get('errorFields').toJS()
);

/**
 *  get the isRegistering status
 *  Returns boolean value
 */
export const getIsRegistering = () => createSelector(
  selectRegisterReducer(),
  (state) => state.get('isRegistering')
);

/**
 *  get the register method
 *  Returns string value
 */
export const getRegisterMethod = () => createSelector(
  selectRegisterReducer(),
  (state) => state.get('registerMethod')
);
