import FormData from 'FormData';
import { Platform } from 'react-native';

import {
  FETCH_FEEDS,
  IS_FETCHING_FEEDS,
  IS_POST_FEEDS,
  UPDATE_IMAGE,
  UPDATE_TEXT,
  UPDATE_FEEDS,
  CLEAR_FIELDS
} from './constants';

import {
  DevSummitAxios,
  getAccessToken
} from '../../helpers';

/**
 * Receiver callback from container and send it to reducer
 * for updating feeds
 */
export function updateFeeds(payload) {
  const data = JSON.parse(payload);
  const payloads = data.data;
  return {
    type: UPDATE_FEEDS,
    payloads
  };
}


export function isFetchingFeeds(status) {
  return {
    type: IS_FETCHING_FEEDS,
    status
  };
}

export function fetchFeeds() {
  return (dispatch) => {
    dispatch(isFetchingFeeds(true));

    getAccessToken()
      .then((token) => {
        DevSummitAxios.get('/api/v1/feeds', { headers: { Authorization: token } })
          .then((response) => {
            const payloads = response.data.data;

            dispatch({ type: FETCH_FEEDS, payloads });

            dispatch(isFetchingFeeds(false));
          })
          .catch((err) => {
            console.log(err);
            dispatch(isFetchingFeeds(false));
          });
      });
  };
}

export function isPostFeeds(status) {
  return {
    type: IS_POST_FEEDS,
    status
  };
}

export function postFeeds(image, text) {
  return (dispatch) => {
    dispatch(isPostFeeds(true));
    getAccessToken()
      .then((token) => {
        const form = new FormData();

        if (Platform.OS === 'ios') {
          form.append('attachment', {
            uri: image.sourceURL,
            type: image.mime,
            name: image.filename
          });
          form.append('message', text);
        } else {
          form.append('attachment', {
            uri: image.path,
            type: image.mime,
            name: 'image.jpg'
          });
          form.append('message', text);
        }

        const headers = { Authorization: token };
        
        DevSummitAxios.post('api/v1/feeds', form, { headers })
          .then((response) => {
            dispatch({ type: CLEAR_FIELDS, response });

            dispatch(isPostFeeds(false));
          })
          .catch(err => console.log(err));        
        dispatch(isPostFeeds(false));
      });
  };
}

export function updateImage(image) {
  return {
    type: UPDATE_IMAGE,
    image
  };
}

export function updateText(value) {
  return {
    type: UPDATE_TEXT,
    value
  };
}
