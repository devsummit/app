import { fromJS } from 'immutable';

const initialState = fromJS({
  fields: {
    name: '',
    boothInfo: '',
    profilePic: 'https://museum.wales/media/40374/thumb_480/empty-profile-grey.jpg'
  },
  avatar: 'https://museum.wales/media/40374/thumb_480/empty-profile-grey.jpg',
  isAvatarUpdated: false,
  isDisabled: true,
  isProfileUpdated: false
});