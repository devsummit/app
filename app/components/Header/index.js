import React, { Component } from 'react';
import {
  Text,
  Button,
  FooterTab,
  Footer,
  Content,
  Container
} from 'native-base';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

const Header = (props) => {
  return (
    <View style={styles.headerBase}>
      <LinearGradient colors={['#3F51B5', '#6200EA']}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.pageTitle}>{props.title}</Text>
            <View style={styles.pointSection}>
              <Icon name="coin" style={styles.coin}/>
              <Text style={styles.points}> 1000 pts</Text>
            </View>
          </View>
          <View style={styles.content}>
            {props.children}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

export default Header;
