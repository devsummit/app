import React, { Component } from 'react';
import {
  Text,
  Grid,
  Col,
  Right,
  Button
} from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import ListItem from '../ListItem'
import { PRIMARYCOLOR } from '../../constants';

export default class OrderItem extends Component {


  onEditPressed() {
    Actions.orderDetail({ orderId: this.props.order.id });
  }

  onCheckOut() {

  }

  formatDate = (source) => {
    const dt = source.split(' ');
    return `${dt[1]}-${dt[2]}-${dt[3]}`;
  }
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

  render() {
    console.log("ORDEEEEEEEEEER", this.props)
    return (
      <ListItem
        style={styles.item}
        button
        onPress={this.props.onPress}
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Grid style={{ flex: 9 }}>
            <Col style={styles.left}>
              <Text style={styles.orderId}>Order-{this.props.order.id}</Text>
              <Text note style={styles.orderId}>{this.formatDate(this.props.order.created_at)}</Text>
            </Col>
            <Col style={styles.center}>
              <Text>{Intl.NumberFormat('id').format(this.props.order.amount)}</Text>
              <Text
                note
                style={{ color: this.statusColor(this.props.order.status) }}
              >
                {this.props.order.status}
              </Text>
            </Col>
          </Grid>
          <Right style={{ flex: 1, flexDirection: 'row', alignContent: 'space-between' }}>
            <TouchableOpacity onPress={() => this.onEditPressed()}>
              <Icon
                name="md-create"
                style={styles.icon}
                color={PRIMARYCOLOR}
              />
            </TouchableOpacity>
          </Right>
        </View>
        <Button style={styles.btnCheckOut}>
          <Icon name="md-checkmark-circle-outline" color="white" style={styles.icon} />
          <Text style={styles.buttonText}>CHECK OUT</Text>
        </Button>
      </ListItem >
    );
  }
}
