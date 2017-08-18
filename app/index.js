import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { View, AsyncStorage } from 'react-native'
// Style imports
import styles from './styles';

// Redux imports
import { Provider, connect } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';

// Containers import
import RegisterMenu from "./containers/RegisterMenu";
import RegisterEmail from "./containers/RegisterEmail";
import RegisterPhone from "./containers/RegisterPhone";
import Login from "./containers/Login";
import Schedule from "./containers/Schedule";
import Main from './containers/Main/MainWrapper';
import ChangePassword from "./containers/ChangePassword";
import OrderList from './containers/OrderList';
import TicketList from './containers/TicketList';
import OrderDetail from './containers/OrderDetail';
import MainTabs from "./containers/MainTabs";
import SpeakerDetail from "./containers/SpeakerDetail";
import AttendeesList from "./containers/AttendeesList";

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

  componentWillMount() {
    this.checkAccessToken()
  }

  CustomIcon = () => {
    return (
      <View>
        <Icon name="calendar"/>
      </View>
    );
  }
  checkAccessToken = () => {
    console.log('cek token')
    AsyncStorage.getItem('access_token', (err, result) => {
      if (result) {
        this.setState({
          logged: true
        })
      }
    })
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
            <Scene key="mainTabs" component={MainTabs} hideNavBar={true} initial={this.state.logged}/>
            <Scene key="registerMenu" component={RegisterMenu} title="Register"/>
            <Scene key="registerEmail" component={RegisterEmail} title="Register Email"/>
            <Scene key="registerPhone" component={RegisterPhone} title="Register Phone"/>
            <Scene key="speakerDetail" component={SpeakerDetail} title="Speaker Detail"/>
            <Scene key="changePassword" component={ChangePassword} title="Change Password"/>
            <Scene key="ticketList" component={TicketList} title="List Ticket" />
            <Scene key="orderList" component={OrderList} title="Order List" />
            <Scene key="orderDetail" component={OrderDetail} title="Order Detail" />
            <Scene key="schedule" component={Schedule} title="Schedule"/>
            <Scene key="attendeesList" component={AttendeesList} title="Select Attendee"/>
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}
