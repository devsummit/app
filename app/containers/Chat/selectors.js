import { createSelector } from 'reselect';

const selectChat = () => state => state.get('chat');

export const getQiscus = () => createSelector(
  selectChat(),
  state => state.get('qiscus')
);
export const getNewMessage = () => createSelector(
  selectChat(),
  state => state.get('newMessage')
);
export const getRooms = () => createSelector(
  selectChat(),
  state => state.get('rooms')
);
export const getSelectedRoom = () => createSelector(
  selectChat(),
  state => state.get('selectedRoom')
);
export const getDelivered = () => createSelector(
  selectChat(),
  state => state.get('delivered')
);
export const getChatRoomCreated = () => createSelector(
  selectChat(),
  state => state.get('chatRoomCreated')
);
export const getGroupRoomCreated = () => createSelector(
  selectChat(),
  state => state.get('groupRoomCreated')
);
export const getCommentRead = () => createSelector(
  selectChat(),
  state => state.get('commentRead')
);
export const getLoginError = () => createSelector(
  selectChat(),
  state => state.get('loginError')
);
export const getPresence = () => createSelector(
  selectChat(),
  state => state.get('presence')
);
export const getTyping = () => createSelector(
  selectChat(),
  state => state.get('typing')
);
