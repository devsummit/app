import React, { Component } from 'react'
import { View } from 'react-native'
import  { Button as ButtonNativeBase } from 'native-base'
import { Actions } from 'react-native-router-flux'

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
        setTimeout(function() { this.setState({onClick: false}); }.bind(this), 2000);
    }

    render() {
        return (
            <ButtonNativeBase
                {...this.props}
                onPress = {() => {!this.state.onClick ? this.onClickButton(this.props.onPress) : null}}
            >
                {this.props.children}
            </ButtonNativeBase>
        )
    }
}