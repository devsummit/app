import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {View, Platform} from 'react-native';
import FileUploader from 'react-native-file-uploader';
import {ActionSheet, Icon, Button} from 'native-base';
import styles from './style';

const options = {
  title: 'Select Image',
  customButtons: [
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
const BUTTONS = [
  { text: "Image", icon: "ios-image", iconColor: "#2c8ef4", file: 'image' },
  { text: "Cancel", icon: "close", iconColor: "#25de5b", file: false }
];
const DESTRUCTIVE_INDEX = 3;
const CANCEL_INDEX = 2;
const DEFAULT_INDEX = {
  text: null,
  icon: null,
  iconColor: null,
  file: null,
};

export default class FilePicker extends Component {
  constructor() {
    super();
    this.state = {
      clicked: DEFAULT_INDEX,
      imageSource: null,
    };
    this.actionSheet = null;
  }
  _pickImage() {
    let {props: {sendMessage}} = this;
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let file = {
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        };
        let source = Platform.OS === 'ios' ? response.uri : response.path;
        const settings = {
          uri: source,
          uploadUrl: `https://sdksample.qiscus.com/api/v2/sdk/upload`,
          method: 'POST', // default to 'POST'
          fileName: response.fileName,
          fieldName: 'file',
          contentType: `multipart/form-data`, // default to 'application/octet-stream'
          data: {
            token: this.state.token,
          }
        };

        FileUploader.upload(settings, (err, res) => {
          const data = JSON.parse(res.data);
          sendMessage(`[file] ${data.results.file.url} [/file]`);
        }, (sent, expectedToSend) => {
            // do something when uploading
        });

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          imageSource: source,
          clicked: DEFAULT_INDEX,
        });
      }
    });
  }
  _showActionSheet() {
    if( this.actionSheet !== null ) {
        this.actionSheet._root.showActionSheet({
          options: BUTTONS,
          cancelButtonIndex: CANCEL_INDEX,
          destructiveButtonIndex: DESTRUCTIVE_INDEX,
          title: "File"
        },
        buttonIndex => {
          this.setState({ clicked: BUTTONS[buttonIndex] });
        });
    }
  }
  render() {
    let {state: {clicked: {file}}} = this;
    if (file === 'image') {
      this._pickImage();
    }
    return (
      <View>
        <Button onPress={() => this._showActionSheet()} style={styles.button} transparent>
          <Icon name='md-attach' style={styles.sendIcon} />
        </Button>
        <ActionSheet ref={(c) => { this.actionSheet = c; }} />
      </View>
    );
  }
}
