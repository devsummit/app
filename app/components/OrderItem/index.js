import React from 'react';
import {
  ListItem,
  Text,
  Grid,
  Col,
  Right
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const statusColor = (status) => {
  let color;
  if (status === 'pending') {
    color = 'red';
  } else if (status === 'paid') {
    color = 'green';
  } else {
    color = '#777';
  }

  return color;
};

const OrderItem = (props) => {
  return (
    <ListItem style={styles.item}>
      <Grid style={{ flex: 9 }}>
        <Col style={styles.left}>
          <Text style={styles.orderId}>Order-{props.order.id}</Text>
          <Text note style={styles.orderId}>{props.order.date}</Text>
        </Col>
        <Col style={styles.center}>
          <Text>{props.order.totalPrice}</Text>
          <Text
            note
            style={{ color: statusColor(props.order.status) }}
          >
            {props.order.status}
          </Text>
        </Col>
      </Grid>
      <Right style={{ flex: 1 }}>
        <Icon name="chevron-right" style={styles.icon} onPress={() => { console.log('press'); }} />
      </Right>
    </ListItem>
  );
};

export default OrderItem;
