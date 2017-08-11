import React, { Component } from 'react';
import {
  Form,
  Item,
  Label,
  Input,
  Text
} from 'native-base';
import { View } from 'react-native';
import styles from './styles';

export default class InputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onFocus: false
    }
  }
  handleOnFocus = () => {
    this.setState({
      onFocus: true
    })
  }
    handleOnBlur = () => {
      this.setState({
        onFocus: false
      })
    }
    render() {
      return (
        <View>
          <Form>
            <Item floatingLabel error={this.props.error} >
              <Label style={[this.props.error ? styles.errorLabel :
                styles.normalLabel, this.state.onFocus || this.props.value.length > 0 ? styles.normalOnFocusLabel :
                styles.normalOnBlurLabel]}
              >
                {this.props.title}
              </Label>
              <Input
                secureTextEntry={this.props.secureTextEntry}
                onChangeText={this.props.onChangeText}
                value={this.props.value}
                onFocus={() => { this.handleOnFocus(); }}
                onBlur={() => { this.handleOnBlur(); }}
              />
            </Item>
          </Form>
        </View>
      );
    }
}
