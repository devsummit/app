import { NativeEventEmitter, NativeModules } from 'react-native';

const { BeaconModule } = NativeModules;

const BeaconEventEmitter = new NativeEventEmitter(BeaconModule);
const events = {
  beaconUpdate: 'beaconsUpdate'
};

// let isConnected =

export default {
  connect: () => BeaconModule.startConnect(),
  subscribe: callback => BeaconEventEmitter.addListener(events.beaconUpdate, callback)
};

