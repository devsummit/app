import { AsyncStorage } from 'react-native';

import FormData from 'FormData';
import { DevSummitAxios, getAccessToken, getBoothData } from '../../helpers';
import {
  UPDATE_FIELD,
  UPDATE_BOOTH_PHOTO,
  UPDATE_IS_BOOTH_PHOTO_UPDATED
} from './constants';
import local from '../../../config/local';

export function updateFields(field, value) {
  return {
    type: UPDATE_FIELD,
    field,
    value
  };
}

export function updateBoothPhoto(value) {
  return {
    type: UPDATE_BOOTH_PHOTO,
    value
  };
}

export function updateIsBoothPhotoUpdated(status) {
  return {
    type: UPDATE_IS_BOOTH_PHOTO_UPDATED,
    status
  };
}

export function updateDataStorage(response) {
  getBoothData()
    .then(() => {
      console.log("objectRESSS", response.data);
      const newData = JSON.stringify(response.data);
      AsyncStorage.removeItem('booth_data', () => {
        try {
          AsyncStorage.setItem('booth_data', newData);
        } catch (e) {
          console.log('Error save data', e);
        }
      });
    });
}

export function updateImage(image) {
  return (dispatch, getState) => {
    const { boothPhoto } = getState().get('boothInfo').toJS();

    getAccessToken()
      .then((token) => {
        const url = local.API_BASE_URL.concat('/api/v1/booths/updatelogo');
        const form = new FormData();
        form.append('image_data', {
          uri: image.path,
          type: image.mime,
          name: 'image.jpg'
        });

        fetch(url, {
          method: 'PUT',
          headers: {
            Authorization: token
          },
          body: form
        })
          .then(response => response.json())
          .then((response) => {
            updateDataStorage(response);
            dispatch(updateBoothPhoto(response.data.logo_url));
            dispatch(updateIsBoothPhotoUpdated(true));
          }).catch(err => console.log('error upload image', err));
      });
  };
}
