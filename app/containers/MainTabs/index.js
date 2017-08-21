import {StyleSheet, View, Text, StatusBar} from 'react-native';
import React, {Component} from 'react';
import {Tabs, Tab, TabHeading, Container} from 'native-base';
import IconIon from 'react-native-vector-icons/Ionicons';
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import Schedule from "../Schedule";
import Speaker from "../Speaker";
import Ticket from "../TicketList";
import Profile from "../Profile";

const StatusBarAndroid = require('react-native-android-statusbar');

export default class MainTabs extends Component {
  render() {
    return (
      <Container>
        <View style={{flex:1}}>
          <Tabs tabBarPosition='bottom'>
            <Tab heading={ <TabHeading style={{backgroundColor: 'white'}}><IconSimpleLine name="calendar" style={{fontSize: 18, color:'#ffa62a'}} /></TabHeading>}>
              <Schedule />
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor: 'white'}}><IconSimpleLine name="people" style={{fontSize: 18}}/></TabHeading>}>
              <Speaker />
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor: 'white'}}><IconSimpleLine name="wallet" style={{fontSize: 18}}/></TabHeading>}>
              <Ticket/>
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor: 'white'}}><IconSimpleLine name="user" style={{fontSize: 18}}/></TabHeading>}>
              <Profile
                profileData={this.props.profileData}
              />
            </Tab>
          </Tabs>
        </View>
      </Container>
    )
  }
}
