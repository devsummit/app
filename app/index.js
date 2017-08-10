import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { View } from 'react-native'

// Style imports
import styles from './styles';

// Redux imports
import { Provider, connect } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

// Containers import
import Register from "./containers/Register";
import Login from "./containers/Login";
import Schedule from "./containers/Schedule";
import Main from './containers/Main/MainWrapper';
import ChangePassword from "./containers/ChangePassword";
import OrderList from './containers/OrderList';
import TicketList from './containers/TicketList';
import MainTabs from "./containers/MainTabs";

const RouterWithRedux = connect()(Router);
const BackButtonImg = require('../assets/images/back.png');


/**
*  Apply middlewares
*/
export const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false
    };
  }
  CustomIcon = () => {
    return (
      <View>
        <Icon name="calendar"/>
      </View>
    );
  }
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
                <Scene key="root" backButtonImage={BackButtonImg}>
                    <Scene key="main" component={Main} hideNavBar={true} initial={!this.state.logged}/>
                    <Scene key="register" component={Register} title="Register"/>
                    <Scene key="login" component={Login} title="Login"/>
                    <Scene key="speaker_detail" component={SpeakerDetail} title="Speaker Detail"/>
                    <Scene key="mainTabs" component={MainTabs} hideNavBar={true}/>
                    <Scene key="changePassword" component={ChangePassword} title="Change Password"/>
                    <Scene key="ticketList" component={TicketList} title="List Ticket" />
                    <Scene key="schedule" component={Schedule} title="Schedule"/>
                </Scene>
            </RouterWithRedux>
        </Provider>
    );
  }
}
