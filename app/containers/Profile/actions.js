import { AsyncStorage, Platform, Alert } from 'react-native';

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
import local from '../../../config/local';

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

export function updateDataStorage1(resp) {
  getProfileData().then(() => {
    console.log('landing here update data storage 1', resp)
    const newData = JSON.stringify(resp.data);
    AsyncStorage.removeItem('profile_data', () => {
      try {
        AsyncStorage.setItem('profile_data', newData);
      } catch (e) {
        console.log('error save profile data');
      }
    });
  });
}

export function updateDataStorage2(resp) {
  getProfileData().then(() => {
    const newData = JSON.stringify(resp.data);
    AsyncStorage.removeItem('profile_data', () => {
      try {
        AsyncStorage.setItem('profile_data', newData);
      } catch (e) {
        console.log('error save profile data');
      }
    });
  });
}

export function changeProfile() {
  return (dispatch, getState) => {
    const { fields } = getState()
      .get('profile')
      .toJS();
    const { username, firstName, lastName, profilePic, boothInfo, job, summary, points } = fields;

    getAccessToken().then((token) => {
      DevSummitAxios.patch(
        '/auth/me/changesetting',
        {
          first_name: firstName,
          last_name: lastName,
          booth_info: boothInfo,
          speaker_job: job,
          speaker_summary: summary
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
        .then((response) => {
          if (
            response &&
            response.data &&
            response.data.meta.success &&
            response.data.meta.message === 'Data retrieved succesfully'
          ) {
            updateDataStorage1(response.data);
            dispatch(updateIsProfileUpdated(true));
          } else {
            Alert.alert('Failed', 'Payload is invalid');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
}

export function updateImage(image) {
  return (dispatch, getState) => {
    const { avatar } = getState()
      .get('profile')
      .toJS();

    getAccessToken().then((token) => {
      // @TODO We need to change into dev-summit url
      const url = local.API_BASE_URL.concat('/api/v1/user/photo');
      const form = new FormData();

      if (Platform.OS === 'ios') {
        form.append('image_data', {
          uri: image.sourceURL,
          type: image.mime,
          name: image.filename
        });
      } else {
        form.append('image_data', {
          uri: image.path,
          type: image.mime,
          name: 'image.jpg'
        });
      }

      DevSummitAxios.post(
        '/api/v1/user/photo',
          form,
        {
          headers: {
            Authorization: token
          }
        }
      )
        .then(resp => {
          // resp.json();
          console.log('landing here updateImage resp', resp);
          console.log('landing here resp', resp);
          updateDataStorage2(resp.data);
          dispatch(updateAvatar(resp.data.data.photos[0].url), updateIsAvatarUpdated(true));
        })
        .catch(err => console.log('error upload image', err));
    });
  };
}

export function disabled() {
  return (dispatch, getState) => {
    const status = getState()
      .get('profile')
      .toJS().isDisabled;
    if (status === true) {
      dispatch(updateIsDisabled(false));
    } else {
      dispatch(updateIsDisabled(true));
    }
  };
}

export function logOut() {
  return async (dispatch, getState) => {
    const keys = [ 'access_token', 'refresh_token', 'role_id', 'profile_data' ];
    await AsyncStorage.multiRemove(keys);
    dispatch(updateIsLogOut(true));
  };
}
