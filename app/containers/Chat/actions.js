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

export function updateQiscus(payload) {
  return {
    type: UPDATE_QISCUS,
    payload
  };
}
export function updateNewMessage(payload) {
  return {
    type: UPDATE_NEW_MESSAGE,
    payload
  };
}
export function updateRooms(payload) {
  return {
    type: UPDATE_ROOMS,
    payload
  };
}
export function updateSelectedRoom(payload) {
  return {
    type: UPDATE_SELECTED_ROOM,
    payload
  };
}
export function isDelivered(payload) {
  return {
    type: IS_DELIVERED,
    payload
  };
}
export function isChatRoomCreated(payload) {
  return {
    type: IS_CHAT_ROOM_CREATED,
    payload
  };
}
export function isGroupRoomCreated(payload) {
  return {
    type: IS_GROUP_ROOM_CREATED,
    payload
  };
}
export function isCommentRead(payload) {
  return {
    type: IS_COMMENT_READ,
    payload
  };
}
export function isLoginError(payload) {
  return {
    type: IS_LOGIN_ERROR,
    payload
  };
}
export function isPresence(payload) {
  return {
    type: IS_PRESENCE,
    payload
  };
}
export function isTyping(payload) {
  return {
    type: IS_TYPING,
    payload
  };
}
