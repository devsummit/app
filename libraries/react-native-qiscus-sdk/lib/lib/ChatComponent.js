'use strict';

exports.__esModule = true;
exports.ChatComponent = ChatComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNative = require('react-native');

var _classAutobind = require('class-autobind');

var _classAutobind2 = _interopRequireDefault(_classAutobind);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

var _nativeBase = require('native-base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderMessage(isFile, message) {
  if (isFile) {
    var uri = message.split("[file] ")[1].split(" [/file]")[0];
    return _react2.default.createElement(_reactNative.Image, {
      style: { width: 200, height: 120 },
      source: { uri: uri }
    });
  } else {
    return _react2.default.createElement(
      _nativeBase.Text,
      null,
      message
    );
  }
}

function ChatComponent(qiscus) {
  var comments = qiscus.selected.comments;
  var user = qiscus.userData;
  return comments.map(function (data) {
    var isFile = data.message.substring(0, 6) === '[file]' ? true : false;
    if (user.username === data.username_as) {
      return _react2.default.createElement(
        _reactNative.View,
        { style: _styles2.default.cardContainerRight, key: data.id },
        _react2.default.createElement(
          _nativeBase.Card,
          { style: _styles2.default.cardRight },
          _react2.default.createElement(
            _nativeBase.CardItem,
            { style: _styles2.default.cardRightContent },
            _react2.default.createElement(
              _nativeBase.Body,
              null,
              renderMessage(isFile, data.message)
            )
          )
        ),
        _react2.default.createElement(_reactNative.View, { style: _styles2.default.arrowRight })
      );
    } else {
      return _react2.default.createElement(
        _reactNative.View,
        { style: _styles2.default.cardContainerLeft, key: data.id },
        _react2.default.createElement(_reactNative.View, { style: _styles2.default.arrowLeft }),
        _react2.default.createElement(_reactNative.View, { style: _styles2.default.arrowLeftTop }),
        _react2.default.createElement(
          _nativeBase.Card,
          { style: _styles2.default.cardLeft },
          _react2.default.createElement(
            _nativeBase.CardItem,
            { style: _styles2.default.cardLeftContent },
            _react2.default.createElement(
              _nativeBase.Body,
              null,
              renderMessage(isFile, data.message)
            )
          )
        )
      );
    }
  });
}