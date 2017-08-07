import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';
import { StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { createTransition, Fade } from 'react-native-transition';
import App from './../../index';

const Transition = createTransition(Fade);

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

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.state.timeout
        ? null
        : this.setState({ timeout: true }); }, 2000);
  }

  render() {
    return (
      <Transition>
        {
          this.state.timeout
            ? Transition.show(<App />)
            : (
              <TouchableWithoutFeedback onPress={() => { this.setState({ timeout: true }); }}>
                <Container style={styles.container}>
                  <Content>
                    <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
                    <Text style={styles.titleText}>DevSummit</Text>
                  </Content>
                </Container>
              </TouchableWithoutFeedback>
            )
        }
      </Transition>
    );
  }
}
