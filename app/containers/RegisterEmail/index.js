import React, { Component } from 'react';
import {
  Container,
  Content,
  Button,
  Text
} from 'native-base';
import { Alert, Image, View, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CheckBox from 'react-native-icon-checkbox';

import InputItem from '../../components/InputItem';
import AuthLogo from '../../components/AuthLogo';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';


const background = require('../../../assets/images/background.png');

class RegisterEmail extends Component {
  /*
     * initialize some state
     */
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
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
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.isRegistered.status !== this.props.isRegistered.status) {
      if (this.props.isRegistered.message !== '' && this.props.isRegistered.title !== ' ') {
        Toast.show(this.props.isRegistered.title.concat(', ').concat(this.props.isRegistered.message));
      }

      setTimeout(() => {
        this.onAlertOk();
      }, 3000);

      this.props.updateRegisterStatus(false, '', '');
    }
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  onAlertOk = () => {
    Actions.main();
  }
  /*
    * validate all fields before submission
    */
  isFieldError = () => {
    const { errorFields } = this.props;
    const {
      errorFirstName,
      errorLastName,
      errorUserName,
      errorEmail,
      errorPassword
    } = errorFields;

    return (
      errorFirstName ||
      errorLastName ||
      errorEmail ||
      errorUserName ||
      errorPassword
    );
  }

  submitRegistration = () => {
    if (this.isFieldError()) {
      Alert.alert('Warning', 'Field is not complete');
    } else {
      this.props.register();
    }
  }

  handleButtonClick = (value) => {
    this.props.updateRegisterMethod(value);
  }

  handleInputChange = (field, value) => {
    this.props.updateInputFields(field, value);
    this.props.updateErrorFields(`error_${field}`, value = !(value.length > 0));
  }

  // email validation
  checkEmail = (inputvalue) => {
    const pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    if (pattern.test(inputvalue)) return true;
    return false;
  }

  handlePressCheckedBox = (checked) => {
    this.setState({
      isChecked: checked
    });
  }

  render() {
    // destructure state
    const { inputFields, errorFields, isRegistering } = this.props || {};
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      referer,
      verifyPassword
    } = inputFields || '';

    const {
      errorFirstName,
      errorLastName
    } = errorFields || false;

    const checkEmail = this.checkEmail(email) === false && email !== '';
    const checkUsername = typeof (username) !== 'undefined' && username.length < 4 && username !== '';
    const checkPassword = password.length < 4 && password !== '';
    const checkVerifyPassword = verifyPassword !== '' && verifyPassword !== password;

    return (
      <Image style={styles.background} source={background}>
        <Container style={styles.container}>
          <AuthLogo style={styles.logo} />
          <Content>
            <View style={styles.formSection}>
              <InputItem
                error={errorFirstName}
                style={styles.formInput}
                placeholder="First name"
                placeholderTextColor={'#BDBDBD'}
                onChangeText={text => this.handleInputChange('firstName', text)}
                value={firstName}
              />
              <InputItem
                error={errorLastName}
                style={styles.formInput}
                placeholder="Last name"
                placeholderTextColor={'#BDBDBD'}
                onChangeText={text => this.handleInputChange('lastName', text)}
                value={lastName}
              />
              {checkEmail ?
                <Text style={styles.errorInput}>invalid email address</Text>
                :
                null
              }
              <InputItem
                error={checkEmail}
                style={styles.formInput}
                placeholder="Email"
                placeholderTextColor={'#BDBDBD'}
                onChangeText={text => this.handleInputChange('email', text)}
                value={email}
              />
              {checkUsername ?
                <Text style={styles.errorInput}>username should be 4 at minimum</Text>
                :
                null
              }
              <InputItem
                error={checkUsername}
                style={styles.formInput}
                placeholder="Username"
                placeholderTextColor={'#BDBDBD'}
                onChangeText={text => this.handleInputChange('username', text)}
                value={username}
              />
              {checkPassword ?
                <Text style={styles.errorInput}>password should be 4 at minimum</Text>
                :
                null
              }
              <InputItem
                error={checkPassword}
                style={styles.formInput}
                placeholder="Password"
                placeholderTextColor={'#BDBDBD'}
                secureTextEntry
                onChangeText={text => this.handleInputChange('password', text)}
                value={password}
              />
              {checkVerifyPassword ?
                <Text style={styles.errorInput}>passwords do not match</Text>
                :
                null
              }
              <InputItem
                error={checkVerifyPassword}
                style={styles.formInput}
                placeholder="Verify Password"
                placeholderTextColor={'#BDBDBD'}
                secureTextEntry
                onChangeText={text => this.handleInputChange('verifyPassword', text)}
                value={verifyPassword}
              />
            </View>
            <View style={{ flex: 1, padding: 5 }}>
              <CheckBox
                label="Use Referer"
                size={30}
                checked={this.state.isChecked}
                onPress={this.handlePressCheckedBox}
              />
              {this.state.isChecked ?
                <InputItem
                  style={styles.formInput}
                  placeholder="Referer Name"
                  placeholderTextColor={'#BDBDBD'}
                  onChangeText={text => this.handleInputChange('referer', text)}
                  value={referer}
                />
                :
                null
              }
              {/* You can use other Icon */}
              {/* Here is the example of Radio Icon */}
            </View>
            {((username && username.length < 4) || password.length < 4 || firstName === '' || lastName === '') || (this.checkEmail(email) === false && email !== '') || (verifyPassword !== password) ?
              <View>
                <Button
                  block
                  style={[ styles.button, { backgroundColor: 'rgba(0,0,0,0.3)' } ]}
                  onPress={() => this.submitRegistration()}
                >
                  <Text style={styles.buttomText}>Register</Text>
                </Button>
              </View>
              :
              <Button
                block
                style={styles.button}
                primary
                onPress={() => this.submitRegistration()}
              >
                {isRegistering ?
                  <ActivityIndicator size={'large'} color={'#FFFFFF'} /> :
                  <Text style={styles.buttomText}>Register</Text>
                }
              </Button>
            }
            <Button
              onBlur="register()"
              transparent
              style={styles.buttonRegister}
              onPress={() => { Actions.main(); }}
            >
              <Text style={styles.registerText}>{'Already have account?'}</Text>
              <Text style={styles.registerTextBold}>{'Sign In'}</Text>
            </Button>
          </Content>
        </Container>
      </Image>
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
  updateErrorFields: PropTypes.func.isRequired
};

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  inputFields: selectors.getInputFields(),
  errorFields: selectors.getErrorFields(),
  registerMethod: selectors.getRegisterMethod(),
  isRegistering: selectors.getIsRegistering(),
  isRegistered: selectors.getRegisterStatus()
});

export default connect(mapStateToProps, actions)(RegisterEmail);
