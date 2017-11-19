import { NativeEventEmitter, NativeModules, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import api from './api';
import ticket from './ticket';
import { store } from '../store';
import { getProfileData } from "../helpers";
import { fetchTickets } from '../containers/OrderList/actions';
import { userVisitedThisBooth, updateFabVisible } from '../containers/BoothInfo/actions';

const { BeaconModule } = NativeModules;

const BeaconEventEmitter = new NativeEventEmitter(BeaconModule);
const events = {
  beaconUpdate: 'beaconsUpdate'
};

// let isConnected =
const beacon = {
  isConnected: false,
  connect: () => {
    if (beacon.isConnected) {
      return Promise.reject(false);
    }
    beacon.isConnected = true;
    return BeaconModule.startConnect();
  },
  fetchBeacons: version => api.post('/api/v1/beacons/mapping/update', { version }),
  subscribe: callback => BeaconEventEmitter.addListener(events.beaconUpdate, callback),
  getBeacons: async () => {
    const { data: { data } } = await beacon.fetchBeacons(1);
    console.log('remote beacons', data);
    return data;
  },
  startRanging: () => {
    let visited;
    Promise.all([beacon.getBeacons(), beacon.connect(), getProfileData()])
      .then(([remoteBeacons, connectionResult, user]) => {
        this.subscription = beacon.subscribe((beacons) => {
          if (remoteBeacons && remoteBeacons.length > 0) {
            const nearBeacon = beacons.find((item) => {
              return Math.abs(item.accuracy) < 1;
            });
            console.log('nearBeacon', nearBeacon);
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
              beacon.onNearBeacon(matchBeacon, user);
            }
          }
        });
      }).catch(e => console.log('error', e))
  },
  onNearBeacon: (matchBeacon, user) => {
    switch (matchBeacon.type) {
      case 'exhibitor':
        return beacon.onExhibitor(matchBeacon, user);
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
  onExhibitor: (matchBeacon, user) => {
    // do something when user is nearby a beacon with exhibitor type
    console.log('onExhibitor beacon', matchBeacon);
    const { exhibitor } = matchBeacon.details;
    if (exhibitor && exhibitor.channel_id) {
      userVisitedThisBooth(exhibitor.channel_id).catch(e => console.log(e));
      store.dispatch(updateFabVisible(true));
      Actions.boothInfo({
        title: exhibitor.name,
        summary: exhibitor.summary,
        user: exhibitor.owner,
        booth_photo: exhibitor.logo_url,
        booth_id: exhibitor.id
      });
    }
  },
  onSpeaker: (matchBeacon) => {
    // do something when user is nearby a beacon with speaker type
    console.log('onSpeaker beacon', matchBeacon);
  },
  onEntrance: (matchBeacon) => {
    // we should check in the user if not
    console.log('onEntrance beacon', matchBeacon);
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
  onOther: (matchBeacon) => {
    // do something if other type of beacon is occured nearby
    console.log('onOther beacon', matchBeacon);
  },
  onSponsor: (matchBeacon) => {
    // do something if other type of beacon is occured nearby
    console.log('onSponsor beacon', matchBeacon);
  }
};

export default beacon;
