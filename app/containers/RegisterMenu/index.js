import React, { Component } from 'react';
import { func } from 'prop-types';
import {
  Container,
  Content,
  Text
} from 'native-base';
import { View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { twitter } from 'react-native-simple-auth';


// import redux componens
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '../../components/Button';
import AuthLogo from '../../components/AuthLogo';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';

const Logo = require('../../../assets/images/logo.png');

class RegisterMenu extends Component {
  registerFacebook = () => {
    this.props.registerFacebook();
  }

  registerTwitter = () => {
    this.props.registerTwitter();
  }

  render() {
    return (
      <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('./../../../assets/images/background.png')}>
        <Container style={styles.container}>
          <Content>
            <AuthLogo />
            <View style={styles.lineSection}>
              <View style={styles.lineTextThree} />
              <Text style={styles.lineTextFour}> Register with social media </Text>
              <View style={styles.lineTextThree} />
            </View>
            <View style={styles.buttonSocialSection}>
              <Button block style={styles.buttonSocial} onPress={() => { this.registerFacebook(); }} >
                <Icon name="facebook" color="white" style={styles.iconSocial} />
              </Button>
              <Button info block style={styles.buttonSocial} onPress={this.registerTwitter} >
                <Icon name="twitter" color="white" style={styles.iconSocial} />
              </Button>
              <Button danger block style={styles.buttonSocial} onPress={() => { this.props.registerGoogle(); }}>
                <Icon name="google-plus" color="white" style={styles.iconSocial} />
              </Button>
            </View>
            <View style={styles.lineSection}>
              <View style={styles.lineTextOne} />
              <Text style={styles.lineTextTwo}> or </Text>
              <View style={styles.lineTextOne} />
            </View>
            <Button warning block style={styles.button} onPress={() => { Actions.registerEmail(); }}>
              <Icon name="envelope" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Register with Email</Text>
            </Button>
            <Button style={[ styles.button, { backgroundColor: '#FFD740' } ]} onPress={() => { Actions.registerPhone(); }}>
              <Icon name="phone" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Register with Phone</Text>
            </Button>
          </Content>
        </Container>
        <Button
          transparent
          style={styles.buttonRegister}
          onPress={() => { Actions.main(); }}
        >
          <Text style={styles.registerText}>{"Already have account?"}</Text>
          <Text style={styles.registerTextBold}>Sign In</Text>
        </Button>
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
