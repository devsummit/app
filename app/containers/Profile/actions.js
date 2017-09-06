import { AsyncStorage } from 'react-native';

import FormData from 'FormData';
import { DevSummitAxios, getAccessToken, getProfileData } from '../../helpers';
import {
  UPDATE_SINGLE_FIELD,
  UPDATE_IS_PROFILE_UPDATED,
  UPDATE_AVATAR,
  UPDATE_IS_AVATAR_UPDATED,
  UPDATE_IS_LOG_OUT,
  UPDATE_IS_DISABLED
} from './constants';


/*
 * Update the input fields
 * @param {field: name of the field}
 * @param {value: value to be set}
 */
export function updateFields(field, value) {
  return {
    type: UPDATE_SINGLE_FIELD,
    field,
    value
  };
}

export function updateIsProfileUpdated(status) {
  return {
    type: UPDATE_IS_PROFILE_UPDATED,
    status
  };
}

export function updateAvatar(value) {
  return {
    type: UPDATE_AVATAR,
    value
  };
}

export function updateIsAvatarUpdated(status) {
  return {
    type: UPDATE_IS_AVATAR_UPDATED,
    status
  };
}

export function updateIsLogOut(status) {
  return {
    type: UPDATE_IS_LOG_OUT,
    status
  };
}

export function updateIsDisabled(status) {
  return {
    type: UPDATE_IS_DISABLED,
    status
  };
}

export function changeProfile() {
  return (dispatch, getState) => {
    const { fields } = getState().get('profile').toJS();
    const { username, firstName, lastName, profilePic } = fields;

    getAccessToken()
      .then((token) => {
        DevSummitAxios.patch('/auth/me/changesetting', {
          first_name: firstName,
          last_name: lastName
        }, {
          headers: {
            Authorization: token
          }
        }).then((response) => {
          if (response && response.data && response.data.meta.success) {
            dispatch(updateIsProfileUpdated(true));
          }
        }).catch((error) => { console.log(error); });
      });
  };
}

export function updateDataStorage(resp) {
  getProfileData()
    .then((data) => {
      const datas = data;
      datas.photos[0].url = resp.data.url;

      AsyncStorage.setItem('profile_data', JSON.stringify(data));
    });
}

export function updateImage(image) {
  return (dispatch, getState) => {
    const { avatar } = getState().get('profile').toJS();

    getAccessToken()
      .then((token) => {
        // @TODO We need to change into dev-summit url
        const url = 'http://10.0.2.2:5000/api/v1/user/photo';
        const form = new FormData();

        form.append('image_data', {
          uri: image.path,
          type: image.mime,
          name: 'image.jpg'
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
            updateDataStorage(resp);
            dispatch(
              updateAvatar(resp.data.url),
              updateIsAvatarUpdated(true)
            );
          }).catch(err => console.log('error upload image', err))
      });
  };
}

export function disabled() {
  return (dispatch, getState) => {
    const status = getState().get('profile').toJS().isDisabled;
    if (status === true) {
      dispatch(updateIsDisabled(false));
    } else {
      dispatch(updateIsDisabled(true));
    }
  }
}

export function logOut() {
  return async (dispatch, getState) => {
    const keys = [ 'access_token', 'refresh_token', 'role_id', 'profile_data' ];
    await AsyncStorage.multiRemove(keys);
    dispatch(updateIsLogOut(true));
  };
}
