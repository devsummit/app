'use strict';

exports.__esModule = true;
exports.ChatRenderer = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _classAutobind = require('class-autobind');

var _classAutobind2 = _interopRequireDefault(_classAutobind);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _nativeBase = require('native-base');

var _ChatComponent = require('./ChatComponent');

var _FileUploader = require('./FileUploader');

var _FileUploader2 = _interopRequireDefault(_FileUploader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Dimensions$get = _reactNative.Dimensions.get('window'),
    height = _Dimensions$get.height,
    width = _Dimensions$get.width;

var ChatRenderer = exports.ChatRenderer = function (_Component) {
  _inherits(ChatRenderer, _Component);

  function ChatRenderer() {
    _classCallCheck(this, ChatRenderer);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    (0, _classAutobind2.default)(_this);
    _this.state = {
      comments: null,
      newMessage: null,
      clicked: null,
      formStyle: _styles2.default.formStyle
    };
    return _this;
  }

  ChatRenderer.prototype.componentWillMount = function componentWillMount() {
    var _this2 = this;

    var _props = this.props,
        room = _props.room,
        initApp = _props.initApp,
        qiscus = _props.qiscus,
        comments = this.state.comments;

    qiscus.chatGroup(room.id).then(function (data) {
      initApp(qiscus);
      _this2._setComments(data.comments);
    }).catch(function (err) {
      return console.log(err);
    });
    this.keyboardDidShowListener = _reactNative.Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = _reactNative.Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  };

  ChatRenderer.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this._setCommentsScroll(nextProps.message);
  };

  ChatRenderer.prototype.componentWillUnmount = function componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  };

  ChatRenderer.prototype._keyboardDidShow = function _keyboardDidShow() {
    this.setState({
      formStyle: {
        height: 45,
        bottom: 0,
        flexDirection: 'row',
        marginTop: -0.42 * height,
        backgroundColor: '#fff'
      } });
  };

  ChatRenderer.prototype._keyboardDidHide = function _keyboardDidHide() {
    this.setState({
      formStyle: _styles2.default.formStyle });
  };

  ChatRenderer.prototype._measureChatContainer = function _measureChatContainer() {
    var _this3 = this;

    if (this.refs.chatContainer) {
      this.refs.chatContainer.measure(function (a, b, width, height, px, py) {
        _this3._scrollAction(height);
      });
    }
  };

  ChatRenderer.prototype._setComments = function _setComments(comments) {
    this.setState({
      comments: comments
    });
  };

  ChatRenderer.prototype._setCommentsScroll = function _setCommentsScroll(nextProps) {
    if (JSON.stringify(this.state.comments) !== JSON.stringify(nextProps)) {
      this.setState({
        comments: nextProps
      });
      this._measureChatContainer();
    }
  };

  ChatRenderer.prototype._setToken = function _setToken(token) {
    this.setState({
      token: token
    });
  };

  ChatRenderer.prototype._scrollAction = function _scrollAction(height) {
    _scrollView.scrollTo({ x: 0, y: height, animated: true });
    _scrollView.scrollToEnd({ animated: true });
  };

  ChatRenderer.prototype._setNewMessage = function _setNewMessage(text) {
    this.setState({
      newMessage: text
    });
  };

  ChatRenderer.prototype._sendMessage = function _sendMessage(message) {
    var _props2 = this.props,
        room = _props2.room,
        qiscus = _props2.qiscus;

    _reactNative.Keyboard.dismiss();
    this.setState({
      newMessage: null
    });
    if (message) {
      qiscus.submitComment(room.id, message, null, null, null);
    }
  };

  ChatRenderer.prototype.render = function render() {
    var _this4 = this;

    var _props3 = this.props,
        message = _props3.message,
        room = _props3.room,
        qiscus = _props3.qiscus,
        comments = this.state.comments;

    if (!comments) {
      return _react2.default.createElement(
        _reactNative.View,
        { style: { marginTop: 30, alignItems: 'center', justifyContent: 'center' } },
        _react2.default.createElement(
          _nativeBase.Text,
          null,
          'Loading chats...'
        )
      );
    }
    return _react2.default.createElement(
      _reactNative.View,
      { style: _styles2.default.chatContainer },
      _react2.default.createElement(
        _reactNative.View,
        { style: _styles2.default.commentList, ref: 'chatContainer' },
        _react2.default.createElement(
          _reactNative.ScrollView,
          {
            ref: function ref(scrollView) {
              _scrollView = scrollView;
            },
            onLayout: function onLayout(event) {
              _this4._measureChatContainer();
            }
          },
          (0, _ChatComponent.ChatComponent)(qiscus)
        )
      ),
      _react2.default.createElement(
        _reactNative.View,
        { style: this.state.formStyle },
        _react2.default.createElement(
          _nativeBase.Item,
          { rounded: true, style: _styles2.default.textInput },
          _react2.default.createElement(_nativeBase.Input, { value: this.state.newMessage, placeholder: 'Say something', multiline: true, onChangeText: function onChangeText(text) {
              return _this4._setNewMessage(text);
            } })
        ),
        _react2.default.createElement(_FileUploader2.default, { sendMessage: this._sendMessage }),
        _react2.default.createElement(
          _nativeBase.Button,
          { transparent: true, style: _styles2.default.btnSend, onPress: function onPress() {
              return _this4._sendMessage(_this4.state.newMessage);
            } },
          _react2.default.createElement(_nativeBase.Icon, { name: 'md-send', style: _styles2.default.sendIcon })
        )
      )
    );
  };

  return ChatRenderer;
}(_react.Component);