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
import BoothList from '../BoothList';
import BoothInfo from '../EditBooth';
import Feed from '../Feed';
import Settings from '../Settings';

export default class MainTabs extends Component {
  state = {
    currentTab: 0,
    roleId: null
  }

  componentWillMount() {
    AsyncStorage.getItem('role_id')
      .then((id) => {
        this.setState({ roleId: JSON.parse(id) });
      }).catch(e => Toast.show('Error getting role id'));
  }

  handleCurrentTab = (number) => {
    this.setState({ currentTab: number });
  }

  changeIcon() {
    const role = this.state.roleId;
    if (role === 2) {
      return (<IconSimpleLine
        name="user"
        style={[ this.state.currentTab === 3 ? { color: '#f39e21' } : null, { fontSize: 18 } ]}
      />);
    } else if (role === 3) {
      return (<IconSimpleLine
        name="organization"
        style={[ this.state.currentTab === 3 ? { color: '#f39e21' } : null, { fontSize: 18 } ]}
      />);
    } else if (role === 4) {
      return (<IconSimpleLine
        name="speech"
        style={[ this.state.currentTab === 3 ? { color: '#f39e21' } : null, { fontSize: 18 } ]}
      />);
    }
  }

  viewCurrentUser() {
    const role = this.state.roleId;
    if (role === 2) {
      return (<BoothList />);
    } else if (role === 3) {
      return (<MaterialList />);
    } else if (role === 4) {
      return (<BoothInfo />);
    }
  }

  render() {
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
                    name="home"
                    style={[ this.state.currentTab === 2 ? { color: '#f39e21' } : null, { fontSize: 18 } ]}
                  />
                </TabHeading>}
            >
              {this.viewCurrentUser()}
            </Tab>
            : null}
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: 'white' }}>
                  {this.changeIcon()}
                </TabHeading>}
            >
              <Profile />
            </Tab>
          </Tabs>
        </View>
      </Container>
    );
  }
}
