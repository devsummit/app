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
import { RefreshControl, View, FlatList, Image, TouchableOpacity, AsyncStorage, TouchableHighlight } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import openSocket from 'socket.io-client';
import Icon from 'react-native-vector-icons/Entypo';
import CameraIcon from 'react-native-vector-icons/FontAwesome';
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

class Feed extends Component {
  constructor(props) {
    super(props);
    subscribeToFeeds((err, data) => this.props.updateFeeds(data));
    console.ignoredYellowBox = ['Setting a timer'];
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
    }).catch((err) => {
        console.log(err);
    });
  }

  handleChange = (value) => {
    this.props.updateText(value);
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    return (
      <Container
        style={styles.container}
      >
        <HeaderPoint title="FEED" />
        <Tabs style={styles.tabs} initialPage={0}>
          <Tab heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>News feed</Text></TabHeading>}>
            <Content>
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
                    </Item>
                  </Body>
                </CardItem>

                <CardItem>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => this.uploadImage(this)}>
                      <View style={{ margin: 10 }}>
                        <CameraIcon name="camera" size={24} color="grey" />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.postFeed()}>
                      <View style={{ borderWidth: 0.5, borderColor: 'blue', borderRadius: 20 }}>
                        <Text style={{ textAlign: 'center', margin: 10, paddingLeft: 10, paddingRight: 10 }}>Post</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </CardItem>
                {
                  this.props.isFetching
                    ? <Spinner color="yellow" />
                    : this.props.feeds &&
                    <FlatList
                      keyExtractor={this._keyExtractor}
                      data={this.props.feeds}
                      renderItem={({ item }) => (
                        <Card style={{ flex: 0 }}>
                          <CardItem>
                            <Left>
                              <Thumbnail source={{ uri: item.user.photos[0].url || '' }} />
                              <Body>
                                <Text>{item.user.username}</Text>
                                <Text note>{item.created_at}</Text>
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
                }
              </Card>
            </Content>
          </Tab>
          <Tab heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>Ticket</Text></TabHeading>}>
            <TicketList />
          </Tab>
        </Tabs>
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
  feeds: array,
  textData: string
};

export default connect(mapStateToProps, actions)(Feed);
