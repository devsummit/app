import { NativeEventEmitter, NativeModules, Alert } from 'react-native';
import api from './api';
import ticket from './ticket';
import { store } from '../store';
import { fetchTickets } from '../containers/OrderList/actions';

const { BeaconModule } = NativeModules;

const BeaconEventEmitter = new NativeEventEmitter(BeaconModule);
const events = {
  beaconUpdate: 'beaconsUpdate'
};

// let isConnected =
const beacon = {
  connect: () => BeaconModule.startConnect(),
  fetchBeacons: version => api.post('/api/v1/beacons/mapping/update', { version }),
  subscribe: callback => BeaconEventEmitter.addListener(events.beaconUpdate, callback),
  startRanging: () => {
    let remoteBeacons;
    let visited;
    beacon.fetchBeacons(1).then(({ data: { data } }) => {
      remoteBeacons = data;
    }).catch(e => console.log(e));
    beacon.connect().then((result) => {
      this.subscription = beacon.subscribe((beacons) => {
        if (remoteBeacons && remoteBeacons.length > 0) {
          console.log('detected beacons', beacons);
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
              && parseInt(visited.minor, 0) === parseInt(matchBeacon.minor, 0)))) {
            visited = matchBeacon;
            beacon.onNearBeacon(matchBeacon);
          }
        }
      });
    }).catch(e => console.log(e));
  },
  onNearBeacon: (matchBeacon) => {
    switch (matchBeacon.type) {
      case 'exhibitor':
        return beacon.onExhibitor(matchBeacon);
      case 'entrance':
        return beacon.onEntrance(matchBeacon);
      case 'speaker':
        return beacon.onSpeaker(matchBeacon);
      case 'other':
        return beacon.onOther(matchBeacon);
      case 'sponsor':
        return beacon.onSponsor(matchBeacon);
      default:
        break;
    }
  },
  onExhibitor: (matchBeacon) => {
    // do something when user is nearby a beacon with exhibitor type
    console.log('beacon', matchBeacon);
    store.dispatch(fetchTickets((tickets) => {
      if (tickets.count === 0) {
        // no tickets appear to be found or the user never buy any ticket.
        Alert.alert('Oops', 'Looks like you have no ticket. You will get more insight if you have one or more tickets');
      } else if (tickets.count === 1) {
        Alert.alert('Glad to see you on this event!', 'We will check you in to let the people know you\'re here. Have fun on devsummit event.');
        ticket.checkin(tickets[0].ticket_code).then(response => {
          console.log('checkin response', response);
        });
      } else {
        // must pick one ticket.
        // TODO: change this code so it should pick one of the ticket.
        Alert.alert('Glad to see you on this event!', 'We will check you in to let the people know you\'re here. Have fun on devsummit event.');
        ticket.checkin(tickets[0].ticket_code).then(response => {
          console.log('checkin response', response);
        });
      }
      // console.log('tickets', tickets);
    }));
  },
  onSpeaker: (matchBeacon) => {
    // do something when user is nearby a beacon with speaker type
    console.log('beacon', matchBeacon);
  },
  onEntrance: (matchBeacon) => {
    // we should check in the user if not
    console.log('beacon', matchBeacon);
  },
  onOther: (matchBeacon) => {
    // do something if other type of beacon is occured nearby
    console.log('beacon', matchBeacon);
  },
  onSponsor: (matchBeacon) => {
    // do something if other type of beacon is occured nearby
    console.log('beacon', matchBeacon);
  }
};

export default beacon;
