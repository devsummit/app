import { Component } from 'react';

import { Platform, AppState, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Toast from 'react-native-simple-toast';

import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType } from 'react-native-fcm';

import { getAccessToken, DevSummitAxios } from '../../helpers';


// this shall be called regardless of app state: running, background or not running.
// Won't be called when app is killed by user in iOS

FCM.on(FCMEvent.Notification, async (notif) => {
  // there are two parts of notif. notif.notification contains the notification payload,
  // notif.data contains data payload
  if (notif.local_notification) {
    // this is a local notification
  }
  if (notif.opened_from_tray) {
    console.log('landing here broooooooooooo');
    Actions.notification();
    // app is open/resumed because user clicked banner
  }
  // await someAsyncCall();

  if (Platform.OS === 'ios') {
    // optional
    // iOS requires developers to call completionHandler to end notification process.
    // If you do not call it your background remote notifications could be throttled,
    // to read more about it see the above documentation link.
    // This library handles it for you automatically with default behavior
    // (for remote notification, finish with NoData; for WillPresent,
    // finish depend on "show_in_foreground"). However if you want to return different result,
    // follow the following code to override
    // notif._notificationType is available for iOS platfrom
    switch (notif._notificationType) {
      case NotificationType.Remote:
        // other types available: RemoteNotificationResult.NewData,
        // RemoteNotificationResult.ResultFailed
        notif.finish(RemoteNotificationResult.NewData);
        break;
      case NotificationType.NotificationResponse:
        notif.finish();
        break;
      case NotificationType.WillPresent:
        // other types available: WillPresentNotificationResult.None
        notif.finish(WillPresentNotificationResult.All);
        break;
      default:
        break;
    }
  }
});

FCM.on(FCMEvent.RefreshToken, (token) => {
  getAccessToken().then((usertoken) => {
    const headers = { Authorization: usertoken };
    DevSummitAxios.patch('auth/me/updatefcmtoken', { token }, { headers })
      .then(async (response) => {
        if (response.meta && response.meta.success) {
          await AsyncStorage.setItem('fcmtoken', token);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }).catch((err) => {
    console.log(err);
  });
  // fcm token may not be available on first load, catch it here
});

export default class PushNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      roleId: null,
      fcm_token: '',
      appState: AppState.currentState
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    FCM.subscribeToTopic('devsummit_indonesia_2017');
    FCM.requestPermissions();
    FCM.getFCMToken().then((token) => {
      console.log('token here', token);
      this.setState({ fcm_token: token });
      // update your fcm token on server.
      getAccessToken().then((usertoken) => {
        const headers = { Authorization: usertoken };
        DevSummitAxios.patch('auth/me/updatefcmtoken', { token }, { headers })
          .then(async (response) => {
            if (response.meta && response.meta.success) {
              await AsyncStorage.setItem('fcmtoken', token);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }).catch((err) => {
        console.log(err);
      });
    });
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
      // do some component related stuff
      if (this.state.appState === 'active') {
        this.props.onReceiveNotif();
      }
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    this.notificationListener.remove();
  }

  handleAppStateChange = (nextAppState) => {
    this.setState({ appState: nextAppState });
  }

  render() {
    return null;
  }
}
