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
          console.log('hello', beacons);
          const nearBeacon = beacons.find((item) => {
            return Math.abs(item.accuracy) < 1;
          });
          if (!nearBeacon || !remoteBeacons) {
            return;
          }
          console.log('hello', nearBeacon);
          const matchBeacon = remoteBeacons
            .find(item => parseInt(item.major, 0) === parseInt(nearBeacon.major, 0) && parseInt(item.minor, 0) === parseInt(nearBeacon.minor, 0));
          if (!visited ||
            !(parseInt(visited.major, 0) === parseInt(matchBeacon.major, 0) && parseInt(visited.minor, 0) === parseInt(matchBeacon.minor, 0))) {
            console.log('matchBeacon', matchBeacon, visited);
            visited = matchBeacon;
            Alert.alert('beacon found', matchBeacon.description);
          }
        }
      });
    }).catch(e => console.log(e));
  }
};

export default beacon;
