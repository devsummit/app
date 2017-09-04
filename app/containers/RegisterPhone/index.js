import React, { Component } from 'react';
import {
  Container,
  Content,
  Picker,
  Item,
  Button,
  Text,
  Spinner
} from 'native-base';
import { Alert, Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AccountKit, {
  LoginButton
} from 'react-native-facebook-account-kit';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';

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
    isEmailValid: false,
    fromLogin: false
  };
  /*
     * initialize some state
     */
  componentWillMount() {
    if (this.props.fromLogin === true) {
      this.setState({ fromLogin: true });
    }
    this.props.resetState();
    this.props.updateInputFields('role', 'attendee');
    this.configureAccountKit();
  }

  componentWillReceiveProps(prevProps) {
    const { fromLogin } = this.state;
    if (fromLogin && fromLogin === true) {
      this.setState({ fromLogin: false });
      Alert.alert('You are not registered, please register first.');
    }

    if (prevProps.isRegistering !== this.props.isRegistering) {
      return;
    }
    if (prevProps.isRegistered.status !== this.props.isRegistered.status) {
      if (this.props.isRegistered.message.length > 0) {
        Alert.alert(
          this.props.isRegistered.title,
          this.props.isRegistered.message,
          [
            { text: 'OK', onPress: this.props.isRegistered.title === 'Failed' ? () => { } : this.onAlertOk }
          ],
          { cancelable: false }
        );
      }
      this.props.updateRegisterStatus(false, '', '');
    }
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  onAlertOk = () => {
    Actions.main();
  }

  onLogin(token) {
    if (!token) {
      this.setState({});
    } else {
      AccountKit.getCurrentAccessToken().then((_token) => {
        this.props.toggleIsRegistering(true);
        this.props.updateInputFields('token', _token.token);
      });
      AccountKit.getCurrentAccount()
        .then((account) => {
          const phone = account.phoneNumber.countryCode + account.phoneNumber.number;
          this.props.updateInputFields('provider', 'mobile');
          this.props.updateInputFields('userName', phone);
          this.props.updateInputFields('socialId', account.id);
          this.submitRegistration();
        });
    }
  }

  configureAccountKit = () => {
    AccountKit.configure({
      countryWhitelist: ['ID'],
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

  submitRegistration = () => {
    if (this.isFieldError()) {
      Alert.alert('Warning', 'Field is not complete');
    } else {
      this.props.register();
      this.props.inputFields.email = '';
      this.props.inputFields.firstName = '';
      this.props.inputFields.lastName = '';
    }
  }

  /*
    * validate all fields before submission
    */
  isFieldError = () => {
    const { errorFields } = this.props;
    const {
      errorFirstName,
      errorLastName,
      errorEmail
    } = errorFields;

    return (
      errorFirstName ||
      errorLastName ||
      errorEmail
    );
  }

  validateEmail = () => {
    const email = this.props.inputFields.email;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(email);
    (isValid) ? this.validEmail(email) : this.invalidEmail();
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
      <Button style={[styles.button, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
        <Text style={styles.buttonText}>
          FIELDS ARE NOT COMPLETE
        </Text>
      </Button>
    );
  }

  render() {
    if (this.props.isRegistering) {
      return (
        <Container>
          <Content>
            <Spinner color={PRIMARYCOLOR} />
          </Content>
        </Container>
      );
    }
    // destructure state
    const { inputFields, errorFields } = this.props || {};
    const {
      firstName,
      lastName,
      email,
      role
    } = inputFields || '';

    const {
      errorFirstName,
      errorLastName,
      errorEmail
    } = errorFields || false;

    return (
      <Image style={styles.background} source={background}>
        <Container style={styles.container}>
          <Content>
            <AuthLogo />
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
              <InputItem
                error={errorEmail}
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
              (this.props.inputFields.firstName.length !== 0 &&
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

RegisterPhone.propTypes = {
  updateErrorFields: PropTypes.func.isRequired,
  isRegistered: PropTypes.object.isRequired,
  isRegistering: PropTypes.bool.isRequired,
  updateInputFields: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  updateRegisterStatus: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  inputFields: PropTypes.object.isRequired,
  errorFields: PropTypes.object.isRequired,
  toggleIsRegistering: PropTypes.func.isRequired,
  fromLogin: PropTypes.bool // eslint-disable-line react/require-default-props
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

export default connect(mapStateToProps, actions)(RegisterPhone);
