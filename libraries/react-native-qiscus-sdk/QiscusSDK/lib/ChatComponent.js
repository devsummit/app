import React, { Component } from 'react';
import {View, Image} from 'react-native';
import autobind from 'class-autobind';
import styles from "./styles";
import {
  Body,
  Card,
  Text,
  CardItem,
} from "native-base";

function renderMessage(isFile: boolean, message: string) {
  if (isFile) {
    let uri = message.split("[file] ")[1].split(" [/file]")[0];
    return (
      <Image
        style={{width: 200, height: 120}}
        source={{uri: uri}}
      />
    );
  } else {
    return (
      <Text>
        {message}
      </Text>
    );
  }
}

export function ChatComponent(qiscus: Object) {
  const comments = qiscus.selected.comments;
  const user = qiscus.userData;
  return (
    comments.map((data) => {
      let isFile = data.message.substring(0, 6) === '[file]' ? true : false;
      if (user.username === data.username_as) {
        return (
          <View style={styles.cardContainerRight} key={data.id}>
            <Card style={styles.cardRight}>
              <CardItem style={styles.cardRightContent}>
                <Body>
                  {renderMessage(isFile, data.message)}
                </Body>
              </CardItem>
            </Card>
            <View style={styles.arrowRight}></View>
          </View>
        );
      } else {
        return (
          <View style={styles.cardContainerLeft} key={data.id}>
            <View style={styles.arrowLeft}></View>
            <View style={styles.arrowLeftTop}></View>
            <Card style={styles.cardLeft}>
              <CardItem style={styles.cardLeftContent}>
                <Body>
                  {renderMessage(isFile, data.message)}
                </Body>
              </CardItem>
            </Card>
          </View>
        );
      }
    })
  );
}
