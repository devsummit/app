import { AsyncStorage } from 'react-native';
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
  UPDATE_FEEDBACK_POSTED,
  UPDATE_FEEDBACK,
  IS_LOADING_FEEDBACK,
  UPDATE_MODAL_VISIBILITY
} from './constants';
import { restoreCurrentPage } from '../Feed/actions';
import local from '../../../config/local';
import { fetchTickets } from '../OrderList/actions';

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

export function fetchTicketData() {
  return (dispatch) => {
    dispatch(fetchTickets());
  };
}

export function updateFeedback(value) {
  return {
    type: UPDATE_FEEDBACK,
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

export function updateModalVisibility(status) {
  return {
    type: UPDATE_MODAL_VISIBILITY,
    status
  };
}

export function updateIsLoadingFeedback(status) {
  return {
    type: IS_LOADING_FEEDBACK,
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

export function addFeedback() {
  return (dispatch, getState) => {
    const { feedBack } = getState()
      .get('settings')
      .toJS();
    dispatch(updateIsLoadingFeedback(true));

    getAccessToken().then((token) => {
      DevSummitAxios.post(
        '/api/v1/user-feedback',
        {
          content: feedBack
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
            response.data.meta.success === true &&
            response.data.meta.message === 'Feedback created'
          ) {
            dispatch({
              type: UPDATE_FEEDBACK_POSTED,
              status: true
            });
            dispatch(updateFeedback(response.data.data.content));
            dispatch(updateIsLoadingFeedback(false));
            dispatch(updateModalVisibility(false));
            Toast.show(response.data.meta.message);
          } else {
            Toast.show('Wrong payload');
          }
        })
        .catch((error) => {
          Toast.show('Sorry, something went wrong');
          console.log('Error', error);
        });
    });
  };
}

export function changeProfile() {
  return (dispatch, getState) => {
    const { fields } = getState()
      .get('profile')
      .toJS();
    const { username, firstName, lastName, profilePic, boothInfo, job, summary } = fields;

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
          if (response && response.data && response.data.meta.success) {
            updateDataStorage(response);
            dispatch(updateIsProfileUpdated(true));
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
      const url = local.API_BASE_URL.concat('api/v1/user/photo');
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
          dispatch(updateAvatar(resp.data.photos[0].url), updateIsAvatarUpdated(true));
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
    dispatch(restoreCurrentPage());
    dispatch(isLoadingLogout(false));
    dispatch(updateIsLogOut(true));
  };
}
