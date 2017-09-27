import React, { Component } from 'react';
import { func } from 'prop-types';
import {
  Container,
  Content,
  Text
} from 'native-base';
import { View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { twitter } from 'react-native-simple-auth';


// import redux componens
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import strings from '../../localization';
import Button from '../../components/Button';
import AuthLogo from '../../components/AuthLogo';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';

const background = require('../../../assets/images/background.png');

class RegisterMenu extends Component {
  registerFacebook = () => {
    this.props.registerFacebook();
  }

  registerTwitter = () => {
    this.props.registerTwitter();
  }

  render() {
    return (
      <Image style={styles.background} source={background}>
        <Container style={styles.container}>
          <AuthLogo style={styles.logo} />
          <Content>
            <Button
              warning
              block
              style={styles.button}
              onPress={() => { Actions.registerEmail(); }}
            >
              <Icon name="envelope" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>{strings.register.withEmail}</Text>
            </Button>
            <Button style={[ styles.button, { backgroundColor: '#FFD740' } ]} onPress={() => { Actions.registerPhone(); }}>
              <Icon name="phone" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>{strings.register.withPhone}</Text>
            </Button>
            <Button
              transparent
              style={styles.buttonRegister}
              onPress={() => { Actions.main(); }}
            >
              <Text style={styles.registerText}>{strings.register.alreadyHave}</Text>
              <Text style={styles.registerTextBold}>{strings.register.signIn}</Text>
            </Button>
          </Content>
        </Container>
      </Image>
    );
  }
}

RegisterMenu.propTypes = {
  registerFacebook: func
};

const mapStateToProps = createStructuredSelector({
  isRegistered: selectors.isRegistered()
});

export default connect(mapStateToProps, actions)(RegisterMenu);
