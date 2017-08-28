import React, { Component } from 'react';
import {
  Container,
  Content,
  Picker,
  Item,
  Button,
  Text
} from 'native-base';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

// import redux components
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InputItem from '../../components/InputItem';
import styles from './styles';
import * as actions from './actions';
import * as selectors from './selectors';

// import constants
import { role_option } from '../../constants';

const Logo = require('../../../assets/images/logo.png');

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
    if (prevProps.isRegistering !== this.props.isRegistering) {
      console.log('isregistering...');
      return;
    }
    if (prevProps.isRegistered.status !== this.props.isRegistered.status) {
      Alert.alert(
        this.props.isRegistered.title,
        this.props.isRegistered.message,
        [
          { text: 'OK', onPress: this.props.isRegistered.title === 'Failed' ? () => {} : this.onAlertOk }
        ],
        { cancelable: false }
      );
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

  render() {
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
      <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('./../../../assets/images/background.png')}>
        <Container style={styles.container}>
          <Content>
            <View style={styles.headerSection}>
              <Image source={Logo} resizeMode="center" />
            </View>
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
              <InputItem
                error={error_username}
                style={styles.formInput}
                placeholder="Username"
                placeholderTextColor={'#BDBDBD'}
                onChangeText={text => this.handleInputChange('username', text)}
                value={username}
              />
              <InputItem
                error={error_password}
                style={styles.formInput}
                placeholder="Password"
                placeholderTextColor={'#BDBDBD'}
                secureTextEntry
                onChangeText={text => this.handleInputChange('password', text)}
                value={password}
              />
            </View>
            <View style={{ borderWidth: 1, borderColor: '#FFD740', borderRadius: 50, margin: 20 }}>
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
            <Button
              primary
              block
              style={styles.button}
              onPress={() => this.submitRegistration()}
            >
              <Text style={styles.buttomText}>Register</Text>
            </Button>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', margin: 16 }} onPress={() => Actions.pop()}>
              <Icon name="chevron-left" style={{ color: '#FFFFFF', fontSize: 25 }} />
              <Text style={{ fontSize: 20, color: '#FFFFFF', marginLeft: 10 }}>Back</Text>
            </TouchableOpacity>
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
