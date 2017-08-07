import React, { Component } from 'react';
import { 
    Container,
    Header,
    Content, 
    Form,
    List,
    ListItem,
    Picker,
    Item,
    Label,
    Input,
    Button, 
    Text,
    Title
} from 'native-base';
import { StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

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
        this.props.updateInputFields(field, value);
        this.props.updateErrorFields('error_' + field, value = value.length > 0 ? false: true);
    }

    // handleButtonClick = (value) => {
    //     this.props.updateRegisterMethod(value);
    // }

    submitRegistration = () => {
        
    }

    render() {

        // destructure state
        const { inputFields, errorFields } = this.props || {};
        const { current_password, new_password, confirm_password } = inputFields || '';
        const { error_current_password, error_new_password, error_confirm_password } = errorFields || false;
        return (
            <Container style={styles.container}>
                    <Content>
                        <Form>
                            <Item floatingLabel error={error_current_password}>   
                                <Label>Current Password</Label>
                                <Input secureTextEntry={true} onChangeText={(text) => this.handleInputChange('current_password', text)} value={current_password} />
                            </Item>
                            <Item floatingLabel error={error_new_password}>   
                                <Label>New Password</Label>
                                <Input secureTextEntry={true} onChangeText={(text) => this.handleInputChange('new_password', text)} value={new_password} />
                            </Item>
                            <Item floatingLabel error={error_confirm_password}>   
                            <Label>Confirm New Password</Label>
                                <Input secureTextEntry={true} onChangeText={(text) => this.handleInputChange('confirm_password', text)} value={confirm_password} />
                            </Item>
                        </Form>
                        {(current_password === '' || new_password === '' || confirm_password === '') ?
                            <Button disabled block style={[styles.button, {elevation: 0}]}>
                                <Text style={styles.buttomText}>Change Password</Text>
                            </Button>
                        :
                            <Button primary block style={styles.button} onPress={() =>this.submitRegistration()}>
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