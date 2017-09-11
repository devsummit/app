import React, { Component } from 'react';
import {
  Container,
  Content,
  Picker,
  Item,
  Button,
  Text
} from 'native-base';
import { Alert, Image, View, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-simple-toast';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InputItem from '../../components/InputItem';
import AuthLogo from '../../components/AuthLogo';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';

// import constants
import { role_option } from '../../constants';

const background = require('../../../assets/images/background.png');

class RegisterEmail extends Component {
  /*
     * initialize some state
     */
  componentWillMount() {
    this.props.updateInputFields('role', 'attendee');
    if (this.props.prefilledData) {
      this.props.updateInputFields('first_name', this.props.prefilledData.first_name);
      this.props.updateInputFields('last_name', this.props.prefilledData.last_name);
      this.props.updateInputFields('email', this.props.prefilledData.email);
      this.props.updateInputFields('social_id', this.props.prefilledData.social_id);
      this.props.updateInputFields('username', this.props.prefilledData.username);
    }
  }

  componentWillReceiveProps(prevProps) {
    if (prevProps.isRegistered.status !== this.props.isRegistered.status) {
      if (this.props.isRegistered.message !== '') {
        Toast.show(this.props.isRegistered.message);
      }

      setTimeout(() => {
        this.onAlertOk();
      }, 3000);

      this.props.updateRegisterStatus(false, '', '');
    }
  }

  componentWillUnmount() {
    this.props.resetState()
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
      error_first_name,
      error_last_name,
      error_username,
      error_email,
      error_password,
      error_phone
    } = errorFields;

    return (
      error_first_name ||
      error_last_name ||
      error_email ||
      error_username ||
      error_password ||
      error_phone
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

  render() {
    // destructure state
    const { registerMethod, inputFields, errorFields, isRegistering } = this.props || {};
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      phone,
      role,
      social_id
    } = inputFields || '';

    const {
      error_first_name,
      error_last_name,
      error_username,
      error_email,
      error_password,
      error_phone
    } = errorFields || false;

    const checkEmail = this.checkEmail(email) === false && email !== '';
    const checkUsername = username.length < 4 && username !== '';
    const checkPassword = password.length < 4 && password !== '';

    return (
      <Image style={styles.background} source={background}>
        <Container style={styles.container}>
          <Content>
            <AuthLogo />
            <View style={styles.formSection}>
              <InputItem
                error={error_first_name}
                style={styles.formInput}
                placeholder="First name"
                placeholderTextColor={'#BDBDBD'}
                onChangeText={text => this.handleInputChange('first_name', text)}
                value={first_name}
              />
              <InputItem
                error={error_last_name}
                style={styles.formInput}
                placeholder="Last name"
                placeholderTextColor={'#BDBDBD'}
                onChangeText={text => this.handleInputChange('last_name', text)}
                value={last_name}
              />
              { checkEmail ?
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
              { checkUsername ?
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
              { checkPassword ?
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
            </View>
            <View style={styles.pickerWrapper}>
              <Picker
                style={styles.picker}
                placeholder="Role"
                mode="dropdown"
                selectedValue={role}
                onValueChange={value => this.handleInputChange('role', value)}
              >
                {role_option.map(component => (
                  <Item
                    key={component.value}
                    label={component.label}
                    value={component.label}
                  />
                ))}
              </Picker>
            </View>
            {(username.length < 4 || password.length < 4 || first_name === '' || last_name === '') || (this.checkEmail(email) === false && email !== '') ?
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
