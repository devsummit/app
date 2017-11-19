import QiscusSDK from './qiscusSdk';

let callbackOptions = {};

const optionIndex = [
  'commentDeliveredCallback',
  'chatRoomCreatedCallback',
  'groupRoomCreatedCallback',
  'commentReadCallback',
  'loginErrorCallback',
  'presenceCallback',
  'typingCallback',
];

export function InitApp(config) {
  let qiscus = new QiscusSDK();
  let {
    initApp,
    receiveNewMessage,
    setRooms,
    userAuth,
  } = config;
  if (config.callbackOptions) {
    optionIndex.map((value) => {
      callbackOptions[value] = config.callbackOptions[value];
    });
  }
  qiscus.init({
    AppId: userAuth.appID,
    options: {
      loginSuccessCallback: function(data: Object) {
        initApp(qiscus);
        qiscus.userAdapter.loadRoomList()
        .then((data) => {
          setRooms(data);
        });
      },
      newMessagesCallback: (data) => {
        receiveNewMessage(data);
      },
      commentDeliveredCallback: (data) => {
        callbackOptions.commentDeliveredCallback(data);
      },
      chatRoomCreatedCallback: (data) => {
        initApp(qiscus);
        qiscus.userAdapter.loadRoomList()
        .then((data) => {
          setRooms(data);
        });
        callbackOptions.chatRoomCreatedCallback(data);
      },
      groupRoomCreatedCallback: (data) => {
        initApp(qiscus);
        qiscus.userAdapter.loadRoomList()
        .then((data) => {
          setRooms(data);
        });
        callbackOptions.groupRoomCreatedCallback(data);
      },
      commentReadCallback: (data) => {
        callbackOptions.commentReadCallback(data);
      },
      loginErrorCallback: (data) => {
        callbackOptions.loginErrorCallback(data);
      },
      presenceCallback: (data) => {
        callbackOptions.presenceCallback(data);
      },
      typingCallback: (data) => {
        callbackOptions.typingCallback(data);
      },
    },
  });
  qiscus.setUser(userAuth.email, userAuth.password, userAuth.displayName, userAuth.avatar);
  return qiscus;
}
