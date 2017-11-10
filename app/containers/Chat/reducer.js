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
  qiscus: null,
  newMessage: null,
  rooms: null,
  selectedRoom: null,
  delivered: null,
  chatRoomCreated: null,
  groupRoomCreated: null,
  commentRead: null,
  loginError: null,
  presence: null,
  typing: null
});

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_QISCUS:
      return state.set('qiscus', fromJS(action.payload));
    case UPDATE_NEW_MESSAGE:
      return state.set('newMessage', fromJS(action.payload));
    case UPDATE_ROOMS:
      return state.set('rooms', fromJS(action.payload));
    case UPDATE_SELECTED_ROOM:
      return state.set('selectedRoom', fromJS(action.payload));
    case IS_DELIVERED:
      return state.set('delivered', fromJS(action.payload));
    case IS_CHAT_ROOM_CREATED:
      return state.set('chatRoomCreated', fromJS(action.payload));
    case IS_GROUP_ROOM_CREATED:
      return state.set('groupRoomCreated', fromJS(action.payload));
    case IS_COMMENT_READ:
      return state.set('commentRead', fromJS(action.payload));
    case IS_LOGIN_ERROR:
      return state.set('loginError', fromJS(action.payload));
    case IS_PRESENCE:
      return state.set('presence', fromJS(action.payload));
    case IS_TYPING:
      return state.set('typing', fromJS(action.payload));
    default:
      return state;
  }
}

export default chatReducer;
