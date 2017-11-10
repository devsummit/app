import { createSelector } from 'reselect';

const selectChat = () => state => state.get('chat');

export const getQiscus = () => createSelector(
  selectChat(),
  state => state.get('qiscus').toJS()
);
export const getNewMessage = () => createSelector(
  selectChat(),
  state => state.get('newMessage').toJS()
);
export const getRooms = () => createSelector(
  selectChat(),
  state => state.get('rooms').toJS()
);
export const getSelectedRoom = () => createSelector(
  selectChat(),
  state => state.get('selectedRoom').toJS()
);
export const getDelivered = () => createSelector(
  selectChat(),
  state => state.get('delivered').toJS()
);
export const getChatRoomCreated = () => createSelector(
  selectChat(),
  state => state.get('chatRoomCreated').toJS()
);
export const getGroupRoomCreated = () => createSelector(
  selectChat(),
  state => state.get('groupRoomCreated').toJS()
);
export const getCommentRead = () => createSelector(
  selectChat(),
  state => state.get('commentRead').toJS()
);
export const getLoginError = () => createSelector(
  selectChat(),
  state => state.get('loginError').toJS()
);
export const getPresence = () => createSelector(
  selectChat(),
  state => state.get('presence').toJS()
);
export const getTyping = () => createSelector(
  selectChat(),
  state => state.get('typing').toJS()
);
