import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { StyleSheet, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import App from './../../index.js';
import Fade from './../../components/Fade';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
        timeout: false
    }
  };
  componentDidMount() {
      setTimeout(() => {this.setState({timeout: true})},3000)
  }

  render() {
    return (
      this.state.timeout ? <App /> :
      <Container style={styles.container}>
        <Content>
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
            <Text style={styles.titleText}>DevSummit</Text>
        </Content>
      </Container>
     
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D47A1',
    flex: 1, 
    flexDirection: 'row', 
    justifyContent:'center',
    alignItems: 'center'
  },
  titleText: {
    textAlign: 'center',
    fontSize: 24,
    color: 'white',
    fontFamily: 'Montserrat',
  },
  logo: {
    height: 120,
    width: 120,
    marginLeft: 'auto',
    marginRight: 'auto',
    flex: 1,
  }
});