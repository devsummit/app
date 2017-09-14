import React, { Component } from 'react';
import { Text, Form, Item, Label, Input } from 'native-base';
import {
  View,
  Modal,
  Keyboard
} from 'react-native';
import Button from '../Button';
import styles from './styles';

export default class ModalComponent extends Component {
  state = {
    onKeyboardShow: false
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ onKeyboardShow: true });
  }

  _keyboardDidHide = () => {
    this.setState({ onKeyboardShow: false });
  }

  render() {
    return (
      <View>
        <Modal
          animationType={'fade'}
          transparent
          visible={this.props.visible}
          onRequestClose={this.props.onModalPress}
        >
          <View style={styles.modalContainer}>
            <View />
            <View
              style={ styles.modalComponent
              }
            >
              <Text style={styles.modalTitle}>{this.props.modalTitle}</Text>
              <View style={styles.inputItem}>
                <Form>
                  <Item floatingLabel >
                    <Label>
                      {this.props.inputTitle}
                    </Label>
                    <Input
                      onChangeText={this.props.onChangeTitle}
                      value={this.props.titleValue}
                    />
                  </Item>
                </Form>
                <Form>
                  <Item floatingLabel >
                    <Label>
                      {this.props.inputSummary}
                    </Label>
                    <Input
                      onChangeText={this.props.onChangeSummary}
                      value={this.props.summaryValue}
                      multiline={true}
                      numberOfLines={3}
                      maxLength={255}
                    />
                  </Item>
                </Form>
                <Text style={{ alignSelf: 'center' }}>{this.props.fileName}</Text>
                <Button
                  style={styles.buttonUpload}
                  onPress={this.props.onUpload}
                >
                  <Text style={styles.buttonText}>Upload File</Text>
                </Button>
              </View>
              <View style={styles.buttonsSection}>
                <Button
                  transparent
                  style={styles.button}
                  onPress={this.props.onModalPress}
                >
                  <Text style={styles.buttonText}>cancel</Text>
                </Button>
                <Button
                  transparent
                  style={styles.button}
                  onPress={this.props.onSubmit}
                >
                  <Text style={styles.buttonText}>save</Text>
                </Button>
              </View>
            </View>
            <View style={{ flex: this.state.onKeyboardShow ? 0.15 : 0.325 }} />
          </View>
        </Modal>
      </View>
    );
  }
}
