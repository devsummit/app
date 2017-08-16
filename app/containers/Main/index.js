import React, { Component } from 'react';
import { Container, Content, Text, Form, Input, Item, Label } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image, View, Alert, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

// import redux componens
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InputItem from '../../components/InputItem';
import Button from '../../components/Button';
import styles from './styles';

import * as actions from './actions';
import * as selectors from './selectors';

const Logo = require('../../../assets/images/logo.png');

class Main extends Component {
  onLogin = () => {
    this.props.login();
  }

  loginFacebook = () => {
    this.props.loginFacebook();
  }

  handleInputChange = (field, value) => {
    this.props.updateFields(field, value);
  }

  render() {
    const { fields, isLoggedIn } = this.props;
    const { username, password } = fields || '';
    if (isLoggedIn) {
      Actions.mainTabs({ profileData: this.props.profileData })
    }
    return (
      <Container style={styles.container}>
        <Content>
          <LinearGradient colors={['#3F51B5', '#6200EA']}>
            <View style={styles.headerSection}>
              <Image source={Logo} style={styles.logo} />
              <Text style={styles.titleText}>DevSummit</Text>
            </View>
          </LinearGradient>
          <View style={styles.formSection}>
            <InputItem
              title="Username"
              onChangeText={usernameText => this.handleInputChange('username', usernameText)}
              value={username}
            />
            <InputItem
              title="Password"
              secureTextEntry
              onChangeText={passwordText => this.handleInputChange('password', passwordText)}
              value={password}
            />
          </View>
          <View style={styles.buttonSection}>
            {(username === '' || password === '') ?
              <Button disabled block style={[ styles.button, { elevation: 0 } ]}>
                <Text>Log In</Text>
              </Button>
              :
              <Button primary block style={styles.button} onPress={() => { this.onLogin(); }}>
                <Text>Log In</Text>
              </Button>
            }
            <View style={styles.lineSection}>
              <View style={styles.lineTextOne} />
              <Text style={styles.lineTextTwo}> or </Text>
              <View style={styles.lineTextOne} />
            </View>
            <Button primary style={styles.button}>
              <Icon name="phone" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Phone</Text>
            </Button>
            <Button primary style={styles.button} onPress={() => { this.loginFacebook(); }}>
              <Icon name="facebook" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Facebook</Text>
            </Button>
            <Button danger style={styles.button} onPress={() => {this.props.loginGoogle()}}>
              <Icon name="google-plus" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Google</Text>
            </Button>
            <Button info style={styles.button} onPress={() => {this.props.loginTwitter()}}>
              <Icon name="twitter" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Twitter</Text>
            </Button>
            <Button transparent style={styles.buttonRegister} onPress={() => { Actions.registerMenu() }}>
              <Text style={styles.registerText}>Don't have an account?</Text>
              <Text style={styles.registerTextBold}> Register</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  fields: selectors.getFields(),
  isLoggedIn: selectors.isLoggedIn(),
  profileData: selectors.getProfileData()
});

export default connect(mapStateToProps, actions)(Main);
