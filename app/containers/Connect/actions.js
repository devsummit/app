import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

import local from '../../../config/local';
import {
  FETCH_MATERIAL_LIST,
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_MODAL_STATUS
} from './constants';

export function updateInputFields(field, value) {
  return {
    type: UPDATE_SINGLE_INPUT_FIELD,
    field,
    value
  };
}

export function updateModalStatus(status) {
  return {
    type: UPDATE_MODAL_STATUS,
    status
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

export function saveMaterialList(image) {
  return (dispatch, getState) => {
    const { fields } = getState().get('materialList').toJS();
    const {
      title,
      summary,
      file
    } = fields || null;
    getAccessToken()
      .then((token) => {
        // @TODO We need to change into dev-summit url
        const url = local.API_BASE_URL.concat('api/v1/documents');
        const form = new FormData();

        form.append('title', title);
        form.append('summary', summary);
        form.append('document_data', {
          uri: file.uri,
          type: file.type,
          name: file.fileName
        });

        fetch(url, {
          method: 'POST',
          headers: {
            Authorization: token
          },
          body: form
        })
          .then(resp => resp.json())
          .then((resp) => {
            dispatch(updateModalStatus(false));
          }).catch(err => console.log(err));
      });
  };
}
