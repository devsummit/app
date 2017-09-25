import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

import local from '../../../config/local';
import {
  FETCH_MATERIAL_LIST,
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_MODAL_STATUS,
  ADD_MATERIAL_ITEM,
  UPDATE_FLAG_MATERIAL,
  IS_FETCHING_MATERIAL,
  DELETE_MATERIAL_LIST
} from './constants';

export function updateInputFields(field, value) {
  return {
    type: UPDATE_SINGLE_INPUT_FIELD,
    field,
    value
  };
}

export function addMaterialItem(data) {
  return {
    type: ADD_MATERIAL_ITEM,
    data
  };
}

export function updateModalStatus(status) {
  return {
    type: UPDATE_MODAL_STATUS,
    status
  };
}

export function updateFlagMaterial(key, field, value) {
  return {
    type: UPDATE_FLAG_MATERIAL,
    key,
    field,
    value
  };
}

export function isFetchingMaterial(status) {
  return {
    type: IS_FETCHING_MATERIAL,
    status
  };
}

export function fetchMaterialList() {
  return (dispatch) => {
    dispatch(isFetchingMaterial(true));
    getAccessToken()
      .then((token) => {
        const headers = { Authorization: token };
        DevSummitAxios.get('api/v1/documents', { headers })
          .then((response) => {
            dispatch({
              type: FETCH_MATERIAL_LIST,
              payloads: response.data.data
            });
            dispatch(isFetchingMaterial(false));
          })
          .catch((err) => {
            // maybe we can put toast here later
          });
      });
  };
}

export function updateStatus(data, key) {
  return (dispatch) => {

    getAccessToken()
      .then((token) => {
        DevSummitAxios.patch(`/api/v1/documents/${data.id}`, {
          title: data.title,
          summary: data.summary,
          is_used: !data.is_used
        }, {
          headers: {
            Authorization: token
          }
        }).then((response) => {
          if (response && response.data && response.data.meta.success) {
            dispatch(updateFlagMaterial(key, 'is_used', response.data.data.is_used));
          }
        }).catch((error) => { console.log(error); });
      });
  };
}

export function saveMaterialList(data) {
  return (dispatch, getState) => {

    getAccessToken()
      .then((token) => {
        // @TODO We need to change into dev-summit url
        const url = local.API_BASE_URL.concat('/api/v1/documents');
        const form = new FormData();

        form.append('title', data.title);
        form.append('summary', data.summary);
        form.append('document_data', {
          uri: data.file.uri,
          type: data.file.type,
          name: data.file.fileName
        });

        fetch(url, { method: 'POST', headers: { Authorization: token }, body: form })
          .then(resp => resp.json())
          .then((resp) => {

            dispatch(addMaterialItem(resp.data));

          }).catch((err) => {

              console.log(err);

          });
      });
  };
}

export function deleteMaterialList(id) {

  return (dispatch) => {
    getAccessToken()
      .then((token) => {

        const headers = { Authorization: token };

        dispatch({ type: DELETE_MATERIAL_LIST, id });

        DevSummitAxios.delete(`api/v1/documents/${id}`, { headers })
          .then((response) => {

          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
}
