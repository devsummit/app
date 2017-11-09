import { createSelector } from 'reselect';


export const selectregisterHackatonReducer = () => state => state.get('registerHackaton')


export const getIsRegistering = () => createSelector(
  selectregisterHackatonReducer(),
  state => state.get('isRegistering')
);
