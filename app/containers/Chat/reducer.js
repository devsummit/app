import { fromJS } from 'immutable';

import {
  UPDATE_QISCUS,
  UPDATE_NEW_MESSAGE,
  UPDATE_ROOMS,
  UPDATE_SELECTED_ROOM,
  IS_DELIVERED,
  IS_CHAT_ROOM_CREATED,
  IS_GROUP_ROOM_CREATED,
  IS_COMMENT_READ,
  IS_LOGIN_ERROR,
  IS_PRESENCE,
  IS_TYPING
} from './constants';

const initialState = fromJS({
  qiscus: '',
  newMessage: '',
  rooms: '',
  selectedRoom: '',
  delivered: '',
  chatRoomCreated: '',
  groupRoomCreated: '',
  commentRead: '',
  loginError: '',
  presence: '',
  typing: ''
});

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_QISCUS:
      return state.set('qiscus', action.payload);
    case UPDATE_NEW_MESSAGE:
      return state.set('newMessage', action.payload);
    case UPDATE_ROOMS:
      return state.set('rooms', action.payload);
    case UPDATE_SELECTED_ROOM:
      return state.set('selectedRoom', action.payload);
    case IS_DELIVERED:
      return state.set('delivered', action.payload);
    case IS_CHAT_ROOM_CREATED:
      return state.set('chatRoomCreated', action.payload);
    case IS_GROUP_ROOM_CREATED:
      return state.set('groupRoomCreated', action.payload);
    case IS_COMMENT_READ:
      return state.set('commentRead', action.payload);
    case IS_LOGIN_ERROR:
      return state.set('loginError', action.payload);
    case IS_PRESENCE:
      return state.set('presence', action.payload);
    case IS_TYPING:
      return state.set('typing', action.payload);
    default:
      return state;
  }
}

export default chatReducer;
