import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { Root } from "native-base";
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
            <Router hideNavBar>
                <Scene key="root">
                    <Scene key="Main" component={Main} hideNavBar={true} initial={!this.state.logged}/>
                    <Scene key="Register" component={Register} title="Register" />
                    <Scene key="Login" component={Login} title="Login" />
                </Scene>
            </Router>
        </Root>
    );
  }
}