import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { View, AsyncStorage } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import BusyIndicator from 'react-native-busy-indicator';

// Redux imports
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './reducers';

// Style imports
import styles from './styles';

// Containers import
import strings from './localization';
import RegisterMenu from './containers/RegisterMenu';
import RegisterEmail from './containers/RegisterEmail';
import RegisterPhone from './containers/RegisterPhone';
import Schedule from './containers/Schedule';
import ScheduleDetail from './containers/ScheduleDetail';
import Main from './containers/Main';
import ChangePassword from './containers/ChangePassword';
import OrderList from './containers/OrderList';
import TicketList from './containers/TicketList';
import OrderDetail from './containers/OrderDetail';
import MainTabs from './containers/MainTabs';
import SpeakerDetail from './containers/SpeakerDetail';
import NewOrder from './containers/NewOrder';
import AttendeesList from './containers/AttendeesList';
import Splash from './components/Splash';
import Payment from './containers/Payment';
import PaymentDetail from './containers/PaymentDetail';
import BoothList from './containers/BoothList';
import BoothInfo from './containers/BoothInfo';
import Profile from './containers/Profile';
import Notification from './components/Notification';
import CodeConduct from './components/CodeConduct';
import PrivacyPolicy from './components/PrivacyPolicy';
import MyOrders from './components/MyOrders';

const RouterWithRedux = connect()(Router);
const BackButtonImg = require('../assets/images/back.png');

const lang = strings.getInterfaceLanguage();
let setlang;
switch (lang) {
  case 'in-ID':
    setlang = 'id';
    break;
  case 'en-US':
    setlang = 'en';
    break;
  default:
    setlang = 'en';
    break;
}
strings.setLanguage(setlang);

/**
*  Apply middlewares
*/
export const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onBackPress = () => {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          <RouterWithRedux
            navigationBarStyle={styles.navBar}
            titleStyle={styles.navBarTitle}
            barButtonTextStyle={styles.barButtonTextStyle}
            barButtonIconStyle={styles.barButtonIconStyle}
            leftButtonIconStyle={styles.leftButtonIconStyle}
            backAndroidHandler={this.onBackPress}
          >
            <Scene key="root" backButtonImage={BackButtonImg}>
              <Scene key="splash" component={Splash} hideNavBar initial />
              <Scene key="main" component={Main} hideNavBar type="replace" />
              <Scene key="mainTabs" component={MainTabs} hideNavBar type="replace" />
              <Scene key="registerMenu" component={RegisterMenu} hideNavBar title="Register" />
              <Scene
                key="registerEmail"
                component={RegisterEmail}
                hideNavBar
                title="Register"
                type="reset"
              />
              <Scene
                key="registerPhone"
                component={RegisterPhone}
                hideNavBar
                title="Register Phone"
                type="reset"
              />
              <Scene key="speakerDetail" component={SpeakerDetail} title="Speaker Detail" />
              <Scene key="changePassword" component={ChangePassword} title="Change Password" />
              <Scene key="ticketList" component={TicketList} title="List Ticket" />
              <Scene key="orderList" component={OrderList} title="Order List" />
              <Scene key="newOrder" component={NewOrder} title="Order Tickets" />
              <Scene key="orderDetail" component={OrderDetail} title="Order Detail" />
              <Scene key="schedule" component={Schedule} hideNavBar title="Schedule" />
              <Scene key="scheduleDetail" component={ScheduleDetail} title={this.props.title} />
              <Scene key="attendeesList" component={AttendeesList} title="Select Attendee" />
              <Scene key="payment" component={Payment} title="Choose Payment Method" />
              <Scene
                key="paymentDetail"
                component={PaymentDetail}
                title="Complete Payment Detail"
              />
              <Scene key="boothList" component={BoothList} title="Booth List" />
              <Scene key="boothInfo" component={BoothInfo} title={this.props.title} />
              <Scene key="profile" component={Profile} title="Profile" />
              <Scene key="notification" component={Notification} title="Notification" />
              <Scene key="codeConduct" component={CodeConduct} title="Code of Conduct" />
              <Scene key="privacyPolicy" component={PrivacyPolicy} title="Privacy Policy" />
              <Scene key="myOrders" component={MyOrders} title="My Orders" />
            </Scene>
          </RouterWithRedux>
        </Provider>
        <BusyIndicator />
      </View>
    );
  }
}
