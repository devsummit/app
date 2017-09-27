import React, { Component } from 'react';
import {
  Card,
  CardItem,
  Text
} from 'native-base';
import { Image, View, ScrollView } from 'react-native';
import strings from '../../localization';
import Moment from 'moment';
import styles from './style';

class ScheduleDetail extends Component {
  render() {
    const { event, speaker, stage, user, time_start, time_end } = this.props;
    const start = new Moment(time_start);
    const end = new Moment(time_end);
    const timeStart = start.format('hh:mm A');
    const timeEnd = end.format('hh:mm A');
    const hasSpeaker = !(Object.keys(speaker).length === 0 && speaker.constructor === Object);
    return (
      <ScrollView>
        <View style={styles.container}>
          <Card>
            <CardItem>
              <View style={styles.schedule}>
                <View style={styles.detail}>
                  <Text style={styles.title}>{event.title}</Text>
                  <Text style={styles.description}>{event.information}</Text>
                </View>
                <View style={{ flex: 1, borderWidth: 1, borderColor: '#000', margin: 12 }} />
                <Text style={styles.data}>{strings.schedule.start} {timeStart}</Text>
                <Text style={styles.data}>{strings.schedule.end} {timeEnd}</Text>
              </View>
            </CardItem>
          </Card>
          {hasSpeaker ?
            <Card>
              <CardItem>
                <View style={styles.schedule}>
                  <Image
                    source={{ uri: user.photos[0].url }}
                    style={styles.image}
                  />
                  <View style={styles.speakerDetail}>
                    <Text style={styles.title}>{strings.schedule.speaker}</Text>
                    <Text style={styles.data}>{user.first_name} {user.last_name}</Text>
                    <Text style={styles.title}>{strings.schedule.job}</Text>
                    <Text style={styles.data}>{speaker.job}</Text>
                    <Text style={styles.title}>{strings.schedule.summary}</Text>
                    <Text style={styles.data}>{speaker.summary}</Text>
                  </View>
                </View>
              </CardItem>
            </Card> : <View />
          }
        </View>
      </ScrollView>
    );
  }
}

export default ScheduleDetail;
