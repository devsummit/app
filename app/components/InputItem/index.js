import React, { Component } from 'react';
import {
  Form,
  Item,
  Input
} from 'native-base';
import { View } from 'react-native';
import styles from './styles';

export default class InputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onFocus: false
    };
  }
  handleOnFocus = () => {
    this.setState({
      onFocus: true
    });
  }
  handleOnBlur = () => {
    this.setState({
      onFocus: false
    });
  }
  render() {
    return (
      <View>
        <Form>
          <Item style={styles.item} rounded error={this.props.error} >
            <Input
              style={this.props.style}
              disabled={this.props.disabled}
              secureTextEntry={this.props.secureTextEntry}
              onChangeText={this.props.onChangeText}
              placeholder={this.props.placeholder}
              placeholderTextColor={this.props.placeholderTextColor}
              value={this.props.value}
              onFocus={() => { this.handleOnFocus(); }}
              onBlur={this.props.onBlur}
            />
          </Item>
        </Form>
      </View>
    );
  }
}
