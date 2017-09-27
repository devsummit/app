import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Tabs,
  Tab,
  TabHeading,
  Fab,
  Card,
  CardItem,
  Body,
  Left,
  Item,
  Thumbnail,
  Input,
  Spinner
} from 'native-base';
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  AsyncStorage,
  BackHandler,
  KeyboardAvoidingView,
  Modal,
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
import 'moment/locale/pt-br';
import styles from './styles';
import strings from '../../localization';
import HeaderPoint from '../../components/Header';
import * as actions from './actions';
import * as selectors from './selectors';
import TicketList from '../TicketList';
import Share, { ShareSheet,Button } from 'react-native-share';
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

  let msPerMinute = 60 * 1000;
  let msPerHour = msPerMinute * 60;
  let msPerDay = msPerHour * 24;
  let msPerMonth = msPerDay * 30;
  let msPerYear = msPerDay * 365;

  let elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return 'few seconds ago';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed/msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay ) {
    return Math.round(elapsed/msPerHour ) + ' hours ago';
  } else if (elapsed < msPerMonth) {
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
  textData: selectors.getUpdateText(),
  currentPage: selectors.getCurrentPage()
});


class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      profileUrl: 'https://museum.wales/media/40374/thumb_480/empty-profile-grey.jpg',
      modalVisible: false,
      postToFeeds: false,
      imagePreview: '',
      visible: false,
      shareOptions: {
        message: '',
        url: ''
      }
    };
    console.ignoredYellowBox = ['Setting a timer'];
    subscribeToFeeds((err, data) => this.props.updateFeeds(data));
  }

  componentWillMount() {
    this.props.fetchFeeds(this.props.currentPage);

    AsyncStorage.getItem('profile_data')
      .then((profile) => {
        const data = JSON.parse(profile);
        const firstName = data.first_name;
        const lastName = data.last_name;
        const url = data.photos[0].url;
        this.setState({ firstName, lastName, profileUrl: url });
      });
  }

  setModalVisible = (visible, image) => {
    this.setState({ modalVisible: visible, imagePreview: image });
  }

  setModalPost = (visible) => {
    this.setState({ postToFeeds: visible });
    this.props.clearImage();
    this.props.clearTextField();
  }

  postFeed = (callback) => {
    this.props.postFeeds(this.props.imagesData, this.props.textData);
    this.setModalPost(false)
  }

  uploadImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 300,
      cropping: true,
      includeBase64: true
    }).then((image) => {
      this.props.updateImage(image);
    }).catch((err) => {
        console.log(err);
    });
  }

  takeImage = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 300,
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

  fetchNextFeeds = () => {
    this.props.fetchPageWithPaginate(this.props.currentPage);
  }

  _keyExtractor = (item, index) => item.id;

  onCancel = () => {
    this.setState({visible: false});
  }

  onOpen = (_message, _url) => {
    this.setState({ visible: true });
    this.setState({ shareOptions: Object.assign({}, this.state.shareOptions, { message: _message }) });
    this.setState({ shareOptions: Object.assign({}, this.state.shareOptions, { url: _url }) });
  }

  render() {
    return (
      <Container
        style={styles.container}
      >
        <HeaderPoint title={strings.feed.title} />
        <Tabs style={styles.tabs} initialPage={0}>
          <Tab heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>{strings.feed.newsFeed}</Text></TabHeading>}>
            <Content>
              <Card style={{ flex: 0, marginRight: 10, marginLeft: 8, borderRadius: 3 }}>
                {
                  this.props.isFetching
                    ? <Spinner color="yellow" />
                    : this.props.feeds &&
                    <View>
                      <FlatList
                        keyExtractor={this._keyExtractor}
                        data={this.props.feeds}
                        initialNumToRender={5}
                        renderItem={({ item }) => (
                          <Card style={{ flex: 0 }}>
                            <CardItem>
                              <Left>
                                <Thumbnail source={{ uri: item.user.photos[0].url || '' }} />
                                <Body>
                                  <Text>{item.user.username}</Text>
                                  <Text note>{timeDifference(today, item.created_at.toDateFromDatetime())}</Text>
                                </Body>
                              </Left>
                            </CardItem>

                            <CardItem>
                              <Body>
                                <TouchableOpacity onPress={() => this.setModalVisible(true, item.attachment) }>
                                  <Image source={{ uri: item.attachment }} style={{ height: 200, width: 300, justifyContent: 'space-between' }} />
                                </TouchableOpacity>
                                <Text>
                                  {item.message}
                                </Text>
                              </Body>
                            </CardItem>

                            <CardItem>
                              <Left>
                                <Button transparent textStyle={{ color: '#87838B' }} onPress={() => this.onOpen(item.message, item.attachment )}>
                                  <Icon name="share" style={{ color: '#0000ff' }}/>
                                  <Text style={styles.buttonShare}>{strings.feed.share}</Text>
                                </Button>
                              </Left>
                            </CardItem>
                          </Card>
                        )}
                      />
                      <TouchableOpacity onPress={this.fetchNextFeeds}>
                        <Card>
                          <CardItem>
                            <Body style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                              <Text style={{ color: '#42A5F5' }}>{strings.feed.showMore}</Text>
                            </Body>
                          </CardItem>
                        </Card>
                      </TouchableOpacity>
                    </View>
                }
              </Card>
            </Content>
              <ShareSheet visible={this.state.visible} onCancel={this.onCancel.bind(this)}>
                <Button
                  iconSrc={{ uri: TWITTER_ICON }}
                  onPress={() => { this.onCancel();
                    setTimeout(() => { Share.shareSingle(Object.assign(this.state.shareOptions, {"social": "twitter"})); }, 300); }}
                >
                  {strings.global.twitter}
                </Button>
                <Button
                  iconSrc={{ uri: FACEBOOK_ICON }}
                  onPress={() => { this.onCancel();
                    setTimeout(() => { Share.shareSingle(Object.assign(this.state.shareOptions, {'social':'facebook'})); }, 300); }}
                >
                  {strings.global.facebook}
                </Button>
                <Button
                  iconSrc={{ uri: WHATSAPP_ICON }}
                  onPress={() => { this.onCancel();
                    setTimeout(() => { Share.shareSingle(Object.assign(this.state.shareOptions, {'social':'whatsapp'})); }, 300); }}
                >
                  {strings.global.whatsapp}
                </Button>
            </ShareSheet>
          </Tab>
          <Tab heading={<TabHeading style={styles.tabHeading}><Text style={styles.tabTitle}>{strings.feed.ticket}</Text></TabHeading>}>
            <TicketList />
          </Tab>
        </Tabs>
        <Fab
          style={{ backgroundColor: '#0D47A1' }}
          position="bottomRight"
          onPress={() => this.setModalPost(true)}
        >
          <Icon name="brush" />
        </Fab>
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
                ref={ref => this.scrollView = ref}
                onContentSizeChange={(height, width) => this.scrollView.scrollToEnd({animated: true})}>
                <CardItem>
                  <Left>
                    <Thumbnail source={{ uri: this.state.profileUrl }} />
                    <Body>
                      <Text>{ this.state.name }</Text>
                    </Body>
                  </Left>
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
                    {
                      this.props.textData !== '' || (this.props.imagesData.path || this.props.imagesData.sourceURL)
                      ? (
                          <TouchableOpacity onPress={() => this.postFeed()}>
                            <View style={{ borderWidth: 1, borderColor: 'blue', borderRadius: 20, width: 75, height: 45, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', margin: 10 }}>Post</Text>
                            </View>
                          </TouchableOpacity>
                        )
                      : (
                          <TouchableOpacity activeOpacity={1}>
                            <View style={{ borderWidth: 1, borderColor: 'grey', borderRadius: 20, width: 75, height: 45, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ textAlign: 'center', margin: 10, color: 'grey' }}>Post</Text>
                            </View>
                          </TouchableOpacity>
                        )
                    }
                  </View>
                </CardItem>
                {
                  this.props.imagesData && (this.props.imagesData.path || this.props.imagesData.sourceURL) &&
                  <CardItem cardBody>
                    <Image source={{uri: (this.props.imagesData.path || this.props.imagesData.sourceURL)}} style={{height: 200, width: null, flex: 1}}/>
                  </CardItem>
                }
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
          <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#080808'}}>
            <View style={{ flex: 1, margin: 10 }}>
              <Image source={{ uri: this.state.imagePreview }} resizeMode={'contain'} style={{ flex: 1 }} />
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

class CustomInput extends Component {
  componentDidMount() {
    this._input._root.focus();
    BackHandler.addEventListener("hardwareBackPress", () => { console.log("HERERE"); this.setModalPost(false) })
  }

  render() {
    return (
      <Input
        rounded
        placeholder={'Share your activity ...'}
        multiline
        ref={input => this._input = input}
        numberOfLines={8}
        value={this.props.textData}
        onChangeText={text => this.props.onChangeText(text)}
      />
    );
  }
}

const TWITTER_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABvFBMVEUAAAAA//8AnuwAnOsAneoAm+oAm+oAm+oAm+oAm+kAnuwAmf8An+0AqtUAku0AnesAm+oAm+oAnesAqv8An+oAnuoAneoAnOkAmOoAm+oAm+oAn98AnOoAm+oAm+oAmuoAm+oAmekAnOsAm+sAmeYAnusAm+oAnOoAme0AnOoAnesAp+0Av/8Am+oAm+sAmuoAn+oAm+oAnOoAgP8Am+sAm+oAmuoAm+oAmusAmucAnOwAm+oAmusAm+oAm+oAm+kAmusAougAnOsAmukAn+wAm+sAnesAmeoAnekAmewAm+oAnOkAl+cAm+oAm+oAmukAn+sAmukAn+0Am+oAmOoAmesAm+oAm+oAm+kAme4AmesAm+oAjuMAmusAmuwAm+kAm+oAmuoAsesAm+0Am+oAneoAm+wAmusAm+oAm+oAm+gAnewAm+oAle0Am+oAm+oAmeYAmeoAmukAoOcAmuoAm+oAm+wAmuoAneoAnOkAgP8Am+oAm+oAn+8An+wAmusAnuwAs+YAmegAm+oAm+oAm+oAmuwAm+oAm+kAnesAmuoAmukAm+sAnukAnusAm+oAmuoAnOsAmukAqv9m+G5fAAAAlHRSTlMAAUSj3/v625IuNwVVBg6Z//J1Axhft5ol9ZEIrP7P8eIjZJcKdOU+RoO0HQTjtblK3VUCM/dg/a8rXesm9vSkTAtnaJ/gom5GKGNdINz4U1hRRdc+gPDm+R5L0wnQnUXzVg04uoVSW6HuIZGFHd7WFDxHK7P8eIbFsQRhrhBQtJAKN0prnKLvjBowjn8igenQfkQGdD8A7wAAAXRJREFUSMdjYBgFo2AUDCXAyMTMwsrGzsEJ5nBx41HKw4smwMfPKgAGgkLCIqJi4nj0SkhKoRotLSMAA7Jy8gIKing0KwkIKKsgC6gKIAM1dREN3Jo1gSq0tBF8HV1kvax6+moG+DULGBoZw/gmAqjA1Ay/s4HA3MISyrdC1WtthC9ebGwhquzsHRxBfCdUzc74Y9UFrtDVzd3D0wtVszd+zT6+KKr9UDX749UbEBgULIAbhODVHCoQFo5bb0QkXs1RAvhAtDFezTGx+DTHEchD8Ql4NCcSyoGJYTj1siQRzL/JKeY4NKcSzvxp6RmSWPVmZhHWnI3L1TlEFDu5edj15hcQU2gVqmHTa1pEXJFXXFKKqbmM2ALTuLC8Ak1vZRXRxa1xtS6q3ppaYrXG1NWjai1taCRCG6dJU3NLqy+ak10DGImx07LNFCOk2js6iXVyVzcLai7s6SWlbnIs6rOIbi8ViOifIDNx0uTRynoUjIIRAgALIFStaR5YjgAAAABJRU5ErkJggg==";
const FACEBOOK_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAAAQIAAWpwAX5kAX5gAX5gAX5gAXJwAXpgAWZ8AX5gAXaIAX5gAXpkAVaoAX5gAXJsAX5gAX5gAYJkAYJkAXpoAX5gAX5gAX5kAXpcAX5kAX5gAX5gAX5YAXpoAYJijtTrqAAAAIHRSTlMABFis4vv/JL0o4QvSegbnQPx8UHWwj4OUgo7Px061qCrcMv8AAAB0SURBVEjH7dK3DoAwDEVRqum9BwL//5dIscQEEjFiCPhubziTbVkc98dsx/V8UGnbIIQjXRvFQMZJCnScAR3nxQNcIqrqRqWHW8Qd6cY94oGER8STMVioZsQLLnEXw1mMr5OqFdGGS378wxgzZvwO5jiz2wFnjxABOufdfQAAAABJRU5ErkJggg==";
const WHATSAPP_ICON = "data:image/png;base64,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";

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
