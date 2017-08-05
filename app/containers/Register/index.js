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
import { createTransition, Fade } from 'react-native-transition';
import styles from './styles';

// import redux components
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'

import * as actions from './actions';
import * as selectors from './selectors'

const Transition = createTransition(Fade);

const role_option = [
    { 
        value: "key0",
        label: "attendee"
    },
    { 
        value: "key1",
        label: "booth"
    },
    { 
        value: "key2",
        label: "speaker"
    }
];

class Register extends Component {

    constructor(props) {
        super(props);
    }

    /*
     * initialize some state
     */
    componentWillMount() {
        this.props.updateInputFields('role', 'attendee');
    }

    handleInputChange = (field, value) => {
        this.props.updateInputFields(field, value);
        this.props.updateErrorFields('error_' + field, value = value.length > 0 ? false: true);
    }

    handleButtonClick = (value) => {
        this.props.updateRegisterMethod(value);
    }

    submitRegistration = () => {
        if (this.isFieldError()) {
            Alert.alert('Warning', 'Field is not complete');
        } else {
            this.props.register();
        }
    }

    /*
     * validate all fields before submission
     */
    isFieldError = () => {
        const { errorFields } = this.props;
        const { error_first_name, error_last_name, error_username, error_email, error_password } = errorFields;
        return (
            error_first_name || error_last_name || error_email || error_username || error_password
        );
    }

    render() {
        if(this.props.isRegistering) {
            console.log('isregistering...');
            return;
        }

        // destructure state
        const { registerMethod, inputFields, errorFields } = this.props || {};
        const { first_name, last_name, username, email, password, role } = inputFields || '';
        const { error_first_name, error_last_name, error_username, error_email, error_password } = errorFields || false;

        return (
            <Container style={styles.container}>
                { registerMethod === 'undefined' && 
                    <Content>
                        <Text style={styles.title}>Register with: </Text>
                        <Button block style={styles.button} >
                            <Icon name="facebook" color="white" style={styles.icon} />
                            <Text style={styles.buttonText} >Facebook</Text>
                        </Button>
                        <Button info block style={styles.button} > 
                            <Icon name="twitter" color="white" style={styles.icon} />
                            <Text style={styles.buttonText} >Twitter</Text>
                        </Button>
                        <Button danger block style={styles.button} > 
                            <Icon name="google-plus" color="white" style={styles.icon} />
                            <Text style={styles.buttonText} >Google</Text>
                        </Button>
                        <Button warning block style={styles.button} onPress={() => this.handleButtonClick('email')}>
                            <Icon name="envelope" color="white" style={styles.icon} />
                            <Text style={styles.buttonText} >Email</Text>
                        </Button>
                    </Content>
                }

                { registerMethod === 'email' && 
                  <Transition>
                    <Content>
                        <Form>
                            <Item floatingLabel error={error_first_name}>
                                <Label>First Name</Label>
                                <Input onChangeText={(text) => this.handleInputChange('first_name', text)} value={first_name} />
                            </Item>
                            <Item floatingLabel error={error_last_name}>
                                <Label>Last Name</Label>
                                <Input onChangeText={(text) => this.handleInputChange('last_name', text)} value={last_name} />
                            </Item>
                            <Item floatingLabel error={error_email}>
                                <Label>Email</Label>
                                <Input onChangeText={(text) => this.handleInputChange('email', text)} value={email} />
                            </Item>
                            <Item floatingLabel error={error_username}>
                                <Label>Username</Label>
                                <Input onChangeText={(text) => this.handleInputChange('username', text)} value={username} />
                            </Item>
                            <Item floatingLabel error={error_password}>   
                                <Label>Password</Label>
                                <Input secureTextEntry={true} onChangeText={(text) => this.handleInputChange('password', text)} value={password} />
                            </Item>

                            <Picker
                                style={styles.picker}
                                placeholder="Role"
                                mode="dropdown"
                                selectedValue={role}
                                onValueChange={(value) => this.handleInputChange('role', value)}
                                >
                                {role_option.map((component) => (
                                    <Item key={component.value} label={component.label} value={component.label} />
                                ))}
                            </Picker>

                        </Form>
                        <Button primary block style={styles.button} onPress={() => this.submitRegistration()}>
                            <Text style={styles.buttomText}>Register</Text>
                        </Button>
                    </Content>
                  </Transition>
                }
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
})

export default connect(mapStateToProps, actions)(Register);