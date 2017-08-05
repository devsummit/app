/*
 * import contants 
 */

import {
	UPDATE_SINGLE_INPUT_FIELD,
	UPDATE_SINGLE_ERROR_FIELD,
	UPDATE_REGISTER_METHOD,
	UPDATE_REGISTER_STATUS,
} from './constants'

import { fromJS } from 'immutable'


/*
 * initial state of reducers
 */
const initialState = fromJS({
	inputFields: {},
	errorFields: {
		error_first_name: true,
		error_last_name: true,
		error_username: true,
		error_email: true,
		error_password: true,
	},
	registerMethod: 'undefined',
	isRegistering: false,
	isRegistered: false,
});

function registerReducer(state=initialState, action) {
	switch(action.type) {

		case UPDATE_SINGLE_INPUT_FIELD:
			return state.setIn(['inputFields', action.field], action.value);

		case UPDATE_SINGLE_ERROR_FIELD:
			return state.setIn(['errorFields', action.field], action.value);

		case UPDATE_REGISTER_METHOD:
			return state.set('registerMethod', action.payload);

		case UPDATE_REGISTER_STATUS:
			return state.set('isRegistered', action.status);

		default:
			return state;
	}
}

/*
 * export the reducer
 */

export default registerReducer;