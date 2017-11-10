'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactNativeImagePicker = require('react-native-image-picker');

var _reactNativeImagePicker2 = _interopRequireDefault(_reactNativeImagePicker);

var _reactNative = require('react-native');

var _reactNativeFileUploader = require('react-native-file-uploader');

var _reactNativeFileUploader2 = _interopRequireDefault(_reactNativeFileUploader);

var _nativeBase = require('native-base');

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var options = {
  title: 'Select Image',
  customButtons: [],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
var BUTTONS = [{ text: "Image", icon: "ios-image", iconColor: "#2c8ef4", file: 'image' }, { text: "Cancel", icon: "close", iconColor: "#25de5b", file: false }];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 2;
var DEFAULT_INDEX = {
  text: null,
  icon: null,
  iconColor: null,
  file: null
};

var FilePicker = function (_Component) {
  _inherits(FilePicker, _Component);

  function FilePicker() {
    _classCallCheck(this, FilePicker);

    var _this = _possibleConstructorReturn(this, _Component.call(this));

    _this.state = {
      clicked: DEFAULT_INDEX,
      imageSource: null
    };
    _this.actionSheet = null;
    return _this;
  }

  FilePicker.prototype._pickImage = function _pickImage() {
    var _this2 = this;

    var sendMessage = this.props.sendMessage;

    _reactNativeImagePicker2.default.showImagePicker(options, function (response) {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        var file = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        };
        var source = _reactNative.Platform.OS === 'ios' ? response.uri : response.path;
        var settings = {
          uri: source,
          uploadUrl: 'https://sdksample.qiscus.com/api/v2/sdk/upload',
          method: 'POST', // default to 'POST'
          fileName: response.fileName,
          fieldName: 'file',
          contentType: 'multipart/form-data', // default to 'application/octet-stream'
          data: {
            token: _this2.state.token
          }
        };

        _reactNativeFileUploader2.default.upload(settings, function (err, res) {
          var data = JSON.parse(res.data);
          sendMessage('[file] ' + data.results.file.url + ' [/file]');
        }, function (sent, expectedToSend) {
          // do something when uploading
        });

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        _this2.setState({
          imageSource: source,
          clicked: DEFAULT_INDEX
        });
      }
    });
  };

  FilePicker.prototype._showActionSheet = function _showActionSheet() {
    var _this3 = this;

    if (this.actionSheet !== null) {
      this.actionSheet._root.showActionSheet({
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: "File"
      }, function (buttonIndex) {
        _this3.setState({ clicked: BUTTONS[buttonIndex] });
      });
    }
  };

  FilePicker.prototype.render = function render() {
    var _this4 = this;

    var file = this.state.clicked.file;

    if (file === 'image') {
      this._pickImage();
    }
    return _react2.default.createElement(
      _reactNative.View,
      null,
      _react2.default.createElement(
        _nativeBase.Button,
        { onPress: function onPress() {
            return _this4._showActionSheet();
          }, style: _styles2.default.button, transparent: true },
        _react2.default.createElement(_nativeBase.Icon, { name: 'md-attach', style: _styles2.default.sendIcon })
      ),
      _react2.default.createElement(_nativeBase.ActionSheet, { ref: function ref(c) {
          _this4.actionSheet = c;
        } })
    );
  };

  return FilePicker;
}(_react.Component);

exports.default = FilePicker;