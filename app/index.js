import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { View, AsyncStorage, NetInfo, StatusBar } from 'react-native';
import { Container, Content, Spinner } from 'native-base';
import BusyIndicator from 'react-native-busy-indicator';
import { MessageBar as MessageBarAlert, MessageBarManager } from 'react-native-message-bar';

// Redux imports
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist-immutable';
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
import { setToken } from './containers/Main/actions';
import { setIsOnline, setConnectionType } from './modules/net/actions';
import ChangePassword from './containers/ChangePassword';
import OrderList from './containers/OrderList';
import TicketList from './containers/TicketList';
import OrderDetail from './containers/OrderDetail';
import MainTabs from './containers/MainTabs';
import SpeakerDetail from './containers/SpeakerDetail';
import NewOrder from './containers/NewOrder';
import AttendeesList from './containers/AttendeesList';
import Splash from './containers/Splash';
import Payment from './containers/Payment';
import PaymentDetail from './containers/PaymentDetail';
import BoothList from './containers/BoothList';
import BoothInfo from './containers/BoothInfo';
import Profile from './containers/Profile';
import Notification from './containers/Notification';
import CodeConduct from './components/CodeConduct';
import PrivacyPolicy from './components/PrivacyPolicy';

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
const store = createStore(
  reducers,
  undefined,
  compose(
    applyMiddleware(ReduxThunk),
    autoRehydrate(),
  )
);

function handleConnectivity() {
  const {online, connection} = store.getState().get('network').toJS();
  console.log({online, connection});
  if (!online || ['unknown', 'none'].indexOf(connection) >= 0) {
    MessageBarManager.showAlert({
      title: 'Connection problem',
      message: 'It seems we\'re having trouble reaching out the server. Please ensure you have a working connection',
      alertType: 'error',
      shouldHideAfterDelay: false,
      shouldHideOnTap: false,
    });
  } else {
    MessageBarManager.hideAlert();
  }
}
function handleConnectivityChange(status) {
  store.dispatch(setConnectionType(status));
  // no connection at all
  NetInfo.removeEventListener('connectionChange', handleConnectivityChange);
}
function handleConnectivityStatusChange(status) {
  store.dispatch(setIsOnline(status));
  // no connection at all
  NetInfo.isConnected.removeEventListener('connectionChange', handleConnectivityStatusChange);
}
const networkListener = () => {
  setInterval(() => {
    NetInfo.addEventListener('connectionChange', handleConnectivityChange);
    NetInfo.isConnected.addEventListener('connectionChange', handleConnectivityStatusChange);
    setTimeout(() => {
      handleConnectivity();
    }, 5 * 100);
  }, 5 * 1000);
  // give it some delay
  setTimeout(() => {
    NetInfo.isConnected.fetch().then(handleConnectivityStatusChange);
    setTimeout(() => {
      handleConnectivity();
    }, 5 * 100);
  }, 100);
};

const persistingStore = (callback = () => {}) => {
  persistStore(store, { storage: AsyncStorage }, () => {
    AsyncStorage
      .multiGet([ 'access_token', 'refresh_token', 'role_id', 'profile_data' ])
      .then(([ accessToken, refreshToken, roleId, profileData ]) => {
        const savedToken = store.getState().getIn([ 'main', 'accessToken' ]);
        if (!savedToken || savedToken === '') {
          store.dispatch(setToken({
            accessToken,
            refreshToken,
            roleId,
            profileData: JSON.parse(profileData)
          }));
        }
        callback();
      }).catch((err) => {
      // it means no particular data saved on async storage or just new installation
        callback();
      });
  });
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rehydrated: false
    };
  }

  componentWillMount() {
    persistingStore(() => {
      this.setState({ rehydrated: true }, () => {
        MessageBarManager.registerMessageBar(this.messageBar);
        networkListener();
      });
    });
  }

  onBackPress = () => {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="orange"
          barStyle="light-content"
        />
        <View style={{ flex: 1}}>
          {this.state.rehydrated && <Provider store={store}>
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
                <Scene key="registerEmail" component={RegisterEmail} hideNavBar title="Register" />
                <Scene key="registerPhone" component={RegisterPhone} hideNavBar title="Register Phone" />
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
                <Scene key="paymentDetail" component={PaymentDetail} title="Complete Payment Detail" />
                <Scene key="boothList" component={BoothList} title="Booth List" />
                <Scene key="boothInfo" component={BoothInfo} title={this.props.title} />
                <Scene key="profile" component={Profile} title="Profile" />
                <Scene key="notification" component={Notification} title="Notification" />
                <Scene key="codeConduct" component={CodeConduct} title="Code of Conduct" />
                <Scene key="privacyPolicy" component={PrivacyPolicy} title="Privacy Policy" />
              </Scene>
            </RouterWithRedux>
          </Provider>}
          <BusyIndicator />
        </View>
        <MessageBarAlert ref={(ref) => { this.messageBar = ref; }} />
      </View>
    );
  }
}
