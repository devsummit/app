import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Tabs, Tab, TabHeading, Container } from 'native-base';
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import Toast from 'react-native-simple-toast';
import Schedule from '../Schedule';
import Speaker from '../Speaker';
import Ticket from '../TicketList';
import Profile from '../Profile';
import MaterialList from '../MaterialList';
import Feed from '../Feed';
import Settings from '../Settings';

export default class MainTabs extends Component {
  state={
    currentTab: 0,
    roleId: null
  }

  componentWillMount() {
    AsyncStorage.getItem('role_id')
    .then(id => {
      this.setState({ roleId: JSON.parse(id) });
    }).catch(e => Toast.show('Error getting role id'));
  }

  handleCurrentTab = (number) => {
    this.setState({ currentTab: number })
  }

  render() {
    const speaker = this.state.roleId === 4;
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <Tabs onChangeTab={(i, ref) => this.handleCurrentTab(i.i)} tabBarPosition="bottom" initialPage={0}>
            <Tab 
              heading={
                <TabHeading style={{ backgroundColor: 'white' }}>
                  <IconSimpleLine
                    name="feed"
                    style={[ this.state.currentTab === 0 ? { color: '#f39e21' } : null, { fontSize: 18 } ]} />
                </TabHeading>}>
              <Feed />
            </Tab>
            <Tab 
              heading={
                <TabHeading style={{ backgroundColor: 'white' }}>
                  <IconSimpleLine
                    name="calendar"
                    style={[ this.state.currentTab === 1 ? { color: '#f39e21' } : null, { fontSize: 18 } ]} />
                </TabHeading>}>
              <Schedule />
            </Tab>
            { speaker ? 
              <Tab
              heading={
                <TabHeading style={{ backgroundColor: 'white' }}>
                  <IconSimpleLine
                    name="wallet"
                    style={[ this.state.currentTab === 2 ? { color: '#f39e21' } : null, { fontSize: 18 } ]} />
                </TabHeading>}>
                <MaterialList />
            </Tab>
            : null}
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: 'white' }}>
                  <IconSimpleLine
                    name="settings"
                    style={[ this.state.currentTab === 3 ? { color: '#f39e21' } : null, { fontSize: 18 } ]} />
                </TabHeading>}>
              <Settings />
            </Tab>
          </Tabs>
        </View>
      </Container>
    )
  }
}
