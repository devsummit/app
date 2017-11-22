import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import App from './app/index';

AppRegistry.registerComponent('DevSummit', () => App);
AppRegistry.registerHeadlessTask('BeaconService', () => require('./app/services/beacon-headless'));
