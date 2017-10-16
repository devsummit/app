import React, { Component } from 'react';

import { createTransition, Fade } from 'react-native-transition';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAccessToken } from '../Main/selectors';
import SplashScreen from '../../components/Splash/SplashScreen';
import Api from '../../services/api';

const Transition = createTransition(Fade);

class Splash extends Component {
  constructor() {
    super();
    this.state = {
      isActive: true
    };
  }

  componentDidMount() {
    if (this.props.accessToken && this.props.accessToken !== '') {
      Api.setAuthorizationToken(this.props.accessToken);
      Actions.main({ type: 'replace' });
    } else {
      Actions.mainTabs({ type: 'replace' });
    }
  }

  render() {
    return <SplashScreen />;
  }
}


const mapStateToProps = () => createStructuredSelector({
  accessToken: getAccessToken()
});

export default connect(mapStateToProps, null)(Splash);
