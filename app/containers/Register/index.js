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
    ]

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: '',
            firstName: '',
            LastName: '',
            role: '',
            email: '',
            password: '',
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

    submit = () => {
        this.handleSubmit(this.state);
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
                <ListItem itemDivider>
                    <Text style={styles.labelText}>ROLE</Text>
                </ListItem> 
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
                <ListItem itemDivider>
                    <Text style={styles.labelText}>FORM</Text>
                </ListItem>
                <Item floatingLabel>
                    <Label>First Name</Label>
                    <Input onChangeText={(text) => this.setState({firstName: text})} value={this.state.firstName} />
                </Item>
                <Item floatingLabel>
                    <Label>Last Name</Label>
                    <Input onChangeText={(text) => this.setState({lastName: text})} value={this.state.lastName} />
                </Item>
                <Item floatingLabel>
                    <Label>Email</Label>
                    <Input onChangeText={(text) => this.setState({email: text})} value={this.state.email} />
                </Item>
                <Item floatingLabel>
                    <Label>Username</Label>
                    <Input  onChangeText={(text) => this.setState({username: text})} value={this.state.username} />
                </Item>
                <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input secureTextEntry={true} onChangeText={(text) => this.setState({password: text})} value={this.state.password} />
                </Item>
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