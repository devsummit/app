import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableWithoutFeedback } from 'react-native';
import {
  Container,
  Header,
  Footer,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Separator,
  Text
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import strings from '../../localization';
import VersionNumber from 'react-native-version-number';

const Logo = require('../../../assets/images/logo.png');

const Menu = ({ onPress, icon, text }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <ListItem icon>
      <Left>
        <Icon name={icon} />
      </Left>
      <Body>
        <Text>{text}</Text>
      </Body>
      <Right>
        <Icon name="angle-right" />
      </Right>
    </ListItem>
  </TouchableWithoutFeedback>
);

const Drawer = () => (
  <Container>
    <Header style={{ height: 200, backgroundColor: '#333' }}>
      <Left/>
      <Body style={{ height: 200, paddingTop: 25}}>
        <Image source={Logo} />
      </Body>
      <Right/>
    </Header>
    <Content>
      <Separator bordered>
        <Text>Menu</Text>
      </Separator>
      <List>
        <Menu icon="handshake-o" text="Sponsor" onPress={() => Actions.sponsorInfo()} />
        <Menu icon="home" text="Home" onPress={() => Actions.mainTabs()} />
        <Menu icon="code" text={strings.settings.codeConduct} onPress={() => Actions.codeConduct()} />
        <Menu icon="lock" text={strings.settings.privacyPolicy} onPress={() => Actions.privacyPolicy()} />
      </List>
    </Content>
    <Footer>
      <Text style={{ marginTop: 10, color: '#333', fontSize: 14 }}>v{ VersionNumber.appVersion } ({VersionNumber.buildVersion})</Text>
    </Footer>
  </Container>
);

Menu.prototype = {
  onPress: PropTypes.func,
  icon: PropTypes.string,
  text: PropTypes.string
};

export default Drawer;
