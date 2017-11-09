import FormData from 'FormData';
import { Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';
import Api from '../../services/api';
import payment from '../../services/payment';
import feeds from '../../services/feeds';
import {
  IS_POST_FEEDS,
  UPDATE_IMAGE,
  UPDATE_TEXT,
  CLEAR_TEXT_FIELD,
  CLEAR_IMAGE
} from './constants';

import { getAccessToken } from '../../helpers';

/**
 * Receiver callback from container and send it to reducer
 * for updating feeds
 */

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

export function postFeeds(text, image) {
  return (dispatch) => {
    dispatch(isPostFeeds(true));

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

    feeds
      .post(form)
      .then((res) => {
        dispatch(clearTextField());
        dispatch(clearImage());
        Toast.show('Post has been sent!');
        dispatch(isPostFeeds(false));
        Actions.pop();
      })
      .catch((err) => {
        dispatch(clearTextField());
        dispatch(clearImage());
        dispatch(isPostFeeds(false));
        Toast.show('Upss, Something when wrong!', Toast.LONG);
        console.log(err);
      });
  };
}
