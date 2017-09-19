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
                <Text style={styles.smallText}><Icon name="home" style={styles.smallIcon} />{stage}</Text>
                <Text style={styles.smallText}><Icon name="clock-o" style={styles.smallIcon} />{timeStart}</Text>
                {hasSpeaker ?
                  <Text style={styles.smallText}>
                    <Icon name="user" style={styles.smallIcon} />
                    {user.first_name} {user.last_name}
                  </Text> :
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
