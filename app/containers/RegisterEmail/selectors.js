/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectRegisterReducer = () => state => state.get('registerEmail');

/**
 *  Selects the username field data
 *  Returns object
 */
export const getInputFields = () =>
  createSelector(selectRegisterReducer(), state => state.get('inputFields').toJS());

/**
 *  Selects the error checkeing field data
 *  Returns object
 */
export const getErrorFields = () =>
  createSelector(selectRegisterReducer(), state => state.get('errorFields').toJS());

/**
 *  get the isRegistering status
 *  Returns boolean value
 */
export const getIsRegistering = () =>
  createSelector(selectRegisterReducer(), state => state.get('isRegistering'));

/**
 *  get the register method
 *  Returns string value
 */
export const getRegisterMethod = () =>
  createSelector(selectRegisterReducer(), state => state.get('registerMethod'));

/**
 *  get the register status
 *  Returns boolean value
 */
<<<<<<< HEAD
export const getRegisterStatus = () =>
  createSelector(selectRegisterReducer(), state => state.get('isRegistered').toJS());

export const getIsLoggedIn = () =>
  createSelector(selectRegisterReducer(), state => state.get('isLoggedIn'));
=======
export const getRegisterStatus = () => createSelector(
  selectRegisterReducer(),
  state => state.get('isRegistered').toJS()
);

export const getIsLoggedIn = () => createSelector(
  selectRegisterReducer(),
  state => state.get('isLoggedIn')
);
>>>>>>> add selector
