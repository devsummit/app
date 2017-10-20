import React, { Component } from 'react';
import { Container, Content, Button, Text } from 'native-base';
import {
  Alert,
  Image,
  View,
  ActivityIndicator,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CheckBox from 'react-native-icon-checkbox';
import { getProfileEmail } from '../../helpers';

import InputItem from '../../components/InputItem';
import strings from '../../localization';
import AuthLogo from '../../components/AuthLogo';
import * as actions from './actions';
import * as selectors from './selectors';
import { isConfirm } from '../../helpers';

const background = require('../../../assets/images/background.png');
const Logo = require('../../../assets/images/logo.png');

import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './styles';

class RegisterEmail extends Component {
  /*
     * initialize some state
     */
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }
  componentWillMount() {
    this.props.updateInputFields('role', '');
    this.props.updateInputFields('referer', '');
    if (this.props.prefilledData) {
      this.props.updateInputFields('firstName', this.props.prefilledData.firstName);
      this.props.updateInputFields('lastName', this.props.prefilledData.lastName);
      this.props.updateInputFields('email', this.props.prefilledData.email);
      this.props.updateInputFields('social_id', this.props.prefilledData.social_id);
      this.props.updateInputFields('username', this.props.prefilledData.username);
    }
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.isRegistered.status !== this.props.isRegistered.status) {
      if (this.props.isRegistered.message !== '' && this.props.isRegistered.title !== ' ') {
        Toast.show(
          this.props.isRegistered.title.concat(', ').concat(this.props.isRegistered.message)
        );
      }
      this.props.updateRegisterStatus(false, '', '');
    }
  }

  componentWillUnmount() {
    this.props.resetState();
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

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

  /*
    * validate all fields before submission
    */
  isFieldError = () => {
    const { errorFields } = this.props;
    const { errorFirstName, errorLastName, errorUserName, errorEmail, errorPassword } = errorFields;

    return errorFirstName || errorLastName || errorEmail || errorUserName || errorPassword;
  };

  submitRegistration = () => {
    if (this.isFieldError()) {
      Alert.alert('Warning', 'Field is not complete');
    } else {
      this.props.register(() => Actions.mainTabs());
    }
  };

  handleButtonClick = (value) => {
    this.props.updateRegisterMethod(value);
  };

  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
    this.props.updateErrorFields(`error_${field}`, (value = !(value.length > 0)));
  };

  // email validation
  checkEmail = (inputvalue) => {
    const pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    if (pattern.test(inputvalue)) return true;
    return false;
  };

  // name validation
  checkName = (value) => {
    const pattern = /([^a-zA-Z0-9_\ -])/g;
    if (pattern.test(value)) return false;
    return true;
  };

  handlePressCheckedBox = (checked) => {
    this.setState({
      isChecked: checked
    });
  };

  render() {
    // destructure state
    const { inputFields, isRegistering } = this.props || {};
    const { firstName, lastName, username, email, password, referer, verifyPassword } =
      inputFields || '';

    // form checker
    const checkEmail = this.checkEmail(email) === false && email !== '';
    const checkFirstName = this.checkName(firstName) === false && firstName !== '';
    const checkLastName = this.checkName(lastName) === false && lastName !== '';
    const checkUsername = typeof username !== 'undefined' && username.length < 4 && username !== '';
    const validateUsername = this.checkName(username) === false && username !== '';
    const checkPassword = password.length < 4 && password !== '';
    const checkVerifyPassword = verifyPassword !== '' && verifyPassword !== password;

    return (
      <KeyboardAvoidingView style={styles.container} behaviour="padding">
        <Image style={styles.background} source={background}>
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
                {checkFirstName ? (
                  <Text style={styles.errorInput}>{strings.register.errorFirstName}</Text>
                ) : null}
                <InputItem
                  itemStyle={styles.item}
                  error={checkFirstName}
                  style={styles.formInput}
                  placeholder={strings.register.firstName}
                  placeholderTextColor={'#BDBDBD'}
                  onChangeText={text => this.handleInputChange('firstName', text)}
                  value={firstName}
                />
                {checkLastName ? (
                  <Text style={styles.errorInput}>{strings.register.errorLastName}</Text>
                ) : null}
                <InputItem
                  itemStyle={styles.item}
                  error={checkLastName}
                  style={styles.formInput}
                  placeholder={strings.register.lastName}
                  placeholderTextColor={'#BDBDBD'}
                  onChangeText={text => this.handleInputChange('lastName', text)}
                  value={lastName}
                />
                {checkEmail ? (
                  <Text style={styles.errorInput}>{strings.register.errorInvalidEmail}</Text>
                ) : null}
                <InputItem
                  itemStyle={styles.item}
                  error={checkEmail}
                  style={styles.formInput}
                  placeholder={strings.register.email}
                  placeholderTextColor={'#BDBDBD'}
                  onChangeText={text => this.handleInputChange('email', text)}
                  value={email}
                />
                {checkUsername ? (
                  <Text style={styles.errorInput}>{strings.register.errorUsernameLenght}</Text>
                ) : null}
                { validateUsername ? (
                  <Text style={styles.errorInput}>{strings.register.errorUsername}</Text>
                ) : null}
                <InputItem
                  itemStyle={styles.item}
                  error={checkUsername}
                  style={styles.formInput}
                  placeholder={strings.register.username}
                  placeholderTextColor={'#BDBDBD'}
                  onChangeText={text => this.handleInputChange('username', text)}
                  value={username}
                />
                {checkPassword ? (
                  <Text style={styles.errorInput}>{strings.register.errorPasswordLenght}</Text>
                ) : null }
                <InputItem
                  itemStyle={styles.item}
                  error={checkPassword}
                  style={styles.formInput}
                  placeholder={strings.register.password}
                  placeholderTextColor={'#BDBDBD'}
                  secureTextEntry
                  onChangeText={text => this.handleInputChange('password', text)}
                  value={password}
                />
                {checkVerifyPassword ? (
                  <Text style={styles.errorInput}>{strings.register.errorNotMatch}</Text>
                ) : null}
                <InputItem
                  itemStyle={styles.item}
                  error={checkVerifyPassword}
                  style={styles.formInput}
                  placeholder={strings.register.verifyPassword}
                  placeholderTextColor={'#BDBDBD'}
                  secureTextEntry
                  onChangeText={text => this.handleInputChange('verifyPassword', text)}
                  value={verifyPassword}
                />
              </View>

              <View style={{ flex: 1 }}>
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
                >
                  <CheckBox
                    color={'#FFF'}
                    iconStyle={{ color: '#FFF', marginLeft: 16 }}
                    labelStyle={{ color: '#FFF' }}
                    label={strings.register.useReferer}
                    size={30}
                    checked={this.state.isChecked}
                    onPress={this.handlePressCheckedBox}
                  />
                  <Text style={{ color: 'grey', fontSize: 10, lineHeight: 22 * 0.8 }}> (Optional) </Text>
                </View>
                {this.state.isChecked ? (
                  <View style={{ marginHorizontal: 20 }}>
                    <InputItem
                      itemStyle={styles.item}
                      style={styles.formInput}
                      placeholder={strings.register.referalCode}
                      placeholderTextColor={'#BDBDBD'}
                      onChangeText={text => this.handleInputChange('referer', text)}
                      value={referer}
                    />
                  </View>
                ) : null}
                {/* You can use other Icon */}
                {/* Here is the example of Radio Icon */}
              </View>

              {username === '' ||
              username.length < 4 ||
              password.length < 4 ||
              firstName === '' ||
              lastName === '' ||
              (this.checkEmail(email) === false && email !== '') ||
              verifyPassword !== password ? (
                <View>
                    <Button
                      block
                      style={[ styles.button, { backgroundColor: 'rgba(0,0,0,0.3)' } ]}
                      onPress={
                        () => {
                          this.submitRegistration();
                          console.log('this');
                        }
                      }
                    >
                      <Text style={styles.buttomText}>{strings.register.register}</Text>
                    </Button>
                  </View>
                ) : (
                  <Button
                    block
                    style={styles.button}
                    primary
                    onPress={() => this.submitRegistration()}
                  >
                    {isRegistering ? (
                      <ActivityIndicator size={'large'} color={'#FFFFFF'} />
                    ) : (
                      <Text style={styles.buttomText}>{strings.register.register}</Text>
                    )}
                  </Button>
                )}

              <Button
                onBlur="register()"
                transparent
                style={styles.buttonRegister}
                onPress={() => {
                  Actions.main();
                }}
              >
                <View>
                  <Text style={styles.registerText}>{strings.register.alreadyHave}</Text>
                  <Text style={styles.registerTextBold}>{strings.register.signIn}</Text>
                </View>
              </Button>
            </View>
          </ScrollView>
        </Image>
      </KeyboardAvoidingView>
    );
  }
}

RegisterEmail.propTypes = {
  updateInputFields: PropTypes.func.isRequired,
  prefilledData: PropTypes.object, // eslint-disable-line react/require-default-props
  isRegistered: PropTypes.object.isRequired,
  updateRegisterStatus: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  errorFields: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  updateRegisterMethod: PropTypes.func.isRequired,
  updateErrorFields: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isRegistering: PropTypes.bool.isRequired
};

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  inputFields: selectors.getInputFields(),
  errorFields: selectors.getErrorFields(),
  registerMethod: selectors.getRegisterMethod(),
  isRegistering: selectors.getIsRegistering(),
  isRegistered: selectors.getRegisterStatus(),
  isLoggedIn: selectors.getIsLoggedIn()
});

export default connect(mapStateToProps, actions)(RegisterEmail);
