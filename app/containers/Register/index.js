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
import ValidationComponent from 'react-native-form-validator';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createTransition, Fade } from 'react-native-transition';

const Transition = createTransition(Fade);

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

const rules = {
    firstName: { required: true},
    lastName: { required: true},
    email: {email: true},
    username: {required: true},
    password: {minlength: 3},
};

export default class Register extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            useEmail: false,
            firstName: '',
            lastName: '',
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
            if (responseJson.success) {

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
            {! this.state.useEmail && 
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
                    <Button warning block style={styles.button} onPress={() => this.setState({useEmail: true})}>
                        <Icon name="envelope" color="white" style={styles.icon} />
                        <Text style={styles.buttonText} >Email</Text>
                    </Button>
                </Content>
            }

            {/* if use email  */}
            { this.state.useEmail && 
              <Transition>
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
              </Transition>
            }
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)'
  },
  title: {
    fontSize: 18,
    backgroundColor: '#efefef',
    padding: 8,
    paddingLeft: 20,
    marginBottom: 20,
  },
  button: {
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    textAlign: 'center',
    flex: 9,
  },
  picker: {
    margin: 12
  },
  labelText: {
      fontSize: 12,
      opacity: 0.6
  },
  icon: {
    textAlign: 'left',
    flex: 1,
    fontSize: 18,
  }
});