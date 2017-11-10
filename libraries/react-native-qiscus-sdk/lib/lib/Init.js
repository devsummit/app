'use strict';

exports.__esModule = true;
exports.InitApp = InitApp;

var _qiscusSdk = require('./qiscusSdk');

var _qiscusSdk2 = _interopRequireDefault(_qiscusSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InitApp(config) {
  var qiscus = new _qiscusSdk2.default();
  var initApp = config.initApp,
      receiveNewMessage = config.receiveNewMessage,
      setRooms = config.setRooms,
      userAuth = config.userAuth;

  qiscus.init({
    AppId: userAuth.appID,
    options: {
      loginSuccessCallback: function loginSuccessCallback(data) {
        initApp(qiscus);
        qiscus.userAdapter.loadRoomList().then(function (data) {
          setRooms(data);
        });
      },
      newMessagesCallback: function newMessagesCallback(data) {
        receiveNewMessage(data);
      }
    }
  });
  qiscus.setUser(userAuth.email, userAuth.password, userAuth.displayName, userAuth.avatar);
  return qiscus;
}