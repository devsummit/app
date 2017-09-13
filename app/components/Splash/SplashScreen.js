import React from 'react';
import { StyleSheet, Image, View, StatusBar } from 'react-native';
import { createTransition, Fade } from 'react-native-transition';

const Transition = createTransition(Fade);

const Logo = require('../../../assets/images/devsummit.png');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
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
      <View>
        <Image source={Logo} style={styles.logo} />
      </View>
    </View>
  );
};

export default SplashScreen;
