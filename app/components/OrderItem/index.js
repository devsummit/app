import React, { Component } from 'react';
import {
  Text,
  Grid,
  Col,
  Right
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import ListItem from '../ListItem'

export default class OrderItem extends Component {
  statusColor = (status) => {
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

  formatDate = (source) => {
    const dt = source.split(' ');
    return `${dt[1]}-${dt[2]}-${dt[3]}`;
  }

  render() {
    return (
      <ListItem
        style={styles.item}
        button
        onPress={this.props.onPress}
      >
        <Grid style={{ flex: 9 }}>
          <Col style={styles.left}>
            <Text style={styles.orderId}>Order-{this.props.order.id}</Text>
            <Text note style={styles.orderId}>{this.formatDate(this.props.order.created_at)}</Text>
          </Col>
          <Col style={styles.center}>
            <Text>{ Intl.NumberFormat('id').format(this.props.order.amount) }</Text>
            <Text
              note
              style={{ color: this.statusColor(this.props.order.status) }}
            >
              {this.props.order.status}
            </Text>
          </Col>
        </Grid>
        <Right style={{ flex: 1 }}>
          <Icon name="chevron-right" style={styles.icon} />
        </Right>
      </ListItem>
    );
  }
}
