import React, { Component } from 'react';

import { createTransition, Fade } from 'react-native-transition';
import { Actions } from 'react-native-router-flux';
import { getAccessToken } from '../../helpers';
import SplashScreen from './SplashScreen';
import { createStructuredSelector } from 'reselect';

const Transition = createTransition(Fade);

export default class Splash extends Component {
  constructor() {
    super();
    this.state = {
      isActive: true
    };
  }

  componentDidMount() {
  }

  render() {
    return <SplashScreen />;
  }
}
