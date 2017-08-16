import React, { Component } from 'react'
import { ListItem as ListItemNativeBase } from 'native-base'

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onClick: false
    }
  }
  onClickButton = (inputFunction) => {
    this.setState({ onClick: true })
    inputFunction()
    setTimeout(() => { this.setState({onClick: false}) }, 2000);
  }

  render() {
    return (
      <ListItemNativeBase
        {...this.props}
        onPress={() => { !this.state.onClick ? this.onClickButton(this.props.onPress) : null }}
      >
        {this.props.children}
      </ListItemNativeBase>
    )
  }
}
