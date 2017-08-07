import {
	DevSummitAxios
} from '../../helpers'

/*
 * import constants 
 */

import {
	UPDATE_SINGLE_INPUT_FIELD,
	UPDATE_SINGLE_ERROR_FIELD,
} from './constants'


/*
 * Update the input fields
 * @param {field: name of the field}
 * @param {value: value to be set}
 */
export function updateInputFields(field, value) {
	return {
		type: UPDATE_SINGLE_INPUT_FIELD,
		field,
		value
	}
}


/*
 * Update the error of input fields
 * @param {field: name of the field}
 * @param {value: value to be set}
 */
export function updateErrorFields(field, value) {
	return {
		type: UPDATE_SINGLE_ERROR_FIELD,
		field,
		value
	}
}
