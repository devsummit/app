import React from 'react';
import {
  Text
} from 'native-base';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

const Header = (props) => {
  return (
    <View style={styles.headerBase}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.pageTitle}>{props.title}</Text>
        </View>
        <View style={styles.content}>
          {props.children}
        </View>
      </View>
    </View>
  );
};

export default Header;
