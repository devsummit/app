import React, { Component } from 'react';
import { Container, Content, Text, Spinner, Item, Input, Header } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Image,
  View,
  Alert,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AccountKit, {
  LoginButton
} from 'react-native-facebook-account-kit';

import { createTransition, Fade } from 'react-native-transition';

// import redux componens
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import AuthLogo from '../../components/AuthLogo';
import Button from '../../components/Button';
import ModalComponent from '../../components/ModalComponent';
import styles from './styles';

import * as actions from './actions';
import * as selectors from './selectors';

const Transition = createTransition(Fade);
const background = require('./../../../assets/images/background.png');

class Main extends Component {
  state = {
    modalVisible: false
  }

  componentWillMount() {
    this.configureAccountKit();
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
      Actions.mainTabs();
      this.props.updateIsLogIn(false);
    }
    if (prevProps.isSubscribed !== this.props.isSubscribed) {
      Alert.alert('Success', 'You have been subscribed, we will send update to your email');
      this.props.updateIsSubscribed(false);
    }
  }


  onLoginMobile(token) {
    if (!token) {
      this.setState({});
    } else {
      AccountKit.getCurrentAccessToken().then((_token) => {
        this.props.loginMobile(_token.token);
      });
    }
  }


  onLogin = () => {
    this.props.login();
  }

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  configureAccountKit = () => {
    AccountKit.configure({
      countryWhitelist: [ 'ID' ],
      defaultCountry: 'ID',
      initialPhoneCountryPrefix: '+62',
      initialPhoneNumber: '87809000750'
    });
  }

  loginFacebook = () => {
    this.props.loginFacebook();
  }

  handleInputChange = (field, value) => {
    this.props.updateFields(field, value);
  }

  subscribeNewsletter = () => {
    Alert.alert('lala');
  }

  render() {
    const { fields, isLoading } = this.props;
    const { username, password, email } = fields || '';
    const visible = false;
    return (
      <Image style={styles.background} source={background}>
        <Container style={styles.container}>
          <StatusBar hidden />
          <AuthLogo style={styles.logo} />
          <Content>
            <View style={styles.formSection}>
              <Item rounded style={styles.item}>
                <Input
                  style={styles.formInput}
                  placeholder="Username"
                  placeholderTextColor={'#BDBDBD'}
                  onChangeText={usernameText => this.handleInputChange('username', usernameText)}
                  value={username}
                />
              </Item>
              <Item rounded style={styles.item}>
                <Input
                  style={styles.formInput}
                  placeholder="Password"
                  placeholderTextColor={'#BDBDBD'}
                  secureTextEntry
                  onChangeText={passwordText => this.handleInputChange('password', passwordText)}
                  value={password}
                />
              </Item>
            </View>
            <View>
              {(username.length < 4 || password.length < 4) ?
                <Button disabled block style={[ styles.button, { backgroundColor: 'rgba(0,0,0,0.3)' } ]}>
                  <Text>Log In</Text>
                </Button>
                :
                <Button primary block style={styles.button} onPress={() => { this.onLogin(); }}>
                  { isLoading ?
                    <ActivityIndicator size={'large'} color={'#FFFFFF'} /> :
                    <Text>Log In</Text>
                  }
                </Button>
              }
              <View style={styles.lineSection}>
                <View style={styles.lineTextThree} />
                <Text style={styles.lineTextFour}> or </Text>
                <View style={styles.lineTextThree} />
              </View>
              <Button
                style={[ styles.button, { backgroundColor: '#FFD740', margin: 12 } ]}
                onPress={() => { this.props.loginTwitter(); }}
              >
                <LoginButton
                  style={styles.buttonLoggin}
                  type="phone"
                  onLogin={token => this.onLoginMobile(token)}
                  onError={e => this.onLoginMobile(e)}
                  primary
                  block
                >
                  <Icon name="phone" color="white" style={styles.icon} />
                  <Text style={styles.buttonText}>LOGIN WITH PHONE NUMBER</Text>
                </LoginButton>
              </Button>
              <Button
                transparent
                style={styles.buttonRegister}
                onPress={() => { Actions.registerMenu(); }}
              >
                <Text style={styles.registerText}>{"Don't have an account?"}</Text>
                <Text style={styles.registerTextBold}>Register</Text>
              </Button>
              {visible ? <Button
                hidden
                transparent
                style={styles.buttonRegister}
                onPress={() => { this.setModalVisible(); }}
              >
                <Text style={styles.registerText}>Subscribe to Newsletter</Text>
              </Button> : <View />}
            </View>
          </Content>
        </Container>
      </Image>
    );
  }
}

Main.propTypes = {

  isLoggedIn: PropTypes.bool.isRequired,
  updateIsLogIn: PropTypes.func.isRequired,
  isSubscribed: PropTypes.bool.isRequired,
  updateIsSubscribed: PropTypes.func.isRequired,
  loginMobile: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loginFacebook: PropTypes.func.isRequired,
  updateFields: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  subscribeNewsletter: PropTypes.func.isRequired,
  loginGoogle: PropTypes.func.isRequired,
  loginTwitter: PropTypes.func.isRequired
};

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  fields: selectors.getFields(),
  isSubscribed: selectors.getIsSubscribed(),
  isLoggedIn: selectors.getIsLoggedIn(),
  isLoading: selectors.getIsLoading()
  // @TODO please create the selectors function
  // profileData: selectors.getProfileData()
});

export default connect(mapStateToProps, actions)(Main);
