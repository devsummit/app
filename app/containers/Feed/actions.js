import FormData from 'FormData';
import { Platform } from 'react-native';
import Toast from 'react-native-simple-toast';

import {
  FETCH_FEEDS,
  IS_FETCHING_FEEDS,
  IS_POST_FEEDS,
  UPDATE_IMAGE,
  UPDATE_TEXT,
  UPDATE_FEEDS,
  CLEAR_TEXT_FIELD,
  CLEAR_IMAGE,
  UPDATE_CURRENT_PAGE,
  LOAD_MORE_FEEDS
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
  if (payloads) {
    return { type: UPDATE_FEEDS, payloads };
  }
}

export function updateCurrentPage(value) {
  return {
    type: UPDATE_CURRENT_PAGE,
    value
  };
}

export function isFetchingFeeds(status) {
  return {
    type: IS_FETCHING_FEEDS,
    status
  };
}

export function fetchFeeds(currentpage) {
  return (dispatch) => {
    dispatch(isFetchingFeeds(true));

    getAccessToken()
      .then((token) => {
        DevSummitAxios.get(`/api/v1/feeds?page=${currentpage}`, { headers: { Authorization: token } })
          .then((response) => {
            const payloads = response.data.data;

            dispatch({ type: FETCH_FEEDS, payloads });

            dispatch(updateCurrentPage(currentpage + 1));

            dispatch(isFetchingFeeds(false));
          })
          .catch((err) => {
            console.log(err);
            dispatch(isFetchingFeeds(false));
          });
      });
  };
}

export function fetchPageWithPaginate(page) {
  return (dispatch) => {
    getAccessToken()
      .then((token) => {
        DevSummitAxios.get(`/api/v1/feeds?page=${page}`, { headers: { Authorization: token } })
          .then((response) => {
            const payloads = response.data.data;

            dispatch({ type: LOAD_MORE_FEEDS, payloads });

            dispatch(updateCurrentPage(page + 1));
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }
}

export function isPostFeeds(status) {
  return {
    type: IS_POST_FEEDS,
    status
  };
}

export function clearImage() {
  return {
    type: CLEAR_IMAGE
  };
}

export function clearTextField() {
  return {
    type: CLEAR_TEXT_FIELD
  };
}

export function postFeeds(image, text) {
  return (dispatch) => {
    dispatch(isPostFeeds(true));
    getAccessToken()
      .then((token) => {
        const form = new FormData();

        if (Platform.OS === 'ios' && image.sourceURL) {
          form.append('attachment', {
            uri: image.sourceURL,
            type: image.mime,
            name: image.filename
          });
        }

        if (image.path) {
          form.append('attachment', {
            uri: image.path,
            type: image.mime,
            name: 'image.jpg'
          });
        }
        form.append('message', text);

        const headers = { Authorization: token };

        DevSummitAxios.post('api/v1/feeds', form, { headers })
          .then((res) => {
            dispatch(clearTextField());
            dispatch(clearImage());
            Toast.show('Posted succesfully!');
            dispatch(isPostFeeds(false));
          })
          .catch((err) => {
            dispatch(clearTextField());
            dispatch(clearImage());
            dispatch(isPostFeeds(false));
            Toast.show('Upss, Something when wrong!', Toast.LONG);
            console.log(err);
          });
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
