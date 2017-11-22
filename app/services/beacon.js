import { NativeEventEmitter, AsyncStorage, NativeModules, Alert } from 'react-native';
import FCM from 'react-native-fcm';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import api from './api';
import ticket from './ticket';
import { store } from '../store';
import { getProfileData } from '../helpers';
import { fetchTickets, getOrderList } from '../containers/OrderList/actions';
import { userVisitedThisBooth, updateFabVisible } from '../containers/BoothInfo/actions';

const { BeaconModule } = NativeModules;

const BeaconEventEmitter = new NativeEventEmitter(BeaconModule);
const events = {
  beaconUpdate: 'beaconsUpdate'
};

// let isConnected =
const beacon = {
  isConnected: false,
  visited: null,
  connect: () => {
    if (beacon.isConnected) {
      return Promise.reject(false);
    }
    beacon.isConnected = true;
    return BeaconModule.startConnect();
  },
  fetchBeacons: version => api.post('/api/v1/beacons/mapping/update', { version }),
  subscribe: callback => BeaconEventEmitter.addListener(events.beaconUpdate, callback),
  reward: ({ major, minor }) => api.post('/api/v1/points/reward', { major, minor }),
  checkinExhibitor: (exhibitor) => api.post('/api/v1/boothcheckin', { booth_id: exhibitor.id, booth_type: exhibitor.type, speed_dating: false }),
  getBeacons: async () => {
    try {
      const beaconsData = await AsyncStorage.getItem('beacons');
      // first initialization
      if (!beaconsData) {
        const { data: { data } } = await beacon.fetchBeacons(1);
        AsyncStorage.setItem('beacons', JSON.stringify({
          beacons: data,
          lastUpdatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
        }));
        return data;
      }
      const { beacons, lastUpdatedAt } = JSON.parse(beaconsData);
      console.log('diff', moment(lastUpdatedAt).diff(moment()));
      if (Math.abs(moment(lastUpdatedAt).diff(moment())) >= 1 * 60) {
        const { data: { data } } = await beacon.fetchBeacons(1);
        AsyncStorage.setItem('beacons', JSON.stringify({
          beacons: data,
          lastUpdatedAt: moment().format('YYYY-MM-DD HH:mm:ss')
        }));
        return data;
      }
      return beacons;
    } catch (e) {
      return [];
    }
  },
  startRanging: () => {
    Promise.all([ beacon.getBeacons(), beacon.connect(), getProfileData() ])
      .then(([ remoteBeacons, connectionResult, user ]) => {
        this.subscription = beacon.subscribe(beacons => beacon.receiveBeacons(beacons, remoteBeacons, user, true));
      }).catch(e => console.log('error', e));
  },
  receiveBeacons: (beacons, remoteBeacons, user, isForeground) => {
    let visited = beacon.visited;
    if (remoteBeacons && remoteBeacons.length > 0) {
      const nearBeacon = beacons.find((item) => {
        return Math.abs(item.accuracy) < 1;
      });
      if (!nearBeacon || !remoteBeacons) {
        return;
      }
      const matchBeacon = remoteBeacons
        .find(item => parseInt(item.major, 0) === parseInt(nearBeacon.major, 0)
          && parseInt(item.minor, 0) === parseInt(nearBeacon.minor, 0));
      if (matchBeacon && (!visited ||
          !(parseInt(visited.major, 0) === parseInt(matchBeacon.major, 0)
            && parseInt(visited.minor, 0) === parseInt(matchBeacon.minor, 0)
          ))) {
        beacon.visited = matchBeacon;
        beacon.onNearBeacon(matchBeacon, user, isForeground);
      }
    }
  },
  onNearBeacon: (matchBeacon, user, isForeground) => {
    switch (matchBeacon.type) {
      case 'exhibitor':
        return beacon.onExhibitor(matchBeacon, user, isForeground);
      case 'entrance':
        return beacon.onEntrance(matchBeacon, isForeground);
      case 'speaker':
        return beacon.onSpeaker(matchBeacon, isForeground);
      case 'other':
        return beacon.onOther(matchBeacon, isForeground);
      case 'sponsor':
        return beacon.onSponsor(matchBeacon, isForeground);
      default:
        break;
    }
  },
  onExhibitor: (matchBeacon, user, isForeground) => {
    // do something when user is nearby a beacon with exhibitor type
    const { exhibitor } = matchBeacon.details;
    if (exhibitor && exhibitor.channel_id) {
      userVisitedThisBooth(exhibitor.channel_id).catch(e => console.log(e));
      store.dispatch(updateFabVisible(true));
      beacon.reward(matchBeacon)
        .then(response => response)
        .catch(e => console.log(e));
      beacon.checkinExhibitor(matchBeacon)
        .then(response => response)
        .catch(e => console.log(e));
      if (isForeground) {
        Actions.boothInfo({
          title: exhibitor.name,
          summary: exhibitor.summary,
          user: exhibitor.owner,
          booth_photo: exhibitor.logo_url,
          booth_id: exhibitor.id
        });
      } else {
        beacon.notify(`You're visiting ${exhibitor.name}`, exhibitor.summary, exhibitor, matchBeacon)
      }
    }
  },
  onSpeaker: (matchBeacon) => {
    // do something when user is nearby a beacon with speaker type
    console.log('onSpeaker beacon', matchBeacon);
  },
  onEntrance: (matchBeacon, isForeground) => {
    // we should check in the user if not
    console.log('onEntrance beacon', matchBeacon);
    store.dispatch(fetchTickets((tickets) => {
      if (tickets.count === 0) {
        // no tickets appear to be found or the user never buy any ticket.
        Alert.alert('Oops', 'Looks like you have no ticket. You will get more insight if you have one or more tickets');
      } else if (tickets.count === 1) {
        if (isForeground) {
          Alert.alert('Glad to see you on this event!', 'We will check you in to let the people know you\'re here. Have fun on devsummit event.');
        } else {
          beacon.notify('Glad to see you on this event!', 'We will check you in to let the people know you\'re here. Have fun on devsummit event.', null, matchBeacon);
        }
        ticket
          .checkin(tickets[0].ticket_code)
          .then(response => console.log('checkin response', response))
          .catch(e => console.log(e));

        store.dispatch(getOrderList());
      } else {
        // must pick one ticket.
        // TODO: change this code so it should pick one of the ticket.
        if (isForeground) {
          Alert.alert('Glad to see you on this event!', 'We will check you in to let the people know you\'re here. Have fun on devsummit event.');
        } else {
          beacon.notify('Glad to see you on this event!', 'We will check you in to let the people know you\'re here. Have fun on devsummit event.', null, matchBeacon);
        }
        ticket
          .checkin(tickets[0].ticket_code)
          .then(response => response)
          .catch(e => console.log(e));

          store.dispatch(getOrderList());
      }
    }));
  },
  onOther: (matchBeacon) => {
    // do something if other type of beacon is occured nearby
    console.log('onOther beacon', matchBeacon);
  },
  onSponsor: (matchBeacon, isForeground) => {
    // do something if other type of beacon is occured nearby
    console.log('onSponsor beacon', matchBeacon);
    const { sponsor } = matchBeacon.details;
    if (sponsor) {
      store.dispatch(updateFabVisible(true));
      beacon.reward(matchBeacon)
        .then(response => console.log(response))
        .catch(e => console.log(e));
      beacon.checkinExhibitor(matchBeacon)
        .then(response => console.log(response))
        .catch(e => console.log(e));
      if(isForeground) {

      } else {
        beacon.notify(`You're visiting ${sponsor.name}`, `Get some more information and insight on ${sponsor.name}`, sponsor, matchBeacon);
      }
    }
  },
  notify: (title, body, data, beacon) => {
    console.log('notify ', title, beacon, data);
    FCM.presentLocalNotification({
      id: beacon.major + beacon.minor,
      title,
      body,
      sound: "default",                                   // as FCM payload
      priority: "high",                                   // as FCM payload
      click_action: "ACTION",                             // as FCM payload
      badge: 10,                                          // as FCM payload IOS only, set 0 to clear badges
      number: beacon.major + beacon.minor,                                         // Android only
      auto_cancel: true,                                  // Android only (default true)
      large_icon: "ic_launcher",                           // Android only
      icon: "ic_launcher",                                // as FCM payload, you can relace this with custom icon you put in mipmap
      color: "black",                                       // Android only
      vibrate: 300,                                       // Android only default: 300, no vibration if you pass 0
      my_custom_data:'my_custom_field_value',             // extra data you want to throw
      lights: true,                                       // Android only, LED blinking (default false)
      show_in_foreground: false,
    });
  }
};

export default beacon;
