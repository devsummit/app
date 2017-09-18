import React, { Component } from 'react';
import {
  Card,
  CardItem,
  Text
} from 'native-base';
import { Image, View, ScrollView } from 'react-native';
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
                <Text style={styles.data}>Time start : {timeStart}</Text>
                <Text style={styles.data}>Time end : {timeEnd}</Text>
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
                    <Text style={styles.title}>Speaker</Text>
                    <Text style={styles.data}>{user.first_name} {user.last_name}</Text>
                    <Text style={styles.title}>Job</Text>
                    <Text style={styles.data}>{speaker.job}</Text>
                    <Text style={styles.title}>Summary</Text>
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
