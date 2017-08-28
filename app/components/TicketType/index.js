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
  console.log("TICKET", props.ticket)
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
        <View style={styles.btnGroup}>
          <Text style={styles.plusMinus} onPress={() => props.onReduce(ticket.id)}>
            <Icon name="minus" />
          </Text>
          <Text style={styles.ticketCount}>{props.count}</Text>
          <Text style={styles.plusMinus} onPress={() => props.onAdd(ticket.id)}>
            <Icon name="plus" />
          </Text>
        </View>
      </CardItem>
    </Card>
  );
}
