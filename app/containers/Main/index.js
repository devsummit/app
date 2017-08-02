import React, { Component } from 'react';
import { Container, Content, Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';


export default class Main extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content>

          <Button success full style={styles.button}>
            <Text>Register</Text>
          </Button>

          <Button full style={styles.button}>
            <Text>Login</Text>
          </Button>

          <Button info full style={styles.button}>
            <Text style={styles.buttomText}>News</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, flexDirection: 'row',
    alignItems: 'center', 
    justifyContent:'space-between',
  },
  button: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 5,
  },
  buttonText: {
    textAlign: 'center',
  }
});