import React, { Component } from 'react';
import {
  Text
} from 'native-base';
import { View, TouchableWithoutFeedback } from 'react-native';

import CameraIcon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import PushNotification from './PushNotification';

import styles from './styles';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notif: false
    };
  }

  handleNotif = () => {
    this.setState({
      notif: !this.state.notif
    })
  }

  render() {
    return (
      <View style={styles.header}>
        <PushNotification onReceiveNotif={this.handleNotif} />
        <View style={{ justifyContent: 'center', marginLeft: 20 }}>
          <TouchableWithoutFeedback
            onPress={() => Actions.drawerOpen()}
          >
            <CameraIcon name="bars" style={styles.drawerIcon} />
          </TouchableWithoutFeedback>
        </View>
        <View>
          <Text style={styles.pageTitle}>{this.props.title}</Text>
        </View>
        <View style={{ justifyContent: 'center', marginRight: 20 }}>
          {!this.state.notif ?
            <TouchableWithoutFeedback onPress={() => Actions.notification()}>
              <CameraIcon.Button
                name="bell"
                style={styles.notificationIcon}
                iconStyle={{ marginRight: -8 }}
                borderRadius={0}
              />
            </TouchableWithoutFeedback> :
            <TouchableWithoutFeedback
              onPress={() => {
                Actions.notification();
                this.setState({ notif: !this.state.notif });
              }
              }
            >
              <CameraIcon.Button
                name="bell"
                style={styles.notificationIcon}
                iconStyle={{ marginRight: -8 }}
                borderRadius={0}
              >
                <View style={{ marginLeft: 12, backgroundColor: 'red', borderRadius: 6, padding: 6 }} />
              </CameraIcon.Button>
            </TouchableWithoutFeedback>
          }
        </View>
      </View>
    );
  }
}
