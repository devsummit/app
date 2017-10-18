import { AsyncStorage, Platform, Alert } from 'react-native';
import Toast from 'react-native-simple-toast';
import FormData from 'FormData';
import { DevSummitAxios, getAccessToken, getProfileData } from '../../helpers';
import {
  UPDATE_SINGLE_FIELD,
  UPDATE_IS_PROFILE_UPDATED,
  UPDATE_AVATAR,
  UPDATE_IS_AVATAR_UPDATED,
  IS_LOADING_LOGOUT,
  UPDATE_IS_LOG_OUT,
  UPDATE_IS_DISABLED,
  UPDATE_REFERAL_CODE,
  UPDATE_IS_CODE_CONFIRMED,
  UPDATE_HAVE_REFERED
} from './constants';
import local from '../../../config/local';
import profile from '../../services/profile';

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

export function isLoadingLogout(status) {
  return {
    type: IS_LOADING_LOGOUT,
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

export function updateReferalCode(value) {
  return {
    type: UPDATE_REFERAL_CODE,
    value
  };
}

export function updateIsCodeConfirmed(status) {
  return {
    type: UPDATE_IS_CODE_CONFIRMED,
    status
  };
}

export function updateHaveRefered(value) {
  console.log('JSFE$', value);
  return {
    type: UPDATE_HAVE_REFERED,
    value
  };
}

export function updateDataStorage(resp) {
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

export function confirmReferalCode(value) {
  return (dispatch) => {
    profile.post(value)
      .then((response) => {
        if (
          response &&
    response.data &&
    response.data.meta.success &&
    response.data.meta.message === 'Data retrieved succesfully'
        ) {
          dispatch(updateHaveRefered(response.data.have_refered));
          dispatch(updateDataStorage(response.data));
          Toast.show('Your code is confirmed, you can not refer another code');
        } else {
          Alert.alert('Failed', 'Payload is invalid');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function changeProfile() {
  return (dispatch, getState) => {
    const { fields } = getState()
      .get('profile')
      .toJS();
    console.log('FIELDSSSSS', fields);
    const { username, firstName, lastName, profilePic, boothInfo, job, summary, points } = fields;
    profile.patch(username, firstName, lastName, profilePic, boothInfo, job, summary, points)
      .then((response) => {
        if (
          response &&
    response.data &&
    response.data.meta.success &&
    response.data.meta.message === 'Data retrieved succesfully'
        ) {
          updateDataStorage(response.data);
          dispatch(updateIsProfileUpdated(true));
        } else {
          Alert.alert('Failed', 'Payload is invalid');
        }
      })
      .catch((error) => {
        console.log(error);
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
      const url = local.API_BASE_URL.concat('/user/photo');
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

      DevSummitAxios.post('/user/photo', form, {
        headers: {
          Authorization: token
        }
      })
        .then((resp) => {
          // resp.json();
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
    dispatch(isLoadingLogout(true));

    const keys = [ 'access_token', 'refresh_token', 'role_id', 'profile_data' ];
    await AsyncStorage.multiRemove(keys);
    dispatch(isLoadingLogout(false));
    dispatch(updateIsLogOut(true));
  };
}
