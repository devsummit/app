import 'intl';
import 'intl/locale-data/jsonp/id';
import React, { Component } from 'react';
import {
  Text,
  Grid,
  Col,
  Button
} from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import ListItem from '../ListItem';
import { PRIMARYCOLOR } from '../../constants';
import { formatDate, transactionStatus } from '../../helpers';

export default class OrderItem extends Component {
  state = {
    status: '',
    color: ''
  }

  componentWillMount() {
    let stat = '';
    const { payment } = this.props.order;
    stat = transactionStatus(payment);
    this.setState({
      status: stat.message,
      color: stat.color
    });
  }

  componentWillReceiveProps(nextProps) {
    let stat = '';
    const { payment } = this.props.order;
    stat = transactionStatus(payment);
    this.setState({
      status: stat.message,
      color: stat.color
    });
  }


  onEditPressed() {
    Actions.orderDetail({ orderId: this.props.order.id });
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
    const { status, color } = this.state;
    const { order } = this.props;

    return (
      <ListItem
        style={styles.item}
        button
        onPress={this.props.onPress}
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Grid style={{ flex: 1 }}>
            <Col style={styles.left}>
              <Text style={styles.orderId}>Order-{order.id}</Text>
              <Text
                note
                style={styles.orderId}
              >
                {formatDate(order.created_at)}
              </Text>
            </Col>
            <Col style={styles.right}>
              <Text style={styles.text}>{Intl.NumberFormat('id').format(order.amount)}</Text>
              {status ?
                <Text
                  note
                  style={[styles.text, {
                    color,
                    fontWeight: 'bold'
                  }]}
                >
                  {status.toUpperCase()}
                </Text> : <View />
              }
            </Col>
          </Grid>
        </View>
        {(status && status === 'not paid') ?
          <Button onPress={() => Actions.payment({ order })} style={[styles.btnCheckOut, { backgroundColor: color }]}>
            <TouchableOpacity onPress={() => this.onEditPressed()} >
              <Icon
                name="md-create"
                style={styles.icon}
                color="white"
              />
            </TouchableOpacity>
            <Icon name="md-cart" color="white" style={styles.icon} />
            <Text style={styles.buttonText}>CHECK OUT</Text>
          </Button> : <View />
        }
        {(status && status === 'need authorization') ?
          <Button onPress={() => Actions.payment()} style={[styles.btnCheckOut, { backgroundColor: color }]}>
            <Icon name="ios-key" color="white" style={styles.icon} />
            <Text style={styles.buttonText}>AUTHORIZE</Text>
          </Button> : <View />
        }
        {(status && status === 'pending') ?
          <Button onPress={() => Actions.payment()} style={[styles.btnCheckOut, { backgroundColor: 'green' }]}>
            <Icon name="md-checkmark-circle-outline" color="white" style={styles.icon} />
            <Text style={styles.buttonText}>CONFIRM</Text>
          </Button> : <View />
        }
      </ListItem>
    );
  }
}
