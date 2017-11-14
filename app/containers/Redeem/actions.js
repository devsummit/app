import Toast from 'react-native-simple-toast';
import { Alert, AsyncStorage } from 'react-native';
import {
  DevSummitAxios,
  getAccessToken,
  getProfileData,
  getBoothData,
  getRoleId
} from '../../helpers';

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
  getBoothData().then(() => {
    const data = JSON.stringify(res.data.included);
    AsyncStorage.removeItem('booth_data', () => {
      try {
        AsyncStorage.setItem('booth_data', data);
        if (res.data.included.role_id === 3) {
          Toast.show('Congratulation for becoming Booth');
        } else if (res.data.included.role_id === 8) {
          Toast.show('Congratulation for becoming Partner');
        }
      } catch (e) {
        console.log('ERROR', e);
      }
    });
  });
  getRoleId().then(() => {
    const id = JSON.stringify(res.data.included.role_id);
    AsyncStorage.removeItem('role_id', () => {
      try {
        AsyncStorage.setItem('role_id', id);
      } catch (e) {
        console.log('ERROR', e);
      }
    });
  });
}

export function placeRedeem(closeRedeemModal) {
  return (dispatch, getState) => {
    const { inputFields } = getState()
      .get('code')
      .toJS();
    const { code } = inputFields;

    getAccessToken().then((token) => {
      DevSummitAxios.patch('api/v1/redeemcodes', { code }, { headers: { Authorization: token } })
        .then((res) => {
          if (res.data.included.role_id === 3 || res.data.included.role_id === 8) {
            updateDataStorage(res);
          }
          Toast.show('Information', res.data.meta.message);
          closeRedeemModal();
        })
        .catch((error) => {
          Toast.show('Information', error.message);
          closeRedeemModal();
        });
    });
  };
}
