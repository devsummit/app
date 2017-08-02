import React, { Component } from 'react';
import { Container, Content, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { StyleSheet, Image } from 'react-native';


export default class Main extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          
          <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />

          <Button style={styles.button}>
            <Icon name="login" color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Login</Text>
          </Button>

          <Button success style={styles.button}>
            <Icon name="notebook" color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Register</Text>
          </Button>

          <Button info style={styles.button}>
            <Icon name="envelope-letter" color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Newsletter</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent:'space-between',
  },
  button: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    elevation: 3,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    flex: 7,
  },
  logo: {
    height: 150,
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    flex: 1,
    marginBottom: 20,
  },
  icon: {
    textAlign: 'left',
    flex: 1,
    fontSize: 18,
  }
});