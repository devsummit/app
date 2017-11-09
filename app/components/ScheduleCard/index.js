import React, { Component } from 'react';
import { Card, CardItem, Body, Right, Text } from 'native-base';
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
  };

  eventType = () => {
    const type = this.props.event.type;
    const panel = 'Discuss panel';
    const speaker = 'Speaker';
    const hack = 'Hackaton';

    if (type === 'discuss panel') {
      return <Text style={styles.type}>{panel.toUpperCase()}</Text>;
    } else if (type === 'speaker') {
      return <Text style={styles.type}>{speaker.toUpperCase()}</Text>;
    } else if (type === 'hackaton') {
      return <Text style={styles.type}>{hack.toUpperCase()}</Text>;
    }

    return <View />;
  };

  render() {
    const { isOpen } = this.state;
    const { event, speaker, stage, user, time_start, time_end } = this.props;
    const start = new Moment(time_start);
    const end = new Moment(time_end);
    const dayStart = start.format('DD');
    const monthStart = start.format('MMM');
    const timeStart = start.format('hh:mm');
    const period = start.format('A');
    const dateEnd = end.format('MMM DD');
    const timeEnd = end.format('hh:mm A');
    const hasSpeaker = !(Object.keys(speaker).length === 0 && speaker.constructor === Object);
    return (
      <View style={{ flex: 1, backgroundColor: '#E0E0E0' }}>
        <Card style={styles.container}>
          <TouchableHighlight
            onPress={() =>
              Actions.scheduleDetail({
                title: event.type.toUpperCase(),
                event,
                speaker,
                stage,
                user,
                time_start,
                time_end
              })}
          >
            <CardItem>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.date}>
                  <Text style={styles.day}>{timeStart}</Text>
                  <Text style={styles.time}>{period}</Text>
                </View>
                <View style={{ flex: 4, marginLeft: 20 }}>
                  {hasSpeaker ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={{ uri: user.photos[0].url }}
                        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 8 }}
                      />
                      <Text>
                        {user.first_name} {user.last_name}
                      </Text>
                    </View>
                  ) : (
                    <View />
                  )}
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{event.title}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 12 }}>{event.information}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    {user.length > 0 ? (
                      user.map((item, index) => {
                        return (
                          <Image
                            key={index}
                            source={{ uri: item.photos[0].url }}
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 15,
                              marginRight: 4,
                              marginVertical: 8
                            }}
                          />
                        );
                      })
                    ) : (
                      <View />
                    )}
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row' }}>{this.eventType()}</View>
                </View>
              </View>
            </CardItem>
          </TouchableHighlight>
        </Card>
      </View>
    );
  }
}

export default ScheduleCard;
