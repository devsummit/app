import 'intl';
import 'intl/locale-data/jsonp/en';
import React from 'react';
import {
  Text,
  Card,
  CardItem,
  Body,
  Badge,
  View,
  Left
} from 'native-base';
import styles from './styles';

export default (props) => {
  const ticket = props.ticket;
  return (
    <Card key={ticket.id}>
      <CardItem>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View flex={1}>
            <Text note>{ticket.information}</Text>
          </View>
          <View>
            <Badge success>
              <Text>Badge : {props.count}</Text>
            </Badge>
          </View>
        </View>
      </CardItem>
    </Card>
  );
};
