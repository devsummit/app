import { createSelector } from 'reselect';

const selectCodeRedeemReducer = () => state => state.get('code');

export const getInputFields = () => createSelector(
    selectCodeRedeemReducer(),
    state => state.get('inputFields').toJS()
);