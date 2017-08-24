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
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InputItem from '../../components/InputItem';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';

// import constants
import { role_option } from '../../constants';

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

  render() {
    if (this.props.isRegistering) {
      console.log('isregistering...');
      return null;
    }
    if (this.props.isRegistered) {
      Alert.alert('Status', 'user registered successfully');
      Alert.alert(
        'Status',
        'user registered successfully',
        [
          { text: 'OK', onPress: this.onAlertOk }
        ],
        { cancelable: false }
      );
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
            onChangeText={text => this.handleInputChange('email', text)}
            value={email}
          />
          <InputItem
            error={error_username}
            title="Username"
            onChangeText={text => this.handleInputChange('username', text)}
            value={username}
          />
          <InputItem
            error={error_password}
            title="Password"
            onChangeText={text => this.handleInputChange('password', text)}
            value={password}
            secureTextEntry
          />
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
          <Button
            primary
            block
            style={styles.button}
            onPress={() => this.submitRegistration()}
          >
            <Text style={styles.buttomText}>Register</Text>
          </Button>
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

export default connect(mapStateToProps, actions)(RegisterEmail);
