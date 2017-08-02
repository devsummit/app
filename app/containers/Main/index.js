import React, { Component } from 'react';
import { Container, Content, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { StyleSheet, Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Main extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.header}>
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.titleText}>DevSummit</Text>
          </View>
          <View style={styles.buttons}>
            <Button style={styles.button} onPress={() => Actions.login()}>
              <Icon name="login" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Login</Text>
            </Button>

            <Button success style={styles.button} onPress={() => Actions.register()}>
              <Icon name="notebook" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Register</Text>
            </Button>

            <Button info style={styles.button}>
              <Icon name="envelope-letter" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>Newsletter</Text>
            </Button>
          </View>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(255,255,255)',
    flex: 1, 
    flexDirection: 'row', 
    justifyContent:'space-between',
  },
  header: {
    backgroundColor: '#0D47A1',
    paddingBottom: 110,
    paddingTop: 110,
  },
  buttons: {
    marginTop: 25
  },
  button: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    flexDirection: 'row',
    flex: 1,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    paddingRight: 26,
    flex: 7,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontFamily: 'Montserrat',
    
  },
  logo: {
    height: 150,
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    flex: 1,
  },
  icon: {
    textAlign: 'left',
    flex: 1,
    fontSize: 18,
  }
});