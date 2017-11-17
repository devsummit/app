import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  View
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
  Spinner,
  Fab,
  Button,
  Form,
  Input,
  Item
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

import Header from '../../components/Header';
import ModalDialog from '../../components/ModalDialog';
import { InitApp } from './qiscus';
import { QISCUS_SDK_APP_ID, QISCUS_DEFAULT_ROOMS_ID, QISCUS_MODERATOR_EMAIL } from '../../constants';
import { getProfileData, addRoomParticipant, getModeratorRoomList, getRoomWithTarget } from '../../helpers';

import strings from '../../localization';
import * as actions from './actions';
import * as selectors from './selectors';

import styles from './style';

const ModalCreateNewRoom = () => {
  return (
    <View style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: '#333', zIndex: 9999, opacity: 0.8, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ backgroundColor: '#eee', height: '40%', width: '80%' }} >
        <View style={{ flex: 1, backgroundColor: '#333'}}>
          <Text style={{ fontSize: 24, color: 'white' }}>Create New Room</Text>
          <Icon name="times" size={24} color="white" style={{ position: 'absolute', right: 0, backgroundColor: '#f39e21', borderRadius: 24, padding: 4 }} />
        </View>
        <View style={{ flex: 3, backgroundColor: 'white' }}>
          <Text>Here the form</Text>
        </View>
      </View>
    </View>
  );
};

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      fabActive: false,
      modalActive: false,
      modalPrivateActive: false,
      newThreadTitle: '',
      newEmailPrivate: ''
    };
  }

  componentWillMount() {
    this.initQiscus();
  }

  onChangeThreadTitle = (newThreadTitle) => {
    this.setState({ newThreadTitle });
  }

  onChangeEmailPrivate = (newEmailPrivate) => {
    this.setState({ newEmailPrivate });
  }

  onCreateNewThread = async () => {
    const userData = await getProfileData();
    const { email } = userData;
    const { state: { newThreadTitle: title }, props: { qiscus } } = this;
    await qiscus.createGroupRoom(title, [ email, QISCUS_MODERATOR_EMAIL ]);
    const newGroup = await this.props.groupRoomCreated;
    this._openChat({ name: newGroup.name, id: newGroup.id });
    this.setState({ newThreadTitle: '' });
  }

  onCreateNewPrivateChat = async () => {
    const userData = await getProfileData();
    const { email } = userData;
    const { state: { newEmailPrivate } } = this;
    const createPrivateChat = await getRoomWithTarget(email, newEmailPrivate);
    const { id, room_name } = await createPrivateChat;
    this.setState({ newEmailPrivate: '' });
    this._openChat({
      name: room_name,
      id: id.toString()
    });
  }

  initQiscus = async () => {
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
    const moderatorRooms = await getModeratorRoomList();
    [ ...defaultRooms, ...moderatorRooms ].forEach((room) => addRoomParticipant([ email ], room));
  }
  _chatTarget(room) {
    this.props.updateSelectedRoom(room);
    const { qiscus, newMessage, selectedRoom, updateQiscus } = this.props;
    if (selectedRoom) {
      const initApp = (data) => updateQiscus(data);
      Actions.chatRoom({
        qiscus,
        initApp,
        message: newMessage,
        room: selectedRoom,
        title: room.name
      });
    }
  }
  _openChat(room) {
    this._chatTarget(room);
  }

  _renderThreadList(rooms) {
    const privateRooms = rooms.filter(room => room.chat_type === 'single');
    const othersRoom = rooms.filter(room => !QISCUS_DEFAULT_ROOMS_ID.includes(room.id.toString()) && room.chat_type !== 'single');
    return (
      <Container>
        <ModalDialog
          title={"Create New Thread"}
          icon="users"
          visible={this.state.modalActive}
          confirmTitle={'Create'}
          disabled={this.state.newThreadTitle}
          handleClose={() => this.setState({ modalActive: false })}
          handleConfirm={() => this.onCreateNewThread()}
        >
          <Form>
            <Item>
              <Input
                placeholder={'Enter Thread name'}
                placeholderTextColor={'#BDBDBD'}
                onChangeText={title => this.onChangeThreadTitle(title)}
              />
            </Item>
          </Form>
        </ModalDialog>
        <ModalDialog
          title={'Create Private Chat'}
          icon="user"
          visible={this.state.modalPrivateActive}
          confirmTitle={'Create'}
          disabled={this.state.newEmailPrivate}
          handleClose={() => this.setState({ modalPrivateActive: false })}
          handleConfirm={() => this.onCreateNewPrivateChat()}
        >
          <Form>
            <Item>
              <Input
                placeholder={'To: Email <someone@mail.com>'}
                placeholderTextColor={'#BDBDBD'}
                onChangeText={email => this.onChangeEmailPrivate(email)}
              />
            </Item>
          </Form>
        </ModalDialog>
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
                const lastComment = room.last_comment;
                const subtitle = `Last convertation by ${lastComment.username}`;
                if (QISCUS_DEFAULT_ROOMS_ID.includes(id.toString())) {
                  return (
                    <ListItem avatar key={idk} onPress={() => this._openChat({ name, id })}>
                      <Left>
                        <Thumbnail source={{ uri: avatarUrl }} />
                      </Left>
                      <Body>
                        <Text>{ name }</Text>
                        <Text note>{subtitle ? subtitle : ''}</Text>
                      </Body>
                      <Right>
                        <Icon name="angle-right" style={styles.icon} />
                      </Right>
                    </ListItem>
                  );
                }
              })}
              { QISCUS_DEFAULT_ROOMS_ID.length <= 0 && (
                <ListItem>
                  <Body>
                    <Text>No Pinned Thread</Text>
                  </Body>
                </ListItem>
              )}
              <ListItem itemDivider>
                <Text>Private Message</Text>
              </ListItem>
              { rooms.map((room, idk) => {
                const id = room.id;
                const name = room.room_name;
                const avatarUrl = room.avatar_url ? room.avatar_url : 'http://opyke.gr/wp-content/uploads/2016/01/forum-icon.png';
                const lastComment = room.last_comment;
                const subtitle = `Last convertation by ${lastComment.username}`;
                if (room.chat_type === 'single') {
                  return (
                    <ListItem avatar key={idk} onPress={() => this._openChat({ name, id })}>
                      <Left>
                        <Thumbnail source={{ uri: avatarUrl }} />
                      </Left>
                      <Body>
                        <Text>{ name }</Text>
                        <Text note>{subtitle ? subtitle : ''}</Text>
                      </Body>
                      <Right>
                        <Icon name="angle-right" style={styles.icon} />
                      </Right>
                    </ListItem>
                  );
                }
              })}
              { privateRooms.length <= 0 && (
                <ListItem>
                  <Body>
                    <Text>No Private Message</Text>
                  </Body>
                </ListItem>
              )}
              <ListItem itemDivider>
                <Text />
              </ListItem>
              { rooms.map((room, idk) => {
                const id = room.id;
                const name = room.room_name;
                const avatarUrl = room.avatar_url ? room.avatar_url : 'http://opyke.gr/wp-content/uploads/2016/01/forum-icon.png';
                const lastComment = room.last_comment;
                const subtitle = `Last convertation by ${lastComment.username}`;
                if (!QISCUS_DEFAULT_ROOMS_ID.includes(id.toString()) && room.chat_type !== 'single') {
                  return (
                    <ListItem avatar key={idk} onPress={() => this._openChat({ name, id })}>
                      <Left>
                        <Thumbnail source={{ uri: avatarUrl }} />
                      </Left>
                      <Body>
                        <Text>{ name }</Text>
                        <Text note>{subtitle ? subtitle : ''}</Text>
                      </Body>
                      <Right>
                        <Icon name="angle-right" style={styles.icon} />
                      </Right>
                    </ListItem>
                  );
                }
              })}
              { othersRoom.length <= 0 && (
                <ListItem>
                  <Body>
                    <Text>No Group Chat</Text>
                  </Body>
                </ListItem>
              )}
            </List>
          </Content>
        </Content>
        <Fab
          direction="up"
          style={{ backgroundColor: '#f39e21' }}
          active={this.state.fabActive}
          onPress={() => this.setState({ fabActive: !this.state.fabActive })}
        >
          <Icon name="plus" />
          <Button style={{ backgroundColor: '#689F38' }} onPress={() => this.setState({ modalActive: true, fabActive: false })} >
            <Icon name="users" color="white" size={16} />
          </Button>
          <Button style={{ backgroundColor: '#689F38' }} onPress={() => this.setState({ modalPrivateActive: true, fabActive: false })} >
            <Icon name="user" color="white" size={16} />
          </Button>
        </Fab>
      </Container>
    );
  }
  render() {
    const { rooms, selectedRoom, qiscus, newMessage, updateQiscus } = this.props;
    if (!rooms) {
      return (
        <Container>
          <Content>
            <Spinner />
          </Content>
        </Container>
      );
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
