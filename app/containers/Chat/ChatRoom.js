import React from 'react';
import {
  Container,
  Content
} from 'native-base';
import { ChatRenderer } from './ChatRenderer';

const ChatRoom = ({ qiscus, message, room, initApp }) => {
  return (
    <Container>
      <Content>
        <ChatRenderer
          qiscus={qiscus}
          message={message}
          room={room}
          initApp={initApp}
        />
      </Content>
    </Container>
  );
};

export default ChatRoom;
