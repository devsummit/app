import React, { Component } from 'react';
// import redux components
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Container,
  Header,
  Content,
  Form,
  List,
  ListItem,
  Picker,
  Label,
  Input,
  Text,
  Title
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Alert, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import InputItem from '../../components/InputItem';
import Button from '../../components/Button';
import * as actions from './actions';
import * as selectors from './selectors';

// import constants
import { role_option } from '../../constants';

class ChangePassword extends Component {
    /*
     * initialize some state
     */
    // componentWillMount() {
    //     this.props.updateInputFields('role', 'attendee');
    // }

    handleInputChange = (field, value) => {
      const { errorFields } = this.props || {};
      const { error_password_not_the_same } = errorFields || false;

      this.props.updateInputFields(field, value);
      this.props.updateErrorFields(`error_${field}`, value = !(value.length > 0));

      if (field === 'confirm_password' && error_password_not_the_same && !value) {
        this.props.updateErrorFields('error_password_not_the_same', false);
      }
    }

    checkButtonClick = (value) => {
      this.props.updateRegisterMethod(value);
    }

    submitChangePassword = () => {
      const { inputFields, errorFields } = this.props || {};
      const { new_password, confirm_password } = inputFields || '';
      const { error_confirm_password, error_password_not_the_same } = errorFields || false;

      if (new_password !== confirm_password) {
        this.props.updateErrorFields('error_confirm_password', true);
        this.props.updateErrorFields('error_password_not_the_same', true);
      } else {
        this.props.changePassword()
      }
    }

    render() {
      // destructure state
      const { inputFields, errorFields, isPasswordUpdated, isPasswordWrong } = this.props || {};
      const { current_password, new_password, confirm_password } = inputFields || '';
      const { error_current_password, error_new_password, error_confirm_password, error_password_not_the_same } = errorFields || false;

      if (isPasswordUpdated) {
        Alert.alert('Success', 'Password changed', [{ text: 'Ok', onPress: () => Actions.mainTabs() }]);
        this.props.updateIsPasswordUpdate(false);
      }

      if (isPasswordWrong) {
        Alert.alert('Fail', 'Please make sure you input the right password');
        this.props.updateIsPasswordWrong(false)
      }

      return (
        <Container style={styles.container}>
          <Content>
            <InputItem
              error={error_current_password}
              title="Current Password"
              secureTextEntry
              onChangeText={text => {return this.handleInputChange('current_password', text)}}
              value={current_password}
              placeholder="Current Password"
            />
            <InputItem
              error={error_new_password}
              title="New Password"
              secureTextEntry
              onChangeText={text => {return this.handleInputChange('new_password', text)}}
              value={new_password}
              placeholder="New Password"
            />
            <InputItem
              error={error_confirm_password}
              title="Confirm New Password"
              secureTextEntry
              onChangeText={text => {return this.handleInputChange('confirm_password', text)}}
              value={confirm_password}
              placeholder="Confirm New Password"
            />
            {error_password_not_the_same ?
              <Text style={styles.newPassValidator}>Confirm password didn't match</Text>
              :
              null
            }
            {(current_password === '' || new_password === '' || confirm_password === '' || new_password !== confirm_password || new_password.length < 6 || confirm_password < 6 || current_password < 6 || current_password === new_password) ?
              <View>
                { ((new_password !== confirm_password)  ) ?
                  <View>
                  <Text style={styles.newPassValidator}>"both new password doesn't match"</Text>
                  { ((new_password.length < 6)) ?
                    <Text style={styles.newPassValidator}>"new password should be 6 at minimum"</Text>
                    :
                    null
                  }
                  { ((current_password === new_password)) ?
                    <Text style={styles.newPassValidator}>"current and new password can't be same"</Text>
                    :
                    null
                  }
                  </View>
                  :
                  null
                }

                <Button disabled block style={[ styles.button, { elevation: 0 } ]}>
                  <Text style={styles.buttomText}>Change Password</Text>
                </Button>

              </View>
              :
              <Button primary block style={styles.button} onPress={() => {return this.submitChangePassword()}}>
                <Text style={styles.buttomText}>Change Password</Text>
              </Button>
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
  isPasswordUpdated: selectors.getIsPasswordUpdated(),
  isPasswordWrong: selectors.getIsPasswordWrong()
});

export default connect(mapStateToProps, actions)(ChangePassword);
