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
      <LinearGradient
        colors={[ '#f39e21', '#f72d48' ]}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.pageTitle}>{props.title}</Text>
          </View>
          <View style={styles.content}>
            {props.children}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Header;
