import React, { Component } from 'react';
import {View, Image} from 'react-native';
import autobind from 'class-autobind';
import moment from 'moment';
import styles from "./style";
import {
  Body,
  Card,
  Text,
  CardItem
} from "native-base";
// import default from '../../../../../../Library/Caches/typescript/2.6/node_modules/@types/lodash-es/snakeCase';

function renderMessage(isFile, message, username, timestamp) {
  const renderTime = Number(moment().diff(timestamp, 'hours')) >= 12 ? timestamp.calendar() : timestamp.fromNow();
  if (isFile) {
    const uri = message.split('[file] ')[1].split(' [/file]')[0];
    return (
      <View>
        <Text note>{username}</Text>
        <Image
          style={{ width: 200, height: 120 }}
          source={{ uri }}
        />
      </View>
    );
  }
  return (
    <View>
      <Text note>{username}</Text>
      <Text>
        {message}
      </Text>
      <Text note style={{ textAlign: 'right', fontSize: 10 }}>
        {renderTime}
      </Text>
    </View>
  );
}

export function ChatComponent(qiscus) {
  const comments = qiscus.selected.comments;
  const user = qiscus.userData;
  return (
    comments.map((data) => {
      const isFile = data.message.substring(0, 6) === '[file]' ? true : false;
      moment.locale('en');
      const timestamp = moment(`${data.date} ${data.time}`, 'YYYY-MM-DD hh:mm a');
      if (user.username === data.username_as) {
        return (
          <View style={styles.cardContainerRight} key={data.id}>
            <Card style={styles.cardRight}>
              <CardItem style={styles.cardRightContent}>
                <Body>
                  {renderMessage(isFile, data.message, data.username_as, timestamp)}
                </Body>
              </CardItem>
            </Card>
            <View style={styles.arrowRight} />
          </View>
        );
      }
      return (
        <View style={styles.cardContainerLeft} key={data.id}>
          <View style={styles.arrowLeft} />
          <View style={styles.arrowLeftTop} />
          <Card style={styles.cardLeft}>
            <CardItem style={styles.cardLeftContent}>
              <Body>
                {renderMessage(isFile, data.message, data.username_as, timestamp)}
              </Body>
            </CardItem>
          </Card>
        </View>
      );
    })
  );
}

export default ChatComponent;
