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
  Right
} from 'native-base';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/FontAwesome';

import strings from '../../localization';
import * as actions from './actions';
import * as selectors from './selectors';

class Chat extends Component {
  componentWillMount() {
    return '';
  }
  render() {
    return (
      <Container>
        <Content>
          <Header title={strings.chat.title} />
          <Content>
            <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={{ uri: 'http://opyke.gr/wp-content/uploads/2016/01/forum-icon.png' }} />
                </Left>
                <Body>
                  <Text>Kumar Pratik</Text>
                  <Text note>Doing what you like will always keep you happy . .</Text>
                </Body>
                <Right>
                  <Icon name="angle-right"/>
                </Right>
              </ListItem>
            </List>
          </Content>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  qiscus: selectors.getQiscus,
  newMessage: selectors.getNewMessage,
  rooms: selectors.getRooms,
  selectedRoom: selectors.getSelectedRoom,
  isDelivered: selectors.getDelivered,
  isChatRoomCreated: selectors.getChatRoomCreated,
  isGroupRoomCreated: selectors.getGroupRoomCreated,
  isCommentRead: selectors.getCommentRead,
  isLoginError: selectors.getLoginError,
  isPresence: selectors.getPresence,
  isTyping: selectors.getTyping
});

export default connect(mapStateToProps, actions)(Chat);
