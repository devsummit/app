import { fromJS } from 'immutable';

import {
  UPDATE_FIELD,
  UPDATE_BOOTH_PHOTO,
  UPDATE_IS_BOOTH_PHOTO_UPDATED,
  UPDATE_IS_BOOTH_GALLERY_UPDATED,
  FETCH_BOOTH_INFO
} from './constants';

const initialState = fromJS({
  fields: {
    photoPic: 'https://museum.wales/media/40374/thumb_480/empty-profile-grey.jpg'
  },
  boothGalleries: [],
  boothPhoto: 'https://museum.wales/media/40374/thumb_480/empty-profile-grey.jpg',
  isBoothPhotoUpdated: false,
  isBoothGalleryUpdated: false
});

function boothInfoReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BOOTH_PHOTO:
      return state.set('boothPhoto', action.value);
    case UPDATE_FIELD:
      return state.setIn([ 'fields', action.fields ], action.value);
    case UPDATE_IS_BOOTH_PHOTO_UPDATED:
      return state.set('isBoothPhotoUpdated', action.status);
    case UPDATE_IS_BOOTH_GALLERY_UPDATED:
      return state.set('isBoothGalleryUpdated', action.status);
    case FETCH_BOOTH_INFO:
      return state.set('boothGalleries', action.payloads);
    default:
      return state;
  }
}

export default boothInfoReducer;
