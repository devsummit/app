import React, { Component } from 'react';
import {
  Card,
  CardItem,
  Text
} from 'native-base';
import { Image, View, ScrollView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import MaterialList from '../MaterialList';
import strings from '../../localization';
import Moment from 'moment';
import styles from './style';

const background = require('./../../../assets/images/background.png');

const horizontalMargin = 35;
const slideWidth = 70;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;

class ScheduleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.user
    };
  }

  componentDidMount() {
    this.setState({ users: this.props.user });
  }

  renderItem = (item, index) => {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image source={{ uri: item.item.photos[0].url }} style={styles.image} />
        <Text style={styles.speaker}>{item.item.first_name} {item.item.last_name}</Text>
      </View>
    );
  }

  render() {
    const { event, speaker, stage, user, time_start, time_end } = this.props;
    const start = new Moment(time_start);
    const end = new Moment(time_end);
    const timeStart = start.format('hh:mm A');
    const timeEnd = end.format('hh:mm A');
    const hasSpeaker = !(Object.keys(speaker).length === 0 && speaker.constructor === Object);
    const hasUser = user.length > 0;
    const type = this.props.event.type;
    return (
      <ScrollView>
        <View style={styles.container}>
          {hasSpeaker ?
            <View>
              <Image source={background} style={styles.background}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Image
                    source={{ uri: user.photos[0].url }}
                    style={styles.image}
                  />
                  <Text style={styles.speaker}>{user.first_name} {user.last_name}</Text>
                </View>
              </Image>
              <CardItem>
                <View style={styles.speakerDetail}>
                  <Text style={styles.title}>{strings.schedule.job}</Text>
                  <Text style={styles.data}>{speaker.job}</Text>
                  <Text style={styles.title}>{strings.schedule.summary}</Text>
                  <Text style={styles.data}>{speaker.summary}</Text>
                </View>
              </CardItem>
            </View> : <View />
          }
          {hasUser ?
            <Image source={background} style={styles.background}>
              <View>
                <Carousel
                  data={this.state.users}
                  renderItem={this.renderItem}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  contentContainerCustomStyle={{ alignItems: 'center', justifyContent: 'center' }}
                  containerCustomStyle={{ marginVertical: 20 }}
                  activeSlideAlignment="center"
                  inactiveSlideOpacity={0.3}
                  autoplay
                  loop
                  loopClonesPerSide={1}
                  inactiveSlideScale={0.3}
                  autoplayDelay={3000}
                  autoplayInterval={3000}
                />
              </View>
            </Image> : <View />
          }
          <Card>
            <CardItem>
              <View style={styles.info}>
                <View style={styles.detail}>
                  <Text style={styles.title}>{event.title}</Text>
                  <Text style={styles.description}>{event.information}</Text>
                </View>
                <View style={{ flex: 1, borderWidth: 1, borderColor: '#E0E0E0', marginVertical: 20 }} />
              </View>
            </CardItem>
            <View style={{ marginHorizontal: 8 }}>
              <Text style={styles.data}>{strings.schedule.start} {timeStart}</Text>
              <Text style={styles.data}>{strings.schedule.end} {timeEnd}</Text>
            </View>
          </Card>
          {type === 'speaker' ?
            <Card>
              <CardItem>
                <MaterialList />
              </CardItem>
            </Card>
            : <View />}
        </View>
      </ScrollView>
    );
  }
}

export default ScheduleDetail;
