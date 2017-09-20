import React, { Component } from 'react';
import { Text, Form, Item, Label, Input } from 'native-base';
import {
  View,
  Modal,
  Keyboard
} from 'react-native';
import Button from '../Button';
import styles from './styles';

export default class ModalRedeem extends Component {
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
              <Text style={styles.modalTitle}>Redeem your code</Text>
              <View style={styles.inputItem}>
                <Form>
                  <Item>
                    <Input
                      placeholder='Enter code'
                      onChangeText={this.props.onChangeCode}
                      value={this.props.titleValue}
                    />
                  </Item>
                </Form>
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
                  <Text style={styles.buttonText}>REDEEM</Text>
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
