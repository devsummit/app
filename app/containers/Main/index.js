import React, { Component } from 'react';
import { Container, Content, Text, Spinner, Item, Input, Header } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  Alert,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Animated,
  Keyboard,
  Easing,
  Modal,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AccountKit, { LoginButton } from 'react-native-facebook-account-kit';

import { createTransition, Fade } from 'react-native-transition';
import { getProfileEmail } from '../../helpers';

// import redux componens
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
// import * as TouchableBounce from 'react-native-touchable-bounce';
import Bounceable from "react-native-bounceable";
import PulseLoader from 'react-native-pulse-loader';

import LoadingScreen from '../../components/LoadingScreen';
import AuthLogo from '../../components/AuthLogo';
import Button from '../../components/Button';
import ModalComponent from '../../components/ModalComponent';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './styles';

import * as actions from './actions';
import * as selectors from './selectors';

const Pulse = require('react-native-pulse');

const Transition = createTransition(Fade);
const background = require('./../../../assets/images/background.png');
const Logo = require('../../../assets/images/logo.png');
const Aiken = require('../../../assets/images/icon.png');
const timing = 4000;

class Main extends Component {
  constructor(props) {
    super(props);
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    this.state = {
      modalVisible: false,
      modalVisibleAnimation: false,
      invisible: false
    };
  }

  componentWillMount() {
    this.configureAccountKit();
    getProfileEmail().then((profileEmail) => {
      if (profileEmail) {
        this.handleInputChange('username', profileEmail);
      } else {
        this.handleInputChange('username', '');
      }
    });
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
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

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
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
  };

  setModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  setModalVisibleAnimation = () => {
    this.setState({ modalVisibleAnimation: !this.state.modalVisibleAnimation});
  };

  setInvisible = () => {
    this.setState({ invisible: !this.state.invisible });
  }

  configureAccountKit = () => {
    AccountKit.configure({
      countryWhitelist: [ 'ID' ],
      defaultCountry: 'ID',
      initialPhoneCountryPrefix: '+62',
      initialPhoneNumber: ' '
    });
  };

  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT
    }).start();
  };

  loginFacebook = () => {
    this.props.loginFacebook();
  };

  handleInputChange = (field, value) => {
    this.props.updateFields(field, value);
  };

  subscribeNewsletter = () => {
    Alert.alert('lala');
  };

  render() {
    const { fields, isLoading } = this.props;
    const { username, password, email } = fields || '';
    const visible = false;
    return (
      <KeyboardAvoidingView style={styles.container} behaviour="padding">
        <Image source={background} style={styles.background}>
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.logo}>
                <Animated.Image
                  source={Logo}
                  style={{ height: this.imageHeight }}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.formSection}>
                <Item regular style={styles.item}>
                  <Input
                    style={styles.formInput}
                    placeholder="Username or Email"
                    placeholderTextColor={'#BDBDBD'}
                    keyboardType={'email-address'}
                    autoCapitalize={'none'}
                    onChangeText={usernameText => this.handleInputChange('username', usernameText)}
                    value={username}
                  />
                </Item>
                <Item regular style={styles.item}>
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
                {username.length < 4 || password.length < 4 ? (
                  <Button
                    disabled
                    block
                    style={[ styles.button, { backgroundColor: 'rgba(0,0,0,0.3)' } ]}
                  >
                    <Text>Log In</Text>
                  </Button>
                ) : (
                  <Button
                    primary
                    block
                    style={styles.button}
                    onPress={() => {
                      this.onLogin();
                    }}
                  >
                    {isLoading ? (
                      <View>
                        <ActivityIndicator size={'large'} color={'#FFFFFF'} />
                      </View>
                    ) : (
                      <View>
                        <Text>Log In</Text>
                      </View>
                    )}
                  </Button>
                )}
                <TouchableOpacity
                  onPress={() => this.setInvisible(true)}
                >
                  <Text style={styles.forgotText}>Forgotten Password?</Text>
                </TouchableOpacity>

                {/* Modal Loading Screen */}
                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={isLoading}
                  onRequestClose={() => this.setModalVisibleAnimation(false)}
                >
                  <LoadingScreen />
                </Modal>

                {/* Modal Reset Password */}
                <Modal
                  animationType="fade"
                  visible={this.state.invisible}
                  onRequestClose={() => this.setInvisible(false)}
                >
                  <View style={{ flex: 1 }}>
                    <View style={styles.modal}>
                      <TouchableOpacity onPress={() => this.setInvisible(false)}>
                        <Icon
                          name="chevron-left"
                          size={22}
                          style={{padding: 10}}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.sectionModal}>
                      <Item style={{ marginBottom: 20 }}>
                        <Input
                          style={styles.inputForgetPass}
                          placeholder="Email"
                          placeholderTextColor={'#BDBDBD'}
                          keyboardType={'email-address'}
                          autoCapitalize={'none'}
                          onChangeText={emailText => this.handleInputChange('email', emailText)}
                        />
                      </Item>
                      {!email ? (
                        <Text style={{ textAlign: 'center'}}>Please enter your email address to reset your password</Text>
                      ) : (
                        <Button
                          primary
                          block
                          style={styles.buttonResetPassword}
                          onPress={() => {
                            this.onLogin();
                          }}
                        >
                          <View>
                            <Text>RESET YOUR PASSOWORD</Text>
                          </View>
                        </Button>
                      )}
                    </View>
                  </View>
                </Modal>
                <View style={styles.lineSection}>
                  <View style={styles.lineTextThree} />
                  <Text style={styles.lineTextFour}> or </Text>
                  <View style={styles.lineTextThree} />
                </View>
                <Button
                  style={[ styles.button, { backgroundColor: '#FFD740', margin: 12 } ]}
                  onPress={() => {
                    this.props.loginTwitter();
                  }}
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
                  onPress={() => {
                    Actions.registerMenu();
                  }}
                >
                  <View>
                    <Text style={styles.registerText}>{"Don't have an account?"}</Text>
                    <Text style={styles.registerTextBold}>Register</Text>
                  </View>
                </Button>
                {visible ? (
                  <Button
                    hidden
                    transparent
                    style={styles.buttonRegister}
                    onPress={() => {
                      this.setModalVisible();
                    }}
                  >
                    <Text style={styles.registerText}>Subscribe to Newsletter</Text>
                  </Button>
                ) : (
                  <View />
                )}
              </View>
            </View>
          </ScrollView>
        </Image>
      </KeyboardAvoidingView>
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
