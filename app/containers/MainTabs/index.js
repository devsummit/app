import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Tabs, Tab, TabHeading, Container } from 'native-base';
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import Toast from 'react-native-simple-toast';
import Schedule from '../Schedule';
import MaterialList from '../MaterialList';
import BoothList from '../BoothList';
import Feed from '../Feed';
import Settings from '../Settings';
import PushNotification from './PushNotification';
import Notification from '../Notification';

export default class MainTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 0,
      roleId: null,
      token: null
    };
  }

  componentWillMount() {
    AsyncStorage.getItem('role_id')
      .then((id) => {
        this.setState({ roleId: JSON.parse(id) });
      })
      .catch(e => Toast.show('Error getting role id', e));
  }

  handleCurrentTab = (number) => {
    this.setState({ currentTab: number });
  };

  /**
    role_id 2 = attende
    role_id 3 = booth
    role_id 4 = speaker
  */
  changeIcon() {
    const role = this.state.roleId;
    if (role === 4) {
      return (
        <IconSimpleLine
          name="speech"
          style={[ this.state.currentTab === 2 ? { color: '#f39e21' } : null, { fontSize: 18 } ]}
        />
      );
    }
    return (
      <IconSimpleLine
        name="flag"
        style={[ this.state.currentTab === 2 ? { color: '#f39e21' } : null, { fontSize: 18 } ]}
      />
    );
  }

  viewCurrentUser() {
    const role = this.state.roleId;
    if (role === 4) {
      return <MaterialList />;
    }
    return <BoothList />;
  }

  render() {
    return (
      <Container>
        <PushNotification />
        <View style={{ flex: 1 }}>
          <Tabs
            onChangeTab={(i, ref) => this.handleCurrentTab(i.i)}
            tabBarPosition="bottom"
            initialPage={0}
          >
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: 'white' }}>
                  <IconSimpleLine
                    name="home"
                    style={[
                      this.state.currentTab === 0 ? { color: '#f39e21' } : null,
                      { fontSize: 18 }
                    ]}
                  />
                </TabHeading>
              }
            >
              <Feed />
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: 'white' }}>
                  <IconSimpleLine
                    name="calendar"
                    style={[
                      this.state.currentTab === 1 ? { color: '#f39e21' } : null,
                      { fontSize: 18 }
                    ]}
                  />
                </TabHeading>
              }
            >
              <Schedule />
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: 'white' }}>{this.changeIcon()}</TabHeading>
              }
            >
              {this.viewCurrentUser()}
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: 'white' }}>
                  <IconSimpleLine
                    name="settings"
                    style={[
                      this.state.currentTab === 3 ? { color: '#f39e21' } : null,
                      { fontSize: 18 }
                    ]}
                  />
                </TabHeading>
              }
            >
              <Settings />
            </Tab>
          </Tabs>
        </View>
      </Container>
    );
  }
}
