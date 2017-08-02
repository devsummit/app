import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Root } from "native-base";
import { StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Main from "./containers/Main";
import Register from "./containers/Register";
import Login from "./containers/Login";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false
    };
  };

  render() {
    return (
        <Root>
            <Router 
              navigationBarStyle={styles.navBar} 
              titleStyle={styles.navBarTitle} 
              barButtonTextStyle={styles.barButtonTextStyle}
              barButtonIconStyle={styles.barButtonIconStyle}
              leftButtonIconStyle={styles.leftButtonIconStyle}
            >
                <Scene key="root" backButtonImage={require('../assets/images/back.png')}>
                    <Scene key="main" component={Main} hideNavBar={true} initial={!this.state.logged}/>
                    <Scene key="register" component={Register} title="Register"/>
                    <Scene key="login" component={Login} title="Login"/>
                </Scene>
            </Router>
        </Root>
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor:'#0D47A1',
  },
  navBarTitle:{
    color:'#FFFFFF'
  },
  barButtonTextStyle:{
    color:'#FFFFFF'
  },
  barButtonIconStyle:{
    tintColor:'rgb(255,255,255)'
  },
  leftButtonIconStyle:{
    tintColor: 'white'
  }
});