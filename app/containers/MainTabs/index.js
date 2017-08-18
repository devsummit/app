import {StyleSheet, View, Text} from 'react-native';
import React, {Component} from 'react';
import {PagerTabIndicator, IndicatorViewPager} from 'rn-viewpager';
import Schedule from "../Schedule";
import Speaker from "../Speaker";
import Ticket from "../TicketList";
import Profile from "../Profile";

export default class MainTabs extends Component {
  _renderTabIndicator() {
    let tabs = [
      {
        iconSource: require('../../../assets/images/calendar.png'),
        selectedIconSource: require('../../../assets/images/calendar.png')
      },{
        iconSource: require('../../../assets/images/group.png'),
        selectedIconSource: require('../../../assets/images/group.png')
      },{
        iconSource: require('../../../assets/images/ticket.png'),
        selectedIconSource: require('../../../assets/images/ticket.png')
      },{
        iconSource: require('../../../assets/images/user.png'),
        selectedIconSource: require('../../../assets/images/user.png')
      }
    ];
    return (
      <PagerTabIndicator
        tabs={tabs}
        itemStyle={{backgroundColor:'#3F51B5'}}
        iconStyle={{height: 20, width: 20, marginTop:11, opacity:0.5}}
        selectedItemStyle={{backgroundColor:'#3F51B5'}}
        selectedIconStyle={{height: 20, width: 20,marginTop:10}}
        style={{backgroundColor:'#3F51B5'}}
      />
    )
  }

  render() {
    return (
      <View style={{flex:1}}>
        <IndicatorViewPager
          style={{ flex:1, backgroundColor: 'white' }}
          indicator={ this._renderTabIndicator() }
        >
          <View>
            <Schedule />
          </View>
          <View>
            <Speaker />
          </View>
          <View>
            <Ticket/>
          </View>
          <View>
            <Profile
              profileData={this.props.profileData}
            />
          </View>
        </IndicatorViewPager>
      </View>
    )
  }
}
