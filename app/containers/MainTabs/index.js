import {StyleSheet, View, Text, StatusBar, TouchableWithoutFeedback} from 'react-native';
import React, {Component} from 'react';
import {Tabs, Tab, TabHeading, Container, Icon} from 'native-base';
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import Schedule from "../Schedule";
import Speaker from "../Speaker";
import Ticket from "../TicketList";
import Profile from "../Profile";

export default class MainTabs extends Component {
  state={
    currentTab: 0
  }

  handleCurrentTab = (number) => {
    this.setState({currentTab: number})
  }

  render() {
    return (
      <Container>
        <View style={{flex:1}}>
          <Tabs onChangeTab={(i,ref) => this.handleCurrentTab(i.i)} tabBarPosition='bottom' initialPage={0}>
            <Tab heading={ <TabHeading style={{backgroundColor: 'white'}}><IconSimpleLine name="calendar" style={[this.state.currentTab === 0 ? {color: '#f39e21'} : null, {fontSize: 18}]} /></TabHeading>}>
              <Schedule />
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor: 'white'}}><IconSimpleLine name="people" style={[this.state.currentTab === 1 ? {color: '#f39e21'} : null, {fontSize: 18}]}/></TabHeading>}>
              <Speaker />
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor: 'white'}}><IconSimpleLine name="wallet" style={[this.state.currentTab === 2 ? {color: '#f39e21'} : null, {fontSize: 18}]}/></TabHeading>}>
              <Ticket/>
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor: 'white'}}><IconSimpleLine name="user" style={[this.state.currentTab === 3 ? {color: '#f39e21'} : null, {fontSize: 18}]}/></TabHeading>}>
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
