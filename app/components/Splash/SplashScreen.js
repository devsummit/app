import React from 'react';
import { StyleSheet, Image, View, StatusBar, Text } from 'react-native';
import { createTransition, Fade } from 'react-native-transition';
import VersionNumber from 'react-native-version-number';

const Transition = createTransition(Fade);

const Logo = require('../../../assets/images/devsummit.png');

const version = VersionNumber.appVersion;

const versionCode = VersionNumber.buildVersion;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  logo: {
    height: 73.1,
    width: 201.2
  }
});

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <View />
      <View>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={{alignItems: 'center'}}>
        <Text>v{version}({versionCode})</Text>
      </View>
    </View>
  );
};

export default SplashScreen;
