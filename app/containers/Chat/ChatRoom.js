import React from 'react';
import {
  Container,
  Content,
  Text
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from '../../components/Header';
import { ChatRenderer } from '../../../libraries/react-native-qiscus-sdk/QiscusSDK/lib';

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
  // return (
  //   <Container>
  //     <Content>
  //       <Header title="Chat" />
  //       <Content>
  //         <ChatRenderer
  //           qiscus={qiscus}
  //           message={newMessage}
  //           room={selectedRoom}
  //           initApp={initApp}
  //         />
  //       </Content>
  //     </Content>
  //   </Container>
  // );
};

export default ChatRoom;