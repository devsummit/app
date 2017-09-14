import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

import {
  FETCH_MATERIAL_LIST,
  UPDATE_SINGLE_INPUT_FIELD
} from './constants';

/* 
 * Get speaker data
*/

export function updateInputFields(field, value) {
  return {
    type: UPDATE_SINGLE_INPUT_FIELD,
    field,
    value
  };
}

export function fetchMaterialList() {
  return (dispatch) => {
    getAccessToken()
      .then((token) => {
        const headers = { Authorization: token };
        DevSummitAxios.get('api/v1/documents', { headers })
          .then((response) => {
            dispatch({
              type: FETCH_MATERIAL_LIST,
              payloads: response.data.data
            });
          });
      });
  };
}

export function saveMaterialList() {
  return (dispatch, getState) => {
    const { inputFields } = getState().get('materialList').toJS();

    const {
      title,
      summary,
      file
    } = inputFields || null;

    DevSummitAxios.post('api/v1/documents', {
      title, summary
    }).catch((error) => {
      console.log(error, 'error caught');
      });
  };
}