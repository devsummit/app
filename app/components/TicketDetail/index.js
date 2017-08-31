import 'intl';
import 'intl/locale-data/jsonp/en';
import React, { Component } from 'react';
import {
  Text,
  Card,
  CardItem,
  Body
} from 'native-base';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default (props) => {
  const ticket = props.ticket;
  return (
    <Card key={ticket.id}>
      <CardItem>
        <Body style={styles.summary}>
          <Text>{ticket.ticket_type}</Text>
          <Text note style={{ color: 'green' }}>
            Rp {Intl.NumberFormat('id').format(ticket.price)}
          </Text>
          <Text note>{ticket.information}</Text>
        </Body>
        <Text style={styles.ticketCount}> Amount : {props.count}</Text>
      </CardItem>
    </Card>
  );
};
