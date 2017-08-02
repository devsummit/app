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
import { StyleSheet } from 'react-native';
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
        },
        { 
            value: "key3",
            label: "Admin"
        },
    ]

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected1: 'key0'
        }
    }
    onValueChange (value: string) {
        this.setState({
            selected1 : value
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
                    selectedValue={this.state.selected1}
                    onValueChange={this.onValueChange.bind(this)}
                    >
                    {role.map((component) => (
                        <Item label={component.label} value={component.value} />
                    ))}
                </Picker>
                <ListItem itemDivider>
                    <Text style={styles.labelText}>FORM</Text>
                </ListItem>
                <Item floatingLabel>
                    <Label>First Name</Label>
                    <Input />
                </Item>
                <Item floatingLabel>
                    <Label>Last Name</Label>
                    <Input />
                </Item>
                <Item floatingLabel>
                    <Label>Email</Label>
                    <Input />
                </Item>
                <Item floatingLabel>
                    <Label>Username</Label>
                    <Input />
                </Item>
                <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input secureTextEntry={true}/>
                </Item>
            </Form>
            <Button primary block style={styles.button}>
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