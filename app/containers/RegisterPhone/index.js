import React, { Component } from 'react';
import {
  Container,
  Content,
  Form,
  Picker,
  Item,
  Label,
  Input,
  Button,
  Text
} from 'native-base';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AccountKit, {
  LoginButton,
  Color,
  StatusBarStyle,
} from 'react-native-facebook-account-kit'
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InputItem from '../../components/InputItem';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';

// import constants
import { role_option, primaryColor } from '../../constants';


class RegisterPhone extends Component {

  state = {
    isEmailValid: false
  };
  /*
     * initialize some state
     */
  componentWillMount() {
    console.log(this.props)

    this.props.updateInputFields('role', 'attendee');
    this.configureAccountKit();
  }


  onLogin(token) {
    if (!token) {
      console.warn('User canceled login')
      this.setState({})
    } else {
      AccountKit.getCurrentAccessToken().then((_token) => {
        this.props.updateInputFields('token', _token.token)
      })
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
      countryWhitelist: ["ID"],
      defaultCountry: "ID",
      initialPhoneCountryPrefix: '+62',
      initialPhoneNumber: '87809000750',
    })
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
      Actions.pop();
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
      <Button style={styles.button}>
        <Text style={styles.buttonText}>
          FIELDS ARE NOT COMPLETE
        </Text>
      </Button>
    );
  }

  render() {
    if (this.props.isRegistering) {
      console.log('isregistering...');
      return;
    }
    if (this.props.isRegistered) {
      Alert.alert('Status', 'user registered successfully');
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
      <Container style={styles.container}>
        <Content>
          <InputItem
            error={error_first_name}
            title="First Name"
            onChangeText={text => this.handleInputChange('first_name', text)}
            value={first_name}
          />
          <InputItem
            error={error_last_name}
            title="Last Name"
            onChangeText={text => this.handleInputChange('last_name', text)}
            value={last_name}
          />
          <InputItem
            error={error_email}
            title="Email"
            value={email}
            onChangeText={text => this.handleInputChange('email', text)}
            onBlur={text => this.validateEmailOnBlur()}
          />
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
          {
            (this.props.inputFields.first_name.length !== 0 &&
              this.props.inputFields.email.length !== 0 && this.state.isEmailValid) ?
              this.renderLoginButton() :
              this.renderErrorButton()
          }

        </Content>
      </Container>
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
