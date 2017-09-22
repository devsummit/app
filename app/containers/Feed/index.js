import React, { Component } from 'react';
import {
  Container,
  Content,
  ListItem,
  Button,
  Text,
  Tabs,
  Tab,
  TabHeading,
  Fab,
  Card,
  CardItem,
  Body,
  Left,
  Right,
  Item,
  Thumbnail,
  Input,
  Spinner
} from 'native-base';
import Toast from 'react-native-simple-toast';
import { func, bool, object, array, string } from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import { RefreshControl, FlatList, Image, TouchableOpacity, AsyncStorage, View } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import openSocket from 'socket.io-client';
import Icon from 'react-native-vector-icons/Entypo';
import CameraIcon from 'react-native-vector-icons/FontAwesome';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import * as moment from 'moment';
import Moment from 'react-moment';
import 'moment/locale/pt-br';
import styles from './styles';
import HeaderPoint from '../../components/Header';
import * as actions from './actions';
import * as selectors from './selectors';
import TicketList from '../TicketList';

import { API_BASE_URL } from '../../constants';


const socket = openSocket(API_BASE_URL);

function subscribeToFeeds(cb) {
  socket.on('feeds', data => cb(null, data));
}

const today = new Date();
const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;

function timeDifference(current, previous) {
  
      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;
  
      var elapsed = current - previous;
  
      if (elapsed < msPerMinute) {
           return 'few seconds ago';   
      }
  
      else if (elapsed < msPerHour) {
           return Math.round(elapsed/msPerMinute) + ' minutes ago';   
      }
  
      else if (elapsed < msPerDay ) {
           return Math.round(elapsed/msPerHour ) + ' hours ago';   
      }
  
      else if (elapsed < msPerMonth) {
        if ((previous.getMonth() + 1) === 1) {
          return `${previous.getDate()} Jan`;   
        } else if ((previous.getMonth() + 1) === 2) {
          return `${previous.getDate()} Feb`; 
        } else if ((previous.getMonth() + 1) === 3) {
          return `${previous.getDate()} Mar`; 
        } else if ((previous.getMonth() + 1) === 4) {
          return `${previous.getDate()} Apr`; 
        } else if ((previous.getMonth() + 1) === 5) {
          return `${previous.getDate()} May`; 
        } else if ((previous.getMonth() + 1) === 6) {
          return `${previous.getDate()} Jun`; 
        } else if ((previous.getMonth() + 1) === 7) {
          return `${previous.getDate()} Jul`; 
        } else if ((previous.getMonth() + 1) === 8) {
          return `${previous.getDate()} Aug`; 
        } else if ((previous.getMonth() + 1) === 9) {
          return `${previous.getDate()} Sep`; 
        } else if ((previous.getMonth() + 1) === 10) {
          return `${previous.getDate()} Oct`; 
        } else if ((previous.getMonth() + 1) === 11) {
          return `${previous.getDate()} Nov`; 
        } else if ((previous.getMonth() + 1) === 12) {
          return `${previous.getDate()} Dec`; 
        }
      }
      
  }

  String.prototype.toDateFromDatetime = function() {
    var parts = this.split(/[- :]/);
    return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
  };

/**
 * Map redux state to component props
 */
const mapStateToProps = () => createStructuredSelector({
  isFetching: selectors.getIsFetchingFeeds(),
  feeds: selectors.getFetchFeeds(),
  isPosting: selectors.getIsPostingFeed(),
  imagesData: selectors.getUpdateImage(),
  textData: selectors.getUpdateText()
});


class Feed extends React.Component {
  constructor(props) {
    super(props);
    subscribeToFeeds((err, data) => this.props.updateFeeds(data));
  }

  state = {
    name: '',
    profileUrl: 'https://museum.wales/media/40374/thumb_480/empty-profile-grey.jpg'
  };

