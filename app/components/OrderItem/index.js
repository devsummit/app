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
import ListItem from '../ListItem';
import { PRIMARYCOLOR } from '../../constants';

export default class OrderItem extends Component {
  state = {
    status: ''
  }

  componentWillMount() {
    let stat = '';
    const { payment } = this.props.order;
    if (payment) {
      if (payment.fraud_status === 'accept' && payment.transaction_status === 'capture') {
        stat = 'PAID';
      } else if (payment.fraud_status === 'accept' && payment.transaction_status === 'authorize') {
        stat = 'NEED AUTHORIZATION';
      } else if (payment.transaction_status === 'pending') {
        stat = 'PENDING';
      }
    } else {
      stat = 'NOT PAID';
    }
    this.setState({
      status: stat
    });
  }

  onEditPressed() {
    Actions.orderDetail({ orderId: this.props.order.id });
  }

  // onCheckOut() {

  // }

  formatDate = (source) => {
    const dt = source.split(' ');
    return `${dt[1]}-${dt[2]}-${dt[3]}`;
  }
  // confirm green
  // auth blue
  statusColor = (status) => {
    const stat = status.toLowerCase();
    let color;
    if (stat === 'pending') {
      color = 'red';
    } else if (stat === 'paid') {
      color = 'green';
    } else if (stat === 'need authorization') {
      color = 'blue';
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
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Grid style={{ flex: 9 }}>
            <Col style={styles.left}>
              <Text style={styles.orderId}>Order-{this.props.order.id}</Text>
              <Text
                note
                style={styles.orderId}
              >
                {this.formatDate(this.props.order.created_at)}
              </Text>
            </Col>
            <Col style={styles.center}>
              <Text>{Intl.NumberFormat('id').format(this.props.order.amount)}</Text>
              {this.state.status ?
                <Text
                  note
                  style={{
                    color: this.statusColor(this.state.status),
                    fontWeight: 'bold'
                  }}
                >
                  {this.state.status}
                </Text> : <View />
              }
            </Col>
          </Grid>
          {this.state.status && this.state.status === 'NOT PAID' ?
            <Right style={{ flex: 1, flexDirection: 'row', alignContent: 'space-between' }}>
              <TouchableOpacity onPress={() => this.onEditPressed()}>
                <Icon
                  name="md-create"
                  style={styles.icon}
                  color={PRIMARYCOLOR}
                />
              </TouchableOpacity>
            </Right> : <View />}

        </View>
        {(this.state.status && this.state.status === 'NOT PAID') ?
          <Button onPress={() => Actions.payment()} style={[ styles.btnCheckOut, { backgroundColor: PRIMARYCOLOR } ]}>
            <Icon name="md-cart" color="white" style={styles.icon} />
            <Text style={styles.buttonText}>CHECK OUT</Text>
          </Button> : <View />
        }
        {(this.state.status && this.state.status === 'NEED AUTHORIZATION') ?
          <Button onPress={() => Actions.payment()} style={[ styles.btnCheckOut, { backgroundColor: 'blue' } ]}>
            <Icon name="ios-key" color="white" style={styles.icon} />
            <Text style={styles.buttonText}>AUTHORIZE</Text>
          </Button> : <View />
        }
        {(this.state.status && this.state.status === 'PENDING') ?
          <Button onPress={() => Actions.payment()} style={[ styles.btnCheckOut, { backgroundColor: 'green' } ]}>
            <Icon name="md-checkmark-circle-outline" color="white" style={styles.icon} />
            <Text style={styles.buttonText}>CONFIRM</Text>
          </Button> : <View />
        }
      </ListItem>
    );
  }
}
