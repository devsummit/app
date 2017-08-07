import React, { Component } from 'react';
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
    Button, 
    Text,
    Title
} from 'native-base';
import { StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import InputItem from '../../components/InputItem'
// import redux components
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import * as actions from './actions';
import * as selectors from './selectors'

// import constants
import { role_option } from '../../constants';

class ChangePassword extends Component {

    constructor(props) {
        super(props);
    }

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
        this.props.updateErrorFields('error_' + field, value = value.length > 0 ? false: true);
 
        if (field === 'confirm_password' && error_password_not_the_same && !value){
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
            // submit action
        }
    }

    render() {
        
        // destructure state
        const { inputFields, errorFields } = this.props || {};
        const { current_password, new_password, confirm_password } = inputFields || '';
        const { error_current_password, error_new_password, error_confirm_password, error_password_not_the_same } = errorFields || false;
        
        return (
            <Container style={styles.container}>
                    <Content>
                        <InputItem 
                            error = {error_current_password}
                            title = 'Current Password'
                            secureTextEntry = {true}
                            onChangeText = {(text) => this.handleInputChange('current_password', text)}
                            value = {current_password}
                        />
                        <InputItem 
                            error = {error_new_password}
                            title = 'New Password'
                            secureTextEntry = {true}
                            onChangeText = {(text) => this.handleInputChange('new_password', text)}
                            value = {new_password}
                        />
                        <InputItem 
                            error = {error_confirm_password}
                            title = 'Confirm New Password'
                            secureTextEntry = {true}
                            onChangeText = {(text) => this.handleInputChange('confirm_password', text)}
                            value = {confirm_password}
                        />
                        {error_password_not_the_same ? 
                            <Text style={styles.newPassValidator}>Confirm password didn't match</Text>
                        :
                            null
                        }
                        {(current_password === '' || new_password === '' || confirm_password === '') ?
                            <Button disabled block style={[styles.button, {elevation: 0}]}>
                                <Text style={styles.buttomText}>Change Password</Text>
                            </Button>
                        :
                            <Button primary block style={styles.button} onPress={() =>this.submitChangePassword()}>
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
  errorFields: selectors.getErrorFields()
})

export default connect(mapStateToProps, actions)(ChangePassword);