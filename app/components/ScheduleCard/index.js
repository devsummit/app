import React, { Component } from 'react';
import {
  Card,
  CardItem,
  Body,
  Right,
  Text
} from 'native-base';
import { View, TouchableHighlight } from 'react-native';
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

    render() {
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
                <Text style={styles.day}>{ dayStart }</Text>
                <Text style={styles.month}>{ monthStart }</Text>
              </View>
              <View>
                <Text style={styles.eventTitle}>{ event.title }</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Icon name="home" style={styles.smallIcon} />
                  <Text style={styles.smallText}>{stage}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Icon name="clock-o" style={styles.smallIcon} />
                  <Text style={styles.smallText}>{timeStart}</Text>
                </View>
                {hasSpeaker ?
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Icon name="user" style={styles.smallIcon} />
                    <Text style={styles.smallText}>{user.first_name} {user.last_name}</Text>
                  </View> :
                  <View />
                }
              </View>
            </CardItem>
          </TouchableHighlight>
        </Card>
      );
    }
}

export default ScheduleCard;
