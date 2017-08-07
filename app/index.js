import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Root } from "native-base";
import { StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

// Redux imports
import { Provider, connect } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';


// Containers import
import Main from "./containers/Main";
import Register from "./containers/Register";
import ChangePassword from "./containers/ChangePassword";

const RouterWithRedux = connect()(Router);


/**
 *  Apply middlewares
 */
export const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore)
let store = createStoreWithMiddleware(reducers); 

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false
    };
  };
  render() {
    return (
        <Provider store={store}>
            <RouterWithRedux
              navigationBarStyle={styles.navBar} 
              titleStyle={styles.navBarTitle} 
              barButtonTextStyle={styles.barButtonTextStyle}
              barButtonIconStyle={styles.barButtonIconStyle}
              leftButtonIconStyle={styles.leftButtonIconStyle}
            >
                <Scene key="root" backButtonImage={require('../assets/images/back.png')}>
                    <Scene key="main" component={Main} hideNavBar={true} initial={!this.state.logged}/>
                    <Scene key="register" component={Register} title="Register"/>
                    <Scene key="change_password" component={ChangePassword} title="Change Password"/>
                </Scene>
            </RouterWithRedux>
        </Provider>
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