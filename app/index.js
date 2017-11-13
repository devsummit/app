import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { View, AsyncStorage, BackHandler } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import BusyIndicator from 'react-native-busy-indicator';
import codePush from 'react-native-code-push';

// Redux imports
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

// Style imports
import styles from './styles';

// Containers import
import strings from './localization';
import RegisterMenu from './containers/RegisterMenu';
import RegisterEmail from './containers/RegisterEmail';
import RegisterPhone from './containers/RegisterPhone';
import RegisterHackaton from './containers/RegisterHackaton';
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
import Drawer from './containers/Drawer';
import SponsorInfo from './containers/SponsorInfo';
import Comment from './containers/CommentList';
import CreatePost from './containers/CreatePost';
import beacon from './services/beacon';

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    beacon.connect().then((result) => {
      console.log('result');
      beacon.subscribe((beacons) => {
        console.log(beacons);
      });
    }).catch(e => console.log(e));
  }

  onBackPress = () => {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  };

  codePushStatusDidChange(status) {
    switch (status) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.');
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.');
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.');
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.');
        break;
      default:
        break;
    }
  }

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
              <Scene key="drawer" drawer drawerLockMode="locked-closed" back contentComponent={Drawer} hideNavBar>
                <Scene key="splash" component={Splash} hideNavBar initial />
                <Scene key="mainTabs" component={MainTabs} hideNavBar type="replace" />
                <Scene key="ticketList" component={TicketList} title="List Ticket" />
                <Scene key="schedule" component={Schedule} hideNavBar title="Schedule" />
                <Scene key="attendeesList" component={AttendeesList} title="Select Attendee" />
                <Scene key="boothList" component={BoothList} title="Booth List" />
                <Scene key="main" component={Main} hideNavBar type="replace" />
              </Scene>
              <Scene key="registerMenu" component={RegisterMenu} hideNavBar title="Register" />
              <Scene key="registerEmail" component={RegisterEmail} hideNavBar title="Register" type="reset" />
              <Scene key="registerPhone" component={RegisterPhone} hideNavBar title="Register Phone" type="reset" />
              <Scene key="newOrder" component={NewOrder} title="Order Tickets" />
              <Scene key="speakerDetail" component={SpeakerDetail} title="Speaker Detail" />
              <Scene key="changePassword" component={ChangePassword} title="Change Password" />
              <Scene key="orderList" component={OrderList} title="Order List" />
              <Scene key="orderDetail" component={OrderDetail} title="Order Detail" />
              <Scene key="scheduleDetail" component={ScheduleDetail} title={this.props.title} />
              <Scene key="payment" component={Payment} title="Choose Payment Method" />
              <Scene key="paymentDetail" component={PaymentDetail} title="Complete Payment Detail" />
              <Scene key="comment" component={Comment} title="Comments" />
              <Scene key="boothInfo" component={BoothInfo} title={this.props.title} />
              <Scene key="profile" component={Profile} title="Profile" />
              <Scene key="notification" component={Notification} title="Notification" />
              <Scene key="codeConduct" component={CodeConduct} title="Code of Conduct" />
              <Scene key="privacyPolicy" component={PrivacyPolicy} title="Privacy Policy" />
              <Scene key="myOrders" component={MyOrders} title="My Orders" />
              <Scene key="sponsorInfo" component={SponsorInfo} title="Sponsor" />
              <Scene key="createPost" component={CreatePost} title="New post" />
              <Scene key="registerHackaton" component={RegisterHackaton} title="Register Hackaton" />
            </Scene>
          </RouterWithRedux>
        </Provider>
        <BusyIndicator />
      </View>
    );
  }
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
  updateDialog: true
})(App);
