import React, { Component } from 'react';
import {
  Container,
  Content,
  Picker,
  Item,
  Button,
  Text
} from 'native-base';
import { Alert, Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AccountKit, {
  LoginButton
} from 'react-native-facebook-account-kit';
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
import { role_option, PRIMARYCOLOR } from '../../constants';

const background = require('../../../assets/images/background.png');

class RegisterPhone extends Component {
  state = {
    isEmailValid: false
  };
  /*
     * initialize some state
     */
  componentWillMount() {
    this.props.updateInputFields('role', 'attendee');
    this.configureAccountKit();
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  onLogin(token) {
    if (!token) {
      this.setState({});
    } else {
      AccountKit.getCurrentAccessToken().then((_token) => {
        this.props.updateInputFields('token', _token.token);
      });
      AccountKit.getCurrentAccount()
        .then((account) => {
          const phone = account.phoneNumber.countryCode + account.phoneNumber.number;
          this.props.updateInputFields('provider', 'mobile');
          this.props.updateInputFields('username', phone);
          this.props.updateInputFields('social_id', account.id);
          this.submitRegistration();
        });
    }
  }

  configureAccountKit = () => {
    AccountKit.configure({
      countryWhitelist: [ 'ID' ],
      defaultCountry: 'ID',
      initialPhoneCountryPrefix: '+62',
      initialPhoneNumber: '87809000750'
    });
  }

  handleInputChange = (field, value) => {
    this.validateEmail();
    this.props.updateInputFields(field, value);
    this.props.updateErrorFields(`error_${field}`, value = !(value.length > 0));
  }

  handleButtonClick = (value) => {
    this.props.updateRegisterMethod(value);
  }

  submitRegistration = () => {
    if (this.isFieldError()) {
      Alert.alert('Warning', 'Field is not complete');
    } else {
      this.props.register();
      this.props.inputFields.email = '';
      this.props.inputFields.first_name = '';
      this.props.inputFields.last_name = '';
    }
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

  validateEmail = () => {
    const email = this.props.inputFields.email;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(email);
    (isValid) ? this.validEmail(email) : this.invalidEmail()
  };

  validateEmailOnBlur = () => {
    if (!this.state.isEmailValid) Toast.show('Email is invalid');
  }

  validEmail = (email) => {
    this.setState({
      isEmailValid: true
    });
    this.props.updateInputFields('email', email);
  };

  invalidEmail = () => {
    this.setState({
      isEmailValid: false
    });
  }

  renderLoginButton() {
    return (
      <Button style={styles.button}>
        <LoginButton
          style={styles.buttonLoggin}
          type="phone"
          onLogin={token => this.onLogin(token)}
          onError={e => this.onLogin(e)}
          primary
          block
        >
          <Text style={styles.buttonText}>REGISTER WITH PHONE</Text>
        </LoginButton>
      </Button>
    );
  }

  renderErrorButton = () => {
    return (
      <Button style={[ styles.button, { backgroundColor: 'rgba(0,0,0,0.3)' } ]}>
        <Text style={styles.buttonText}>
          FIELDS ARE NOT COMPLETE
        </Text>
      </Button>
    );
  }

  render() {
    if (this.props.isRegistering) {
      return;
    }
    if (this.props.isRegistered) {
      Alert.alert('Status', 'user registered successfully');
      Actions.pop();
    }

    // destructure state
    const { registerMethod, inputFields, errorFields } = this.props || {};
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
              <InputItem
                error={error_email}
                style={styles.formInput}
                placeholder="Email"
                placeholderTextColor={'#BDBDBD'}
                onChangeText={text => this.handleInputChange('email', text)}
                value={email}
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
                  <Item key={component.value} label={component.label} value={component.label} />
                ))}
              </Picker>
            </View>
            {
              (this.props.inputFields.first_name.length !== 0 &&
                this.props.inputFields.email.length !== 0 && this.state.isEmailValid) ?
                this.renderLoginButton() :
                this.renderErrorButton()
            }
          </Content>
        </Container>
        <Button
          transparent
          style={styles.buttonRegister}
          onPress={() => { Actions.main(); }}
        >
          <Text style={styles.registerText}>{'Already have account?'}</Text>
          <Text style={styles.registerTextBold}>{'Sign In'}</Text>
        </Button>
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

export default connect(mapStateToProps, actions)(RegisterPhone);
