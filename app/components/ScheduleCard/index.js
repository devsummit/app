import React, { Component } from 'react';
import {
  Card,
  CardItem,
  Body,
  Right,
  Text
} from 'native-base';
import { View, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Moment from 'moment';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class ScheduleCard extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

    handleToggle = () => {
      const isOpen = !this.state.isOpen;
      this.setState({ isOpen });
    }

    eventType = () => {
      const type = this.props.event.type;

      if (type === 'discuss panel') {
        return (
          <Text style={styles.type}>Discuss panel</Text>
        );
      } else if (type === 'speaker') {
        return (
          <Text style={styles.type}>Speaker</Text>
        );
      } else if (type === 'hackaton') {
        return (
          <Text style={styles.type}>Hackaton</Text>
        );
      }

      return (
        <Text style={styles.type}>Other</Text>
      );
    }

    render() {
      console.log("landing here to check", this.props);
      const { isOpen } = this.state;
      const { event, speaker, stage, user, time_start, time_end} = this.props;
      const start = new Moment(time_start);
      const end = new Moment(time_end);
      const dayStart = start.format('DD');
      const monthStart = start.format('MMM');
      const timeStart = start.format('hh:mm A');
      const dateEnd = end.format('MMM DD');
      const timeEnd = end.format('hh:mm A');
      const hasSpeaker = !(Object.keys(speaker).length === 0 && speaker.constructor === Object)
      return (
        <Card style={styles.container}>
          <TouchableHighlight
            onPress={() => Actions.scheduleDetail({
              event, speaker, stage, user, time_start, time_end
            })}
          >
            <CardItem>
              <View style={styles.date}>
                <Text style={styles.day}>{ timeStart }</Text>
              </View>
              <View style={{ flex: 1 }}>
                {hasSpeaker ?
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={{ uri: user.photos[0].url}}
                      style={{ width: 50, height: 50, borderRadius: 25, marginRight: 8 }}
                    />
                    <Text>{user.first_name} {user.last_name}</Text>
                  </View> : <View />
                }
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{event.title}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 12 }}>{event.information}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                { user.length > 0 ?
                  user.map(item => {
                    return(
                        <Image
                          source={{ uri: item.photos[0].url }}
                          style={{ width: 30, height: 30, borderRadius: 15, marginRight: 4, marginVertical: 8 }}
                        />
                    )
                  }) :
                  <View />
                }
              </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                  {this.eventType()}
                </View>
              </View>
            </CardItem>
          </TouchableHighlight>
        </Card>
      );
    }
}

export default ScheduleCard;
