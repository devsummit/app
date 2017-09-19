import React from 'react';
import { View, Image } from 'react-native';

const Logo = require('../../../assets/images/logo.png');

const AuthLogo = (props) => {
  return (
    <View style={props.style}>
      <Image source={Logo} resizeMode="center" />
    </View>
  );
};

export default AuthLogo;
