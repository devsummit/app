import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { createTransition, Fade } from 'react-native-transition';
import App from './../../index';

const Transition = createTransition(Fade);

const Logo = require('../../../assets/images/logo.png');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D47A1',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    fontFamily: 'Montserrat'
  },
  logo: {
    height: 120,
    width: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
    flex: 1
  }
});

const SplashScreen = () => {
  return (
    <TouchableWithoutFeedback>
      <Container style={styles.container}>
        <Content>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.titleText}>DevSummit</Text>
        </Content>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default SplashScreen;
