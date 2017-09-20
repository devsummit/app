import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Button,
  Item,
  Input,
  Text,
  Label,
  Card,
  CardItem,
  Body,
  Fab
} from 'native-base';
import { Alert, View, Image, KeyboardAvoidingView, TouchableOpacity,TouchableHighlight,  Modal } from 'react-native';
import Icon from 'react-native-vector-icons';
import { Actions } from 'react-native-router-flux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import HeaderPoint from '../../components/Header';
import ModalComponent from '../../components/ModalComponent';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import styles from './styles';
import * as selectors from './selectors';
import * as actions from './actions';
import { SocialIcon } from 'react-native-elements'

class ConnectSosmed extends Component {

  render() {
    return (
      <Container>
        <HeaderPoint title="CONNECT" />
        <Content>
          <View style={styles.buttonSocialSection}>
            <SocialIcon
              title="Connect To Facebook"
              button
              type="facebook"
            />
            <SocialIcon
              title="Connect To Instagram"
              button
              type="instagram"
            />
            <SocialIcon
              title="Connect To Twitter"
              button
              type="twitter"
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({

});
export default connect(mapStateToProps, actions)(ConnectSosmed);
