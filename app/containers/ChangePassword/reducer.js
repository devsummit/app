/*
 * import contants 
 */

import {
	UPDATE_SINGLE_INPUT_FIELD,
	UPDATE_SINGLE_ERROR_FIELD,
} from './constants'

import { fromJS } from 'immutable'


/*
 * initial state of reducers
 */
const initialState = fromJS({
	inputFields: {
		current_password: '', 
		new_password: '', 
		confirm_password: ''
	},
	errorFields: {
		error_current_password: false,
		error_new_password: false,
		error_confirm_password: false,
		error_password_not_the_same: false
	},
});

function changePasswordReducer(state=initialState, action) {
	switch(action.type) {

		case UPDATE_SINGLE_INPUT_FIELD:
			return state.setIn(['inputFields', action.field], action.value);

		case UPDATE_SINGLE_ERROR_FIELD:
			return state.setIn(['errorFields', action.field], action.value);

		default:
			return state;
	}
}

/*
 * export the reducer
 */

export default changePasswordReducer;