import React, { Component } from 'react';
import {
  Container,
  Content,
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
  Spinner,
  Picker
} from 'native-base';
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage,
  Modal,
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import { func, bool, object, array, string } from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import openSocket from 'socket.io-client';
import Icon from 'react-native-vector-icons/Entypo';
import CameraIcon from 'react-native-vector-icons/FontAwesome';
import IconSimpleLine from 'react-native-vector-icons/SimpleLineIcons';
import Share, { ShareSheet, Button } from 'react-native-share';
import Toast from 'react-native-simple-toast';
import 'moment/locale/pt-br';
import styles from './styles';
import strings from '../../localization';
import HeaderPoint from '../../components/Header';
import * as actions from './actions';
import * as selectors from './selectors';
import TicketList from '../TicketList';
import { API_BASE_URL } from '../../constants';
import { CONTENT_REPORT, TWITTER_ICON, FACEBOOK_ICON, WHATSAPP_ICON } from './constants';

const socket = openSocket(API_BASE_URL);
const noFeeds = require('./../../../assets/images/nofeed.png');

function subscribeToFeeds(cb) {
  socket.on('feeds', data => cb(null, data));
}

const today = new Date();
const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;

function timeDifference(current, previous) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return 'few seconds ago';
  } else if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)} minutes ago`;
  } else if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)} hours ago`;
  } else if (elapsed < msPerMonth) {
    if (previous.getMonth() + 1 === 1) {
      return `${previous.getDate()} Jan`;
    } else if (previous.getMonth() + 1 === 2) {
      return `${previous.getDate()} Feb`;
    } else if (previous.getMonth() + 1 === 3) {
      return `${previous.getDate()} Mar`;
    } else if (previous.getMonth() + 1 === 4) {
      return `${previous.getDate()} Apr`;
    } else if (previous.getMonth() + 1 === 5) {
      return `${previous.getDate()} May`;
    } else if (previous.getMonth() + 1 === 6) {
      return `${previous.getDate()} Jun`;
    } else if (previous.getMonth() + 1 === 7) {
      return `${previous.getDate()} Jul`;
    } else if (previous.getMonth() + 1 === 8) {
      return `${previous.getDate()} Aug`;
    } else if (previous.getMonth() + 1 === 9) {
      return `${previous.getDate()} Sep`;
    } else if (previous.getMonth() + 1 === 10) {
      return `${previous.getDate()} Oct`;
    } else if (previous.getMonth() + 1 === 11) {
      return `${previous.getDate()} Nov`;
    } else if (previous.getMonth() + 1 === 12) {
      return `${previous.getDate()} Dec`;
    }
  }
}

/* eslint-disable */
String.prototype.toDateFromDatetime = function() {
  var parts = this.split(/[- :]/);
  return new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
};
/* eslint-enable */

/**
 * Map redux state to component props
 */
