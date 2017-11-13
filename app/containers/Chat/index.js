import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
} from 'react-native';
import {
  Container,
  Content,
  Body,
  Text,
  List,
  ListItem,
  Left,
  Thumbnail,
  Right,
  Spinner
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import Header from '../../components/Header';
import { InitApp } from '../../../libraries/react-native-qiscus-sdk/QiscusSDK/lib';
import { QISCUS_SDK_APP_ID, QISCUS_DEFAULT_ROOMS_ID } from '../../constants';
import { getProfileData, addRoomParticipant } from '../../helpers';

import strings from '../../localization';
import * as actions from './actions';
import * as selectors from './selectors';

import styles from './style';
// import default from '../../../../../../Library/Caches/typescript/2.6/node_modules/@types/lodash-es/add';
// import default from '../../../native-base-theme/components/TabHeading';

class Chat extends Component {
  async componentWillMount() {
    // const userAuth = {
    //   email: 'fikri@qiscus.com',
    //   password: 'password',
    //   displayName: 'fikri',
    //   avatar: null,
    //   appID: 'sdksample'
    // };
    const userData = await getProfileData();
    const { email, username, photos } = userData;
    const userAuth = {
      email,
      password: email,
      displayName: username,
      avatar: photos[0].url,
      appID: QISCUS_SDK_APP_ID
    };

    const {
      updateQiscus,
      updateNewMessage,
      updateRooms,
      isDelivered,
      isChatRoomCreated,
      isGroupRoomCreated,
      isCommentRead,
      isLoginError,
      isPresence,
      isTyping
    } = this.props;
    
    const setRooms = (data) => updateRooms(data);
    const initApp = (data) => updateQiscus(data);
    const receiveNewMessage = (data) => updateNewMessage(data);
    const commentDeliveredCallback = (data) => isDelivered(data);
    const chatRoomCreatedCallback = (data) => isChatRoomCreated(data);
    const groupRoomCreatedCallback = (data) => isGroupRoomCreated(data);
    const commentReadCallback = (data) => isCommentRead(data);
    const loginErrorCallback = (data) => isLoginError(data);
    const presenceCallback = (data) => isPresence(data);
    const typingCallback = (data) => isTyping(data);

    const callbackOptions = {
      commentDeliveredCallback,
      chatRoomCreatedCallback,
      groupRoomCreatedCallback,
      commentReadCallback,
      loginErrorCallback,
      presenceCallback,
      typingCallback
    };

    // Init the Qiscus
    InitApp({ initApp, receiveNewMessage, setRooms, userAuth, callbackOptions });

    // Add user to default rooms
    const defaultRooms = QISCUS_DEFAULT_ROOMS_ID;
    defaultRooms.forEach((room) => addRoomParticipant([ email ], room));
  }
  _chatTarget(room) {
    this.props.updateSelectedRoom(room);
  }
  _openChat(room) {
    this._chatTarget(room);
  }
  _createNewGroup() {
    let { qiscus, groupRoomCreated } = this.props;

    qiscus.createGroupRoom('Group RN 9', [ 'guest@qiscus.com', 'fikri@qiscus.com' ]).then(() => {
      this._openChat({ name: groupRoomCreated.name, id: groupRoomCreated.id });
    });
  }
  _renderThreadList(rooms) {
    return (
      <Container>
        <Content>
          <Header title={strings.chat.title} />
          <Content>
            <List>
              <ListItem itemDivider>
                <Text>Pinned</Text>
              </ListItem>
              { rooms.map((room, idk) => {
                const id = room.id;
                const name = room.room_name;
                const avatarUrl = room.avatar_url ? room.avatar_url : 'http://opyke.gr/wp-content/uploads/2016/01/forum-icon.png';
                if (QISCUS_DEFAULT_ROOMS_ID.includes(id.toString())) {
                  return (
                    <ListItem avatar key={idk} onPress={() => this._openChat({ name, id })}>
                      <Left>
                        <Thumbnail source={{ uri: avatarUrl }} />
                      </Left>
                      <Body>
                        <Text>{ name }</Text>
                        <Text note>Doing what you like will always keep you happy . .</Text>
                      </Body>
                      <Right>
                        <Icon name="angle-right" style={styles.icon} />
                      </Right>
                    </ListItem>
                  );
                }
              })}
              <ListItem itemDivider>
                <Text>Other Thread</Text>
              </ListItem>
              { rooms.map((room, idk) => {
                const id = room.id;
                const name = room.room_name;
                const avatarUrl = room.avatar_url ? room.avatar_url : 'http://opyke.gr/wp-content/uploads/2016/01/forum-icon.png';
                if (!QISCUS_DEFAULT_ROOMS_ID.includes(id.toString())) {
                  return (
                    <ListItem avatar key={idk} onPress={() => this._openChat({ name, id })}>
                      <Left>
                        <Thumbnail source={{ uri: avatarUrl }} />
                      </Left>
                      <Body>
                        <Text>{ name }</Text>
                        <Text note>Doing what you like will always keep you happy . .</Text>
                      </Body>
                      <Right>
                        <Icon name="angle-right" style={styles.icon} />
                      </Right>
                    </ListItem>
                  );
                }
              })}
            </List>
          </Content>
        </Content>
      </Container>
    );
  }
  render() {
    const { rooms, selectedRoom, qiscus, newMessage, updateQiscus } = this.props;
    const initApp = (data) => updateQiscus(data);
    if (!rooms) {
      return (
        <Container>
          <Content>
            <Spinner />
          </Content>
        </Container>
      );
    }
    if (selectedRoom) {
      Actions.chatRoom({
        qiscus,
        initApp,
        message: newMessage,
        room: selectedRoom
      });
    }
    return this._renderThreadList(rooms);
  }
}

const mapStateToProps = createStructuredSelector({
  qiscus: selectors.getQiscus(),
  newMessage: selectors.getNewMessage(),
  rooms: selectors.getRooms(),
  selectedRoom: selectors.getSelectedRoom(),
  delivered: selectors.getDelivered(),
  chatRoomCreated: selectors.getChatRoomCreated(),
  groupRoomCreated: selectors.getGroupRoomCreated(),
  commentRead: selectors.getCommentRead(),
  loginError: selectors.getLoginError(),
  presence: selectors.getPresence(),
  typing: selectors.getTyping()
});

export default connect(mapStateToProps, actions)(Chat);
