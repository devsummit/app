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
        this.setState({role: 'Attendee'});
    }

    handleInputChange = (text) => {
        // 
    }

    submit = () => {
        let rules = {
            firstName: { required: true},
            email: {email: true},
        };

        if(this.validate(rules)){
            this.handleSubmit(this.state);
        }else{
            this.setState((state = this.state) => {
                state.isError.firstName = this.isFieldInError('firstName');
                state.isError.lastName = this.isFieldInError('lastName');
                state.isError.email = this.isFieldInError('email');
                state.isError.username = this.isFieldInError('username');
                state.isError.username = this.isFieldInError('username');
                state.isError.password = this.isFieldInError('password');
                return state;
            });
            // Alert.alert('', this.getErrorMessages());
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
    return (
      <Container style={styles.container}>
        <Content>
            <Form>
                <Item floatingLabel error={this.state.isError.firstName}>
                    <Label>First Name</Label>
                    <Input onChangeText={(text) => this.setState({firstName: text})} value={this.state.firstName} />
                </Item>
                <Item floatingLabel error={this.state.isError.lastName}>
                    <Label>Last Name</Label>
                    <Input onChangeText={(text) => this.setState({lastName: text})} value={this.state.lastName} />
                </Item>
                <Item floatingLabel error={this.state.isError.email}>
                    <Label>Email</Label>
                    <Input onChangeText={(text) => this.setState({email: text})} value={this.state.email} />
                </Item>
                <Item floatingLabel error={this.state.isError.username}>
                    <Label>Username</Label>
                    <Input  onChangeText={(text) => this.setState({username: text})} value={this.state.username} />
                </Item>
                <Item floatingLabel error={this.state.isError.password}>   
                    <Label>Password</Label>
                    <Input secureTextEntry={true} onChangeText={(text) => this.setState({password: text})} value={this.state.password} />
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