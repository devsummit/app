import {
  DevSummitAxios,
  getAccessToken,
  getProfileData,
  getRoleId
} from '../../helpers';
import { Alert, AsyncStorage } from 'react-native';

import local from '../../../config/local';
import { UPDATE_SINGLE_INPUT_FIELD } from './constants';

export function updateInputFields(field, value) {
  return {
    type: UPDATE_SINGLE_INPUT_FIELD,
    field,
    value
  };
}

export function updateDataStorage(res) {
  getProfileData()
    .then(() => {
      let data = JSON.stringify(res.data);
      data = '';
      AsyncStorage.removeItem('profile_data', () => {
        try {
          AsyncStorage.setItem('profile_data', data);
        } catch (e) {
          console.log('ERROR', e);
        }
      });
    });
  getRoleId()
    .then(() => {
      AsyncStorage.removeItem('role_id', () => {
        try {
          AsyncStorage.setItem('role_id', 3);
        } catch (e) {
          console.log('ERROR', e);
        }
      });
    });
}

export function placeRedeem() {
  return (dispatch, getState) => {
    const { inputFields } = getState().get('code').toJS();
    const { code } = inputFields;

    getAccessToken()
      .then((token) => {
        DevSummitAxios.patch('api/v1/redeemcodes', { code },
          { headers: { Authorization: token } })
          .then((res) => {
            updateDataStorage(res);
            console.log('RESOPSIKNMONK', res);
            Alert.alert('Information', res.data.meta.message);
          }).catch((error) => { console.log('ERROR', error) });
      });
  };
}