  componentWillMount() {
    this.props.fetchFeeds();

    AsyncStorage.getItem('profile_data')
      .then((profile) => {
        const data = JSON.parse(profile);
        const name = data.first_name;
        const url = data.photos[0].url;
        this.setState({ name, profileUrl: url });
      });
  }

  postFeed = () => {
    this.props.postFeeds(this.props.imagesData, this.props.textData);
  }

  uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 200,
      cropping: true,
      includeBase64: true
    }).then((image) => {
      this.props.updateImage(image);
    }).catch(err => Toast.show('Error getting image from library', err));
  }

  handleChange = (value) => {
    this.props.updateText(value);
  }

  keyExtractor = item => item.id;

  render() {
    console.log('landing here feed this.props', this.props);
    console.log('landing here real moment', today);
    console.log('landing here time difference', timeDifference(today, '2014-04-23 22:06:17'.toDateFromDatetime()));
    return (
      <Container
        style={styles.container}
      >
        <Content>
          <HeaderPoint title="FEED" />
          <Tabs style={styles.tabs}>
            <Tab heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>News feed</Text></TabHeading>}>
              <Card style={{ flex: 0, marginRight: 10, marginLeft: 8, borderRadius: 3 }}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{ uri: this.state.profileUrl }} />
                    <Body>
                      <Text>{ this.state.name }</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem>
                  <Body>
                    <Item regular>
                      <Input
                        rounded
                        placeholder={'Share your activity ...'}
                        multiline
                        numberOfLines={4}
                        value={this.props.textData}
                        onChangeText={text => this.handleChange(text)}
                      />
                      <TouchableOpacity onPress={() => this.uploadImage(this)}>
                        <CameraIcon name="camera" size={24} color="grey" style={{ marginRight: 10 }} />
                      </TouchableOpacity>
                    </Item>
                  </Body>
                </CardItem>

                <CardItem>
                  <Body>
                    <Item fixedLabel />
                  </Body>
                  <Right>
                    <Button rounded primary bordered textStyle={{ color: '#87838B' }} onPress={() => this.postFeed()}>
                      { this.props.isPosting
                        ?
                        <Spinner color="black" />
                        :
                        <Text style={{ textAlign: 'center' }}>Post</Text>
                      }
                    </Button>
                  </Right>
                </CardItem>
                {
                  this.props.isFetching
                    ? <Spinner color="yellow" />
                    : this.props.feeds &&
                    <View>
                      <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.props.feeds}
                        renderItem={({ item }) => (
                          <Card style={{ flex: 0 }}>
                            <CardItem>
                              <Left>
                                <Thumbnail source={{ uri: item.user.photos[0].url }} />
                                <Body>
                                  <Text>{item.user.username}</Text>
                                  <Text note>{timeDifference(today, item.created_at.toDateFromDatetime())}</Text>
                                </Body>
                              </Left>
                            </CardItem>
                            <CardItem>
                              <Body>
                                <Image source={{ uri: item.attachment }} style={{ height: 200, width: 300, flex: 1 }} />
                                <Text>
                                  {item.message}
                                </Text>
                              </Body>
                            </CardItem>
                            <CardItem>
                              <Left>
                                <Button transparent textStyle={{ color: '#87838B' }}>
                                  <Icon name="share" />
                                  <Text>Share</Text>
                                </Button>
                              </Left>
                            </CardItem>
                          </Card>
                        )}
                      />
                    </View>
                }
              </Card>
            </Tab>
            <Tab heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>Ticket</Text></TabHeading>}>
              <TicketList />
            </Tab>
          </Tabs>
        </Content>
        <Fab
          style={{ backgroundColor: '#FFA726' }}
          position="topRight"
          onPress={() => Actions.notification()}
        >
          <Icon name="bell" />
        </Fab>
      </Container>
    );
  }
}

Feed.PropTypes = {
  updateFeeds: func,
  fetchFeeds: func,
  updateText: func,
  postFeeds: func,
  isFetching: bool,
  imagesData: object,
  feeds: array
};

export default connect(mapStateToProps, actions)(Feed);
