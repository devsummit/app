import React, { Component } from 'react';
import {
  Form,
  Item,
  Input
} from 'native-base';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
          <Item
            rounded
            error={this.props.error}
            style={this.props.error ?
              [ styles.item, { borderColor: '#F44336' } ] :
              styles.item}
          >
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
              maxLength={this.props.maxLength}
              multiline={this.props.multiline}
            />
            {this.props.error ?
              <Icon name={'error-outline'} color={'#F44336'} style={styles.icon} /> : <View />
            }
          </Item>
        </Form>
      </View>
    );
  }
}
