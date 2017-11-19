import { AsyncStorage } from 'react-native';

import FormData from 'FormData';
import { DevSummitAxios, getAccessToken, getBoothData, setVisitedRoomId } from '../../helpers';
import {
  UPDATE_FIELD,
  UPDATE_BOOTH_PHOTO,
  UPDATE_IS_BOOTH_PHOTO_UPDATED,
  UPDATE_IS_BOOTH_GALLERY_UPDATED,
  FETCH_BOOTH_INFO,
  UPDATE_BOOTH_GALLERY,
  CLEAR_BOOTH_GALLERY,
  UPDATE_MAIN_ROOM,
  UPDATE_FAB_VISIBLE
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

export function updateBoothGallery(value) {
  return {
    type: UPDATE_BOOTH_GALLERY,
    value
  };
}

export function updateIsBoothPhotoUpdated(status) {
  return {
    type: UPDATE_IS_BOOTH_PHOTO_UPDATED,
    status
  };
}

export function updateIsBoothGalleriesUpdated(status) {
  return {
    type: UPDATE_IS_BOOTH_GALLERY_UPDATED,
    status
  };
}

export function clearBoothGallery() {
  return {
    type: CLEAR_BOOTH_GALLERY
  };
}

export function updateDataStorage(response) {
  getBoothData()
    .then(() => {
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

export function fetchBoothInfo(id) {
  return (dispatch) => {
    getAccessToken()
      .then((token) => {
        const headers = { Authorization: token };
        DevSummitAxios.get('api/v1/booths/galleries/' + id, { headers })
          .then(async (response) => {
            await dispatch({
              type: FETCH_BOOTH_INFO,
              payloads: response.data
            });
          });
      });
    dispatch(clearBoothGallery());
  };
}

export function uploadBoothImage(image) {
  return (dispatch) => {
    dispatch(updateIsBoothGalleriesUpdated(false));
    getAccessToken()
      .then((token) => {
        const headers = { Authorization: token };
        const form = new FormData();

        form.append('image_files', {
          uri: image.path,
          type: image.mime,
          name: 'image.jpg'
        });

        DevSummitAxios.post('/api/v1/booths/galleries', form, { headers })
          .then((response) => {
            dispatch(updateBoothGallery(response.data.data[0]));
            // dispatch(updateIsBoothGalleriesUpdated(true));
            dispatch({
              type: UPDATE_IS_BOOTH_GALLERY_UPDATED,
              status: true
            })
          }).catch(err => console.log('error upload image', err));
      });
  };
}

export function updateImage(image) {
  return (dispatch) => {
    dispatch(updateIsBoothPhotoUpdated(false));
    getAccessToken()
      .then((token) => {

        const headers = { Authorization: token };
        const form = new FormData();

        form.append('image_data', {
          uri: image.path,
          type: image.mime,
          name: 'image.jpg'
        });

        DevSummitAxios.patch('/api/v1/booths/updatelogo', form, { headers })
          .then((response) => {
            updateDataStorage(response.data);
            dispatch(updateBoothPhoto(response.data.data.logo_url));
            dispatch(updateIsBoothPhotoUpdated(true));
          }).catch(err => console.log('error change booth logo', err));
      });
  };
}

export function updateMainRoom(payload) {
  console.log('updateMainRoom action', payload);
  return {
    type: UPDATE_MAIN_ROOM,
    payload
  };
}

export function updateFabVisible(payload) {
  return {
    type: UPDATE_FAB_VISIBLE,
    payload
  };
}

export const userVisitedThisBooth = async (roomId, fabVisible) => {
  return setVisitedRoomId(roomId);
};
