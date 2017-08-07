import React, { Component } from 'react';

import { createTransition, Fade } from 'react-native-transition';
import SplashScreen from './SplashScreen';

const Transition = createTransition(Fade);

export default class Splash extends Component {
  constructor() {
    super()
    this.state = {
      isActive: true
    }
  }

  componentWillMount() {
    setTimeout(() => this.toggleSplashScreen(this.state.isActive), 2000);
  }

  toggleSplashScreen(state) {
    this.setState({ isActive: !state });
  }

  render() {
    const Children = () => this.props.children;
    return this.state.isActive ? <SplashScreen /> : (
      <Transition>
        <Children />
      </Transition>
    )
  }
}
