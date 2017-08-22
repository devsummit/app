import React, { Component } from 'react';
import { Button as ButtonNativeBase } from 'native-base';
import PropTypes from 'prop-types';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: false
    };
  }
  onClickButton = (inputFunction) => {
    this.setState({ onClick: true });
    inputFunction();
    setTimeout(() => { this.setState({ onClick: false }); }, 2000);
  }

  render() {
    return (
      <ButtonNativeBase
        {...this.props}
        onPress={!this.state.onClick ? () => { this.onClickButton(this.props.onPress); } : null}
      >
        {this.props.children}
      </ButtonNativeBase>
    );
  }
}
