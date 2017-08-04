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
    Text
} from 'native-base';
import { StyleSheet, Alert } from 'react-native';
import ValidationComponent from 'react-native-form-validator';

const role = [
    { 
        value: "key0",
        label: "Attendee"
    },
    { 
        value: "key1",
        label: "Booth"
    },
    { 
        value: "key2",
        label: "Speaker"
    }
];

export default class Register extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            LastName: '',
            role: '',
            email: '',
            password: '',
            username: '',
            isError: {
                "firstName": false,
                "lastName": false,
                "email": false,
                "password": false,
                "username": false,
            }
        }
    }

    onValueChange (value: string) {
        this.setState({
            role : value
        });
    }

    componentWillMount(){
        this.isFieldInError('firstName')
        this.setState({role: 'Attendee'});
    }

    handleInputChange = async (field, value) => {
        await this.setValue(field, value)

        const rules = {
            firstName: { required: true},
            lastName: { required: true},
            email: {email: true},
            username: {required: true},
            password: {minlength: 3},
        };

        if(!this.validate(rules)){
            this.setState((prevState)=>{
                var isError = prevState.isError
                isError[field] = this.isFieldInError(field)
                return {isError}
            });
        }

    }

    // set input state value
    setValue = (field, value) => {
        const change = {}
        change[field] = value
        this.setState(change)
    }

    submit = () => {
        // console.log(this.validate(this.rules));
        // this.validate(this.rules);
        const rules = {
            firstName: { required: true},
            lastName: { required: true},
            email: {email: true},
            username: {required: true},
            password: {minlength: 3},
        };

        if(this.validate(rules)){
            this.handleSubmit(this.state);
        }else{
            const fields = ['firstName', 'lastName', 'email', 'username', 'password'];
            fields.forEach((field)=>{
                this.handleInputChange(field, this.state[field]);
            })
        }
    }

    handleSubmit = (data) => {
        fetch('http://private-31720-devsummit.apiary-mock.com/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                first_name: data.firstName,
                last_name: data.lastName,
                role: data.role,
                username: data.username,
                email: data.email,
                password: data.password,
            })
        }).then((response) => response.json())
        .then(async (responseJson) => {
            if (responseJson.message === 'user succesfully registered') {

                this.setState({loggedIn: true})
                Alert.alert(
                    'Success',
                    'Register Success',
                )
            }
        })
        .catch((error) => {
            Alert.alert(
                'Register Failed',
                'Something is wrong, try again later.',
            )
        });
    }
    render() {
        console.log(this.state);

    return (
      <Container style={styles.container}>
        <Content>
            <Form>
                <Item floatingLabel error={this.state.isError.firstName}>
                    <Label>First Name</Label>
                    <Input onChangeText={(text) => this.handleInputChange('firstName', text)} value={this.state.firstName} />
                </Item>
                <Item floatingLabel error={this.state.isError.lastName}>
                    <Label>Last Name</Label>
                    <Input onChangeText={(text) => this.handleInputChange('lastName', text)} value={this.state.lastName} />
                </Item>
                <Item floatingLabel error={this.state.isError.email}>
                    <Label>Email</Label>
                    <Input onChangeText={(text) => this.handleInputChange('email', text)} value={this.state.email} />
                </Item>
                <Item floatingLabel error={this.state.isError.username}>
                    <Label>Username</Label>
                    <Input onChangeText={(text) => this.handleInputChange('username', text)} value={this.state.username} />
                </Item>
                <Item floatingLabel error={this.state.isError.password}>   
                    <Label>Password</Label>
                    <Input secureTextEntry={true} onChangeText={(text) => this.handleInputChange('password', text)} value={this.state.password} />
                </Item>
                
                <Picker
                    style={styles.picker}
                    placeholder="Role"
                    mode="dropdown"
                    selectedValue={this.state.role}
                    onValueChange={this.onValueChange.bind(this)}
                    >
                    {role.map((component) => (
                        <Item key={component.value} label={component.label} value={component.label} />
                    ))}
                </Picker>
                
            </Form>
            <Button primary block style={styles.button} onPress={() => this.submit()}>
                <Text style={styles.buttomText}>Register</Text>
            </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)'
  },
  button: {
    margin: 12,
  },
  buttonText: {
    textAlign: 'center',
  },
  picker: {
    margin: 12
  },
  labelText: {
      fontSize: 12,
      opacity: 0.6
  }
});