import React from 'react';
import {
  Text
} from 'native-base';
import { View, TouchableWithoutFeedback } from 'react-native';

import CameraIcon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import styles from './styles';

const Header = (props) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.pageTitle}>{props.title}</Text>
      </View>
      <View style={{justifyContent: 'center', marginRight: 20}}>
        <TouchableWithoutFeedback onPress={() => Actions.notification()}>
          <CameraIcon
            name="bell"
            style={styles.notificationIcon}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default Header;
