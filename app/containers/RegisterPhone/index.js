import React, { Component } from 'react';
import { Container, Content, Picker, Item, Button, Text, Spinner } from 'native-base';
import { Alert, Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AccountKit, { LoginButton } from 'react-native-facebook-account-kit';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CheckBox from 'react-native-icon-checkbox';

import strings from '../../localization';
import InputItem from '../../components/InputItem';
import AuthLogo from '../../components/AuthLogo';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';

// import constants
import { role_option, PRIMARYCOLOR } from '../../constants';

const background = require('../../../assets/images/background.png');

// @flow
type Props = {
  errorFields: Object,
  inputFields: Object<mixed>,
  isRegistered: Object<mixed>,
  isRegistering: boolean
};

type errorFields = {
  errorEmail: boolean,
  errorFirstName: boolean,
  errorLastName: boolean,
  errorPassword: boolean,
  errorPhone: boolean,
  errorUserName: boolean
};

type inputFields = {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  referer: string,
  role: string,
  socialId: number,
  userName: string
};

type isRegistered = {
  message: string,
  status: boolean,
  title: string
};

type State = {
  fromLogin: boolean,
  isChecked: boolean,
  isEmailValid: boolean
};

class RegisterPhone extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isEmailValid: false,
      fromLogin: false,
      isChecked: false
    };
  }
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
      Alert.alert(strings.register.notRegistered);
    }

    if (prevProps.isRegistering !== this.props.isRegistering) {
      return;
    }
    if (prevProps.isRegistered.status !== this.props.isRegistered.status) {
      if (this.props.isRegistered.message.length > 0) {
        const isFailed = this.props.isRegistered.title === 'Failed';
        Alert.alert(
          this.props.isRegistered.title,
          this.props.isRegistered.message,
          [
            {
              text: isFailed ? strings.global.ok : 'Login',
              onPress: isFailed ? () => {} : this.onAlertOk
            }
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
    Actions.mainTabs();
  };

  onLogin(token) {
    if (!token) {
      this.setState({});
    } else {
      AccountKit.getCurrentAccessToken().then((_token) => {
        this.props.toggleIsRegistering(true);
        this.props.updateInputFields('token', _token.token);
      });
      AccountKit.getCurrentAccount().then((account) => {
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
      countryWhitelist: [ 'ID' ],
      defaultCountry: 'ID',
      initialPhoneCountryPrefix: '+62',
      initialPhoneNumber: ' '
    });
  };

  handleInputChange = (field: string, value: string) => {
    this.validateEmail();
    this.props.updateInputFields(field, value);
    this.props.updateErrorFields(`error_${field}`, (value = !(value.length > 0)));
  };

  submitRegistration = () => {
    if (this.isFieldError()) {
      Alert.alert(strings.global.warning, strings.register.fieldNotComplete);
    } else {
      this.props.register(() => Actions.mainTabs());
      this.props.inputFields.email = '';
      this.props.inputFields.firstName = '';
      this.props.inputFields.lastName = '';
    }
  };

  /*
    * validate all fields before submission
    */
  isFieldError = () => {
    const { errorFields } = this.props;
    const { errorFirstName, errorLastName, errorEmail } = errorFields;

    return errorFirstName || errorLastName || errorEmail;
  };

  validateEmail = () => {
    const email = this.props.inputFields.email;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = re.test(email);
    isValid ? this.validEmail(email) : this.invalidEmail();
  };

  validateEmailOnBlur = () => {
    if (!this.state.isEmailValid) Toast.show('Email is invalid');
  };

  validEmail = (email: string) => {
    this.setState({
      isEmailValid: true
    });
    this.props.updateInputFields('email', email);
  };

  invalidEmail = () => {
    this.setState({
      isEmailValid: false
    });
  };

  handlePressCheckedBox = (checked: boolean) => {
    this.setState({
      isChecked: checked
    });
  };

  // email validation
  checkEmail = (inputvalue: string) => {
    const pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    if (pattern.test(inputvalue)) return true;
    return false;
  };

  // name validation
  checkName = (value: string) => {
    const pattern = /([^a-zA-Z0-9_-])/g;
    if (pattern.test(value)) return false;
    return true;
  };

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
          <Text style={styles.buttonText}>{strings.register.withPhone}</Text>
        </LoginButton>
      </Button>
    );
  }

  renderErrorButton = () => {
    return (
      <Button style={[ styles.button, { backgroundColor: 'rgba(0,0,0,0.3)' } ]}>
        <Text style={styles.buttonText}>{strings.register.fieldNotComplete}</Text>
      </Button>
    );
  };

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
    const { inputFields } = this.props || {};
    const { firstName, lastName, email, role, referer } = inputFields || '';
    // form checker
    const checkEmail = this.checkEmail(email) === false && email !== '';
    const checkFirstName = this.checkName(firstName) === false && firstName !== '';
    const checkLastName = this.checkName(lastName) === false && lastName !== '';
    return (
      <Image style={styles.background} source={background}>
        <Container style={styles.container}>
          <AuthLogo style={styles.logo} />
          <Content>
            <View style={styles.formSection}>
              {checkFirstName ?
                <Text style={styles.errorInput}>{strings.register.errorFirstName}</Text>
                : null }
              <InputItem
                itemStyle={styles.item}
                error={checkFirstName}
                style={styles.formInput}
                placeholder={strings.register.firstName}
                placeholderTextColor={'#BDBDBD'}
                onChangeText={text => this.handleInputChange('firstName', text)}
                value={firstName}
              />
              {checkLastName ?
                <Text style={styles.errorInput}>{strings.register.errorLastName}</Text>
                : null }
              <InputItem
                itemStyle={styles.item}
                error={checkLastName}
                style={styles.formInput}
                placeholder={strings.register.lastName}
                placeholderTextColor={'#BDBDBD'}
                onChangeText={text => this.handleInputChange('lastName', text)}
                value={lastName}
              />
              {checkEmail ?
                <Text style={styles.errorInput}>{strings.register.errorInvalidEmail}</Text>
                : null }
              <InputItem
                itemStyle={styles.item}
                error={checkEmail}
                style={styles.formInput}
                placeholder={strings.register.email}
                placeholderTextColor={'#BDBDBD'}
                onChangeText={text => this.handleInputChange('email', text)}
                value={email}
              />
            </View>
            <View style={{ flex: 1, padding: 5 }}>
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
                <Text style={{ color: 'grey', fontSize: 10, lineHeight: 22 * 0.8, backgroundColor: 'transparent' }}> (Optional) </Text>
              </View>
              {this.state.isChecked ? (
                <View style={{ marginHorizontal: 20 }}>
                  <InputItem
                    itemStyle={styles.item}
                    style={styles.formInput}
                    placeholder={strings.register.refererName}
                    placeholderTextColor={'#BDBDBD'}
                    onChangeText={text => this.handleInputChange('referer', text)}
                    value={referer}
                  />
                </View>
              ) : null}
              {/* You can use other Icon */}
              {/* Here is the example of Radio Icon */}
            </View>
            {this.props.inputFields.firstName.length !== 0 &&
            this.props.inputFields.email.length !== 0 &&
            !checkEmail
              ? this.renderLoginButton()
              : this.renderErrorButton()}
          </Content>
        </Container>
        <Button
          transparent
          style={styles.buttonRegister}
          onPress={() => {
            Actions.main();
          }}
        >
          <Text style={styles.registerText}>{strings.register.alreadyHave}</Text>
          <Text style={styles.registerTextBold}>{strings.register.signIn}</Text>
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
