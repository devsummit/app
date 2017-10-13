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
// import PulseLoader from 'react-native-pulse-loader';


import AuthLogo from '../../components/AuthLogo';
import Button from '../../components/Button';
import ModalComponent from '../../components/ModalComponent';
import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './styles';

import * as actions from './actions';
import * as selectors from './selectors';

// const Pulse = require('react-native-pulse');

const Transition = createTransition(Fade);
const background = require('./../../../assets/images/background.png');
const Logo = require('../../../assets/images/logo.png');
const Aiken = require('../../../assets/images/icon.png');
const timing = 4000;

class Main extends Component {
  constructor(props) {
    super(props);
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    // this.spinValue = new Animated.Value(0);
  }

  // setAnimation = (effect) => {
  //   switch (effect) {
  //     case 'scale':
  //       this.setState({ animate: this.scaleValue, type: 'scale' })
  //       this.scale()

  //       break;

  //     case 'moveit':
  //       const margin300 = this.divideScale.interpolate({
  //           inputRange: [0, 0.5, 1],
  //           outputRange: [0, 300, 0]
  //       })
  //       this.setState({ movingMargin: margin300 })
  //       this.moveit()

  //       break;

  //     case 'stopmove':
  //       const movingMargin = this.divideScale.interpolate({
  //           inputRange: [0, 0.5, 1],
  //           outputRange: [0, 0, 0]
  //       })
  //       this.setState({ movingMargin: movingMargin })
  //       this.stopmove()

  //       break;

  //     case 'spin':
  //        const spin = this.spinValue.interpolate({
  //           inputRange: [0, 1],
  //           outputRange: ['0deg', '360deg']
  //        })
  //        this.setState({ animate: spin })
  //        this.spin()

  //        break;

  //     case 'stopspin':
  //       const stopSpin = this.spinValue.interpolate({
  //         inputRange: [0, 1],
  //         outputRange: ['0deg', '0deg']
  //       })
  //       this.setState({ animate: stopSpin })
  //       this.stopSpin()

  //       break;


  //     default:
  //       break;
  //   }
  // }

  // moveit = () => {
  //   this.divideScale.setValue(0.3)
  //       Animated.timing(
  //         this.divideScale,
  //         {
  //           toValue: 1,
  //           duration: 1000,
  //           easing: Easing.bounce
  //         }
  //       ).start(() => this.moveit())
  // }

  state = {
    modalVisible: false,
    modalVisibleAnimation: false,
    // fadeAnim: new Animated.Value(0),
    // movingMargin: null
  };

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

  // componentDidMount () {
  //   this.spin();
  //   Animated.timing(                  // Animate over time
  //     this.state.fadeAnim,            // The animated value to drive
  //     {
  //       toValue: 1,                   // Animate to opacity: 1 (opaque)
  //       duration: 10000,              // Make it take a while
  //     }
  //   ).start();
  // }
  // spin () {
  //   this.spinValue.setValue(0)
  //   Animated.timing(
  //     this.spinValue,
  //     {
  //       toValue: 1,
  //       duration: timing,
  //       easing: Easing.linear
  //     }
  //   ).start(() => this.spin())
  // }

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

    // const movingMargin = this.spinValue.interpolate({
    //   inputRange: [0, 0.5, 1],
    //   outputRange: [-300, 300, 0]
    // })

    // let { fadeAnim } = this.state;
    const { fields, isLoading } = this.props;
    const { username, password, email } = fields || '';
    const visible = false;
    // const spin = this.spinValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: ['0deg', '360deg']
    // })
    /* This also works, to show functions instead of strings */
    // const getStartValue = () => '0deg'
    // const getEndValue = () => '360deg'
    // const spin = this.spinValue.interpolate({
    //  inputRange: [0, 1],
    //  outputRange: [getStartValue(), getEndValue()]
    //  })
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

                  <Modal
                    animationType="slide"
                    transparent={false}
                    visible={isLoading}
                    onRequestClose={() => {this.setModalVisibleAnimation(false)}}
                    >
                    <Image source={background} style={styles.background}>
                    <View style={{margin: 150}}>
                      <View style={{
                          flex: 0,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {/* <Animated.Image
                          source={Aiken}
                          style={{ 
                            height: this.imageHeight,
                            opacity: this.state.fadeAnim, // Binds directly
                            transform: [{
                              translateY: this.state.fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                              }),
                            }]
                          }}
                          resizeMode="contain"
                        /> */}
                        {/* <Pulse color='orange' numPulses={3} diameter={400} speed={20} duration={2000} /> */}
                        <Bounceable
                          onPress={()=>{this.onPress}}
                          level={1.5}>
                          <Animated.Image
                            source={Aiken}
                            style={{ 
                              height: this.imageHeight,
                            }}
                            resizeMode="contain"
                          />
                        </Bounceable>
                        <Progress.Bar indeterminate width={200} />
                      </View>
                    </View>
                  </Image>
                  </Modal>

                  {/* <TouchableHighlight onPress={() => {
                    this.setModalVisibleAnimation(true)
                  }}>
                    <Text>Show Modal</Text>
                  </TouchableHighlight> */}
                <View style={styles.lineSection}>
                  <View style={styles.lineTextThree} />
                  <Text style={styles.lineTextFour}> or </Text>
                  <View style={styles.lineTextThree} />
                </View>
              ) : (
                <View>
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
                          <ActivityIndicator size={'large'} color={'#FFFFFF'} />
                        ) : (
                          <Text>Log In</Text>
                        )}
                      </Button>
                    )}
                    <View style={styles.lineSection}>
                      <View style={styles.lineTextThree} />
                      <Text style={styles.lineTextFour}> or </Text>
                      <View style={styles.lineTextThree} />
                    </View>
                    <Button
                      style={[ styles.button, { backgroundColor: '#FFD740', margin: 12, justifyContent: 'center' } ]}
                      onPress={() => {
                        this.props.loginTwitter();
                      }}
                    >
                      { isLoading ?
                        <ActivityIndicator size={'large'} color={'#FFFFFF'} /> :
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
                      }
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
              )}
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
