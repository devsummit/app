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
        <View>
          <Text style={styles.pageTitle}>{this.props.title}</Text>
        </View>
        <View style={{ justifyContent: 'center', marginRight: 20 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              Actions.notification();
              this.setState({ notif: !this.state.notif })
            }
            }
          >
            { !this.state.notif ?
              <CameraIcon
                name="bell"
                style={styles.notificationIcon}
              /> :
              <CameraIcon
                name="bell"
                style={[ styles.notificationIcon, { color: 'red' } ]}
              />
            }
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