const mapStateToProps = () =>
  createStructuredSelector({
    isFetching: selectors.getIsFetchingFeeds(),
    feeds: selectors.getFetchFeeds(),
    links: selectors.getFeedsLinks(),
    isPosting: selectors.getIsPostingFeed(),
    imagesData: selectors.getUpdateImage(),
    textData: selectors.getUpdateText(),
    currentPage: selectors.getCurrentPage(),
    isRemoving: selectors.getIsRemoveFeed()
  });

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userPostID: '',
      postId: '',
      firstName: '',
      lastName: '',
      profileUrl: 'https://museum.wales/media/40374/thumb_480/empty-profile-grey.jpg',
      modalVisible: false,
      postToFeeds: false,
      imagePreview: '',
      visible: false,
      modalReport: false,
      optionVisible: false,
      report: '',
      shareOptions: {
        message: '',
        url: null
      },
      shareTwitter: {
        message: '',
        url: null
      }
    };
    console.ignoredYellowBox = [ 'Setting a timer' ];
    subscribeToFeeds((err, data) => this.props.updateFeeds(data));
  }

  componentWillMount() {
    this.props.fetchFeeds(this.props.currentPage);

    AsyncStorage.getItem('profile_data').then((profile) => {
      const data = JSON.parse(profile);
      const firstName = data.first_name;
      const lastName = data.last_name;
      const url = data.photos[0].url;
      const id = data.id;
      this.setState({ firstName, lastName, profileUrl: url, userId: id });
    });
  }

  setModalVisible = (visible, image) => {
    this.setState({ modalVisible: visible, imagePreview: image });
  };

  setModalPost = (visible) => {
    this.setState({ postToFeeds: visible });
    this.props.clearImage();
    this.props.clearTextField();
  };

  setModalReport = (visible) => {
    this.setState({ modalReport: visible });
  };

  postFeed = (callback) => {
    this.props.postFeeds(this.props.imagesData, this.props.textData);
    this.setModalPost(false);
  };

  uploadImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
      includeBase64: true
    })
      .then((image) => {
        this.props.updateImage(image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  takeImage = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 300,
      includeBase64: true
    })
      .then((image) => {
        this.props.updateImage(image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (value) => {
    this.props.updateText(value);
  };

  fetchNextFeeds = () => {
    this.props.fetchPageWithPaginate(this.props.currentPage);
  };

  _keyExtractor = (item, index) => item.id;

  onCancel = () => {
    this.setState({ visible: false });
  };

  onOpen = (_message, _url) => {
    this.setState({ visible: true });

    var urlTwitter = '';
    let share = Object.assign({}, this.state.shareOptions);
    let shareTwitter = Object.assign({}, this.state.shareTwitter);

    if (_url === null) {
      urlTwitter = '';
    } else {
        urlTwitter = _url;
    }
    
    shareTwitter.message = _message;
    shareTwitter.url = urlTwitter;
    share.message = _message;
    share.url = _url;
    this.setState({ shareOptions: share, shareTwitter: shareTwitter });
  };

  alertRemoveFeed = (postId) => {
    Alert.alert(
      '',
      'Are you sure you want to delete this post?',
      [
        { text: 'CANCEL', onPress: () => this.setState({ optionVisible: false }) },
        { text: 'DELETE', onPress: () => this.removeFeed(postId) }
      ],
      { cancelable: false }
    );
  };

  removeFeed = (postId) => {
    this.props.removeFeed(postId);
    this.setState({ optionVisible: false });
  };

  alertReportFeed = (postId) => {
    Alert.alert(
      '',
      'Are you sure you want to report this post?',
      [
        { text: 'CANCEL', onPress: () => this.setState({ optionVisible: false }) },
        { text: 'REPORT', onPress: () => this.reportFeed(postId) }
      ],
      { cancelable: false }
    );
  };

  reportFeed = (postId) => {
    this.props.reportFeed(postId);
    this.setState({ optionVisible: false });
  };

  handleInputChange = (value) => {
    this.setState({ report: value });
  };

  render() {
    return (
      <Container style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#FF8B00',
            justifyContent: 'space-between'
          }}
        >
          <HeaderPoint title={strings.feed.title} />
          <TouchableWithoutFeedback onPress={() => Actions.notification()}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}
            >
              <CameraIcon
                name="bell"
                style={{
                  elevation: 2,
                  alignSelf: 'center',
                  color: '#FFF',
                  fontSize: 20,
                  marginRight: 20,
                  shadowOffset: {
                    width: 0,
                    height: 3
                  },
                  shadowRadius: 5,
                  shadowOpacity: 1.0
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Tabs style={styles.tabs} initialPage={0}>
          <Tab
            heading={
              <TabHeading style={styles.tabHeading}>
                <Text style={styles.tabTitle}>{strings.feed.newsFeed}</Text>
              </TabHeading>
            }
          >
            <Content style={{ backgroundColor: '#E0E0E0' }}>
              {this.props.isFetching ? (
                <Spinner color="yellow" />
              ) : (
                this.props.feeds && (
                  <View style={{ flex: 1 }}>
                    {!this.props.feeds.length > 0 ? (
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={noFeeds} style={{ opacity: 0.5 }} />
                        <Text style={styles.artworkText}>Your feeds is empty</Text>
                      </View>
                    ) : (
                      <FlatList
                        keyExtractor={this._keyExtractor}
                        data={this.props.feeds}
                        initialNumToRender={5}
                        renderItem={({ item }) =>
                          (item.type === 'sponsor' ? (
                            <Card style={{ flex: 0 }}>
                              <CardItem>
                                <Left>
                                  <Thumbnail source={{ uri: item.user.photos[0].url || '' }} />
                                  <Body>
                                    <Text>
                                      {item.user.first_name} {item.user.last_name}
                                    </Text>
                                    <Text note>
                                      <IconSimpleLine name="globe" />sponsored
                                    </Text>
                                  </Body>
                                </Left>
                              </CardItem>
                              <CardItem>
                                <Body>
                                  <Text style={{ marginBottom: 8 }}>{item.message}</Text>
                                  <TouchableOpacity
                                    style={{ alignSelf: 'center' }}
                                    onPress={() => this.setModalVisible(true, item.attachment)}
                                  >
                                    <Image
                                      source={{ uri: item.attachment }}
                                      style={styles.images}
                                    />
                                  </TouchableOpacity>
                                </Body>
                              </CardItem>
                              <CardItem>
                                <Right>
                                  <Button
                                    transparent
                                    textStyle={{ color: '#87838B' }}
                                    onPress={() => this.onOpen(item.message, item.attachment)}
                                  >
                                    <Icon name="share" style={{ fontSize: 16, color: '#0000ff' }} />
                                    <Text style={styles.buttonShare}>{strings.feed.share}</Text>
                                  </Button>
                                </Right>
                              </CardItem>
                            </Card>
                          ) : (
                            <Card style={{ flex: 1, paddingRight: 20 }}>
                              <View style={{ padding: 12, flexDirection: 'row' }}>
                                <Thumbnail source={{ uri: item.user.photos[0].url || '' }} />
                                <View>
                                  <View style={{ marginLeft: 8 }}>
                                    <Text style={{ color: '#000' }}>
                                      {item.user.first_name} {item.user.last_name}
                                    </Text>
                                    <Text note>
                                      {timeDifference(today, item.created_at.toDateFromDatetime())}
                                    </Text>
                                  </View>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      flexWrap: 'wrap',
                                      marginRight: 20
                                    }}
                                  >
                                    <Text style={{ color: '#000', margin: 10 }}>
                                      {item.message}
                                    </Text>
                                    <TouchableOpacity
                                      style={{ alignSelf: 'center', marginLeft: 8 }}
                                      onPress={() => this.setModalVisible(true, item.attachment)}
                                    >
                                      <Image
                                        source={{ uri: item.attachment }}
                                        style={styles.images}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                              <View
                                style={{
                                  borderBottomColor: '#BDBDBD',
                                  borderWidth: 0.5,
                                  marginRight: -20
                                }}
                              />
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  justifyContent: 'space-around'
                                }}
                              >
                                {this.state.userId === item.user_id ? (
                                  <TouchableWithoutFeedback
                                    onPress={() => this.alertRemoveFeed(item.id)}
                                  >
                                    <View
                                      style={{
                                        flex: 1,
                                        backgroundColor: 'transparent',
                                        borderRadius: 8
                                      }}
                                    >
                                      <Text style={styles.buttonReport}>{strings.feed.delete}</Text>
                                    </View>
                                  </TouchableWithoutFeedback>
                                ) : (
                                  <TouchableWithoutFeedback
                                    onPress={() => this.alertReportFeed(item.id)}
                                  >
                                    <View
                                      style={{
                                        flex: 1,
                                        backgroundColor: 'transparent',
                                        borderRadius: 8
                                      }}
                                    >
                                      <Text style={styles.buttonReport}>{strings.feed.report}</Text>
                                    </View>
                                  </TouchableWithoutFeedback>
                                )}
                                <TouchableWithoutFeedback
                                  onPress={() => this.onOpen(item.message, item.attachment)}
                                >
                                  <View
                                    style={{
                                      flex: 1,
                                      marginLeft: 10,
                                      backgroundColor: 'transparent',
                                      borderRadius: 8
                                    }}
                                  >
                                    <Text style={styles.buttonReport}>{strings.feed.share}</Text>
                                  </View>
                                </TouchableWithoutFeedback>
                              </View>
                            </Card>
                          ))}
                      />
                    )}
                    {this.props.links.next && this.props.feeds.length > 0 ? (
                      <TouchableOpacity onPress={this.fetchNextFeeds}>
                        <Card>
                          <CardItem>
                            <Body
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                              }}
                            >
                              <Text style={{ color: '#42A5F5' }}>{strings.feed.showMore}</Text>
                            </Body>
                          </CardItem>
                        </Card>
                      </TouchableOpacity>
                    ) : (
                      <View />
                    )}
                  </View>
                )
              )}
            </Content>
            <Fab
              style={{ backgroundColor: '#FF8B00' }}
              position="bottomRight"
              onPress={() => this.setModalPost(true)}
            >
              <CameraIcon name="pencil-square-o" />
            </Fab>
          </Tab>
          <Tab
            heading={
              <TabHeading style={styles.tabHeading}>
                <Text style={styles.tabTitle}>{strings.feed.ticket}</Text>
              </TabHeading>
            }
          >
            <TicketList />
          </Tab>
        </Tabs>
        {/* Modal for create new feeds post */}
        <Modal
          animationType={'fade'}
          transparent
          visible={this.state.postToFeeds}
          onRequestClose={() => this.setModalPost(!this.state.postToFeeds)}
        >
          <Card>
            <KeyboardAvoidingView>
              <ScrollView
                keyboardShouldPersistTaps="always"
                ref={ref => (this.scrollView = ref)}
                onContentSizeChange={(height, width) =>
                  this.scrollView.scrollToEnd({ animated: true })}
              >
                <CardItem>
                  <Left>
                    <Thumbnail source={{ uri: this.state.profileUrl }} />
                    <Body>
                      <Text>
                        {this.state.firstName} {this.state.lastName}
                      </Text>
                    </Body>
                  </Left>
                  <TouchableOpacity onPress={() => this.setModalPost(false)}>
                    <Right>
                      <CameraIcon name="times-circle-o" size={30} />
                    </Right>
                  </TouchableOpacity>
                </CardItem>

                <CardItem>
                  <Item regular>
                    <CustomInput
                      textData={this.props.textData}
                      onChangeText={text => this.handleChange(text)}
                    />
                  </Item>
                </CardItem>

                <CardItem>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableHighlight onPress={() => this.uploadImage(this)}>
                      <View style={{ margin: 10 }}>
                        <CameraIcon name="image" size={24} color="grey" />
                      </View>
                    </TouchableHighlight>
                    <TouchableOpacity onPress={() => this.takeImage(this)}>
                      <View style={{ margin: 10 }}>
                        <CameraIcon name="camera" size={24} color="grey" />
                      </View>
                    </TouchableOpacity>
                    {this.props.textData !== '' ||
                    (this.props.imagesData.path || this.props.imagesData.sourceURL) ? (
                      <TouchableOpacity onPress={() => this.postFeed()}>
                          <View
                          style={{
                              borderWidth: 1,
                              borderColor: 'blue',
                              borderRadius: 20,
                              width: 75,
                              height: 45,
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                        >
                          <Text style={{ textAlign: 'center', margin: 10, color: 'blue' }}>
                            Post
                            </Text>
                        </View>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity activeOpacity={1}>
                          <View
                            style={{
                              borderWidth: 1,
                              borderColor: 'grey',
                              borderRadius: 20,
                              width: 75,
                              height: 45,
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <Text style={{ textAlign: 'center', margin: 10, color: 'grey' }}>
                            Post
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                  </View>
                </CardItem>
                {this.props.imagesData &&
                  (this.props.imagesData.path || this.props.imagesData.sourceURL) && (
                    <CardItem cardBody>
                      <Image
                        source={{
                          uri: this.props.imagesData.path || this.props.imagesData.sourceURL
                        }}
                        style={{ height: 200, width: null, flex: 1 }}
                      />
                    </CardItem>
                  )}
              </ScrollView>
            </KeyboardAvoidingView>
          </Card>
        </Modal>
        {/* Modal for picture preview */}
        <Modal
          animationType={'fade'}
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
        >
          <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#080808' }}>
            <View style={{ flex: 1, margin: 10 }}>
              <Image
                source={{ uri: this.state.imagePreview }}
                resizeMode={'contain'}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </Modal>

        {/* Modal For Reports  */}
        <Modal
          animationType="slide"
          transparent
          visible={this.state.modalReport}
          onRequestClose={() => this.setModalReport(false)}
        >
          <View>
            <View style={styles.modalText}>
              <Text>All reports are confidential</Text>
              <Text style={{ fontSize: 12 }}>What best describe this content?</Text>
            </View>
            <Picker
              mode="dropdown"
              placeholder="Chosee your report here"
              selectedValue={this.state.report}
              onValueChange={value => this.handleInputChange(value)}
            >
              {CONTENT_REPORT.map(item => (
                <Item key={item.value} label={item.label} value={item.report} />
              ))}
            </Picker>
          </View>
        </Modal>
        {/* Sheet For Share */}
        <ShareSheet visible={this.state.visible} onCancel={this.onCancel.bind(this)}>
          <Button
            iconSrc={{ uri: TWITTER_ICON }}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(Object.assign(this.state.shareTwitter, { social: 'twitter' }));
              }, 300);
            }}
          >
            {strings.global.twitter}
          </Button>
          <Button
            iconSrc={{ uri: FACEBOOK_ICON }}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(Object.assign(this.state.shareOptions, { social: 'facebook' }));
              }, 300);
            }}
          >
            {strings.global.facebook}
          </Button>
          <Button
            iconSrc={{ uri: WHATSAPP_ICON }}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.shareSingle(Object.assign(this.state.shareOptions, { social: 'whatsapp' }));
              }, 300);
            }}
          >
            {strings.global.whatsapp}
          </Button>
        </ShareSheet>
      </Container>
    );
  }
}

/* eslint-disable */
class CustomInput extends Component {
  componentDidMount() {
    this._input._root.focus();
  }

  render() {
    return (
      <Input
        rounded
        placeholder={strings.feed.shareActivity}
        style={{ textAlignVertical: 'top' }}
        multiline
        ref={input => (this._input = input)}
        numberOfLines={8}
        value={this.props.textData}
        onChangeText={text => this.props.onChangeText(text)}
      />
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
  textData: string,
  isRemoving: bool,
  removeFeed: func,
  reportFeed: func,
  link: string
};

export default connect(mapStateToProps, actions)(Feed);
