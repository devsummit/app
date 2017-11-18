import { NativeEventEmitter, NativeModules, Alert } from 'react-native';
import api from './api';

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
  onExhibitor: (beacon) => {
    // do something when user is nearby a beacon with exhibitor type
  },
  onSpeaker: (beacon) => {
    // do something when user is nearby a beacon with speaker type
  },
  onEntrance: (beacon) => {
    // we should check in the user if not

  },
  onOther: (beacon) => {
    // do something if other type of beacon is occured nearby
  },
  onSponsor: (beacon) => {
    // do something if other type of beacon is occured nearby
  }
};

export default beacon;
