import React, { Component } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Text,
  Button
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import { PRIMARYCOLOR } from '../../constants';
import styles from './styles';

class ModalDialog extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  render() {
    const { visible, handleClose, children, handleConfirm, title, icon, confirmTitle } = this.props;
    return (
      <Modal
        animationType="fade"
        visible={visible}
        onRequestClose={() => handleClose()}
        transparent
      >
        <View style={{ flex: 1, justifyContent: 'center' }} backgroundColor="rgba(0, 0, 0, 0.5)">
          <View style={styles.redeem}>
            <TouchableWithoutFeedback
              onPress={() => handleClose()}
            >
              <Icon style={styles.iconClose} name="times" />
            </TouchableWithoutFeedback>
            <View style={styles.viewredeem}>
              <Icon name={icon ? icon : 'exclamation'} style={{ fontSize: 40, color: PRIMARYCOLOR, margin: 10 }} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: PRIMARYCOLOR }}>
                {title}
              </Text>
            </View>
            <View>
              <View style={styles.inputItem}>
                {children}
              </View>
              <View style={styles.buttonsSection}>
                <Button
                  transparent
                  style={styles.buttonModal}
                  onPress={() => {
                    handleConfirm();
                    handleClose();
                  }
                  }
                >
                  <Text style={styles.buttonTextModal}>{confirmTitle ? confirmTitle : 'Ok'}</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ModalDialog;
