import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './style';
import strings from '../../localization';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: ''
    };
  }

  render() {
    return (
      <Text>{this.props.count}{''}</Text>
    );
  }
}
