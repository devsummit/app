import 'intl';
import 'intl/locale-data/jsonp/id';
import React, { Component } from 'react';
import { Text, Grid, Col, Button, Card, CardItem } from 'native-base';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import ListItem from '../ListItem';
import { formatDate, transactionStatus } from '../../helpers';
// import { PRIMARYCOLOR } from '../../constants';
let amount = 0;
export default class OrderItem extends Component {
  state = {
    status: '',
    color: ''
  };

  componentWillMount() {
    let stat = '';
    const { payment } = this.props.order;
    stat = transactionStatus(payment);
    this.setState({
      status: stat.message,
      color: stat.color
    });
    const { order } = this.props;
    amount =
      order.referal && order.referal.discount_amount
        ? order.amount - order.amount * order.referal.discount_amount
        : order.amount;
  }

  componentWillReceiveProps(nextProps) {
    let stat = '';
    const { payment } = this.props.order;
    stat = transactionStatus(payment);
    this.setState({
      status: stat.message,
      color: stat.color
    });
    const { order } = this.props;
    amount =
      order.referal && order.referal.discount_amount
        ? order.amount - order.amount * order.referal.discount_amount
        : order.amount;
  }

  onEditPressed() {
    Actions.orderDetail({ orderId: this.props.order.id });
  }

  handleConfirmPayment = () => {
    this.props.confirmPayment(this.props.order);
  };

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
  };

  render() {
    const { status, color } = this.state;
    const { order } = this.props;
    return (
      <CardItem style={styles.container} button onPress={() => this.onEditPressed()}>
        <View style={styles.item}>
          <View style={{ justifyContent: 'flex-start', flex: 4 }}>
            <Text>Order-{order.id}</Text>
            <Text note style={styles.orderId}>
              {formatDate(order.created_at)}
            </Text>
            <View style={styles.viewText}>
              {status ? (
                <Text note style={[ styles.statusText, { backgroundColor: color } ]}>
                  {status.toUpperCase()}
                </Text>
              ) : (
                <View />
              )}
            </View>
          </View>
          <View style={styles.buttonSection}>
            {/* { !(status && status === 'paid') ?
              <TouchableOpacity onPress={() => this.onEditPressed()} >
                <Icon
                  name="md-create"
                  style={styles.icon}
                />
              </TouchableOpacity> : <View />
            } */}
            {status && status === 'not paid' ? (
              <View>
                <TouchableOpacity onPress={() => this.onEditPressed()}>
                  <Icon name="md-create" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => Actions.payment({ order })}
                  style={styles.btnCheckOut}
                >
                  <Icon name="md-cart" color="white" style={styles.icon} />
                </TouchableOpacity>
              </View>
            ) : (
              <View />
            )}
            {/* {status && status === 'need authorization' ? <View /> : <View />}
            {status && status === 'pending' ? (
              <TouchableOpacity
                onPress={() => this.handleConfirmPayment()}
                style={styles.btnCheckOut}
              >
                <Icon name="md-checkmark-circle-outline" color="white" style={styles.icon} />
              </TouchableOpacity>
            ) : (
              <View />
            )} */}
          </View>
        </View>
      </CardItem>
    );
  }
}

OrderItem.propTypes = {
  payment: PropTypes.object, // eslint-disable-line react/require-default-props
  order: PropTypes.object.isRequired,
  confirmPayment: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired
};
