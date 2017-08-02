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

export default class Login extends Component {
    render() {
    return (
      <Container style={styles.container}>
        <Content>
            <Form>
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
                <Text style={styles.buttomText}>Log In</Text>
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