import React, { Component } from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text
} from 'native-base';
import { StyleSheet, Alert, AsyncStorage } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)'
  },
  button: {
    margin: 12
  },
  buttonText: {
    textAlign: 'center'
  },
  picker: {
    margin: 12
  },
  labelText: {
    fontSize: 12,
    opacity: 0.6
  }
});

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false
    };
  }

  onLogin = (usernameInput, passwordInput) => {
    fetch('http://private-f30431-devsummit.apiary-mock.com/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput
      })
    }).then(response => response.json())
      .then(async (responseJson) => {
        if (responseJson.message === 'user logged in succesfully') {
          try {
            await AsyncStorage.setItem('access_token', responseJson.result.access_token);
            await AsyncStorage.setItem('refresh_token', responseJson.result.refresh_token);
          } catch (error) {
            Alert.alert(
              'Failed',
              'Failed to store token',
            );
          }

          this.setState({ loggedIn: true });
          Alert.alert(
            'Success',
            'Login Success',
          );
        }
      })
      .catch(() => {
        Alert.alert(
          'Login Failed',
          'Something is wrong, try again later.',
        );
      });
  }

  render() {
    if (this.state.loggedIn) {
      // Actions.register()
    }

    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={username => this.setState({ username })} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry onChangeText={password => this.setState({ password })} />
            </Item>
          </Form>
          <Button
            primary
            block
            style={styles.button}
            onPress={() => this.onLogin(this.state.username, this.state.password)}
          >
            <Text style={styles.buttomText}>Log In</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
