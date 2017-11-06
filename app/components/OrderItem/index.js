
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
import { formatDate, transactionStatus, localeDate } from '../../helpers';
// import { PRIMARYCOLOR } from '../../constants';
let amount = 0;
export default class OrderItem extends Component {
  state = {
    status: ''
  };

  componentWillMount() {
    let stat = '';
    const { payment } = this.props.order;
    stat = transactionStatus(payment);
    this.setState({
      status: stat.message
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

  ticketStatus = () => {
    const status = this.props.order.status;
    if (status === 'pending') {
      return (
        <Text note style={[ styles.statusText, { backgroundColor: '#F44336', color: 'white' } ]}>
          PENDING
        </Text>
      );
    } else if (status === 'paid') {
      return (
        <Text note style={[ styles.statusText, { backgroundColor: '#0D47A1', color: 'white' } ]}>
          VERIFIED
        </Text>
      );
    }
    return (
      <Text note style={[ styles.statusText, { backgroundColor: 'blue', color: 'white' } ]}>
        {this.state.status.toUpperCase()}
      </Text>
    );
  }

  ticketTypes = () => {
    const type = this.props.order.type;
    if (type === 'user') {
      return (
        <Text note style={[ styles.statusText, { backgroundColor: '#EF5350', color: 'white' } ]}>
          EVENT
        </Text>
      );
    } else if (type === 'hackaton') {
      return (
        <Text note style={[ styles.statusText, { backgroundColor: '#1DE9B6', color: 'white' } ]}>
          HACKATON
        </Text>
      );
    }

    return (
      <Text note style={[ styles.statusText, { backgroundColor: '#42A5F5', color: 'white' } ]}>
        EXHIBITORS
      </Text>
    );
  }

  formatDate = (source) => {
    const dt = source.split(' ');
    return `${dt[1]}-${dt[2]}-${dt[3]}`;
  };

  render() {
    const { order } = this.props;
    const { color, status } = this.state;
    // console.log('landing here orderItem this.state', this.state);
    // console.log('landing here this.props orderItem', this.props.order);
    // console.log('landing here localeDateAddOneHour', localeDateAddOneHour(order.created_at));
    // console.log('landing here moment()', Moment());
    return (
      <CardItem style={styles.container} button onPress={() => this.props.onPress()}>
        <View style={styles.item}>
          <View style={{ justifyContent: 'flex-start', flex: 4 }}>
            <Text>Order-{order.id}</Text>
            <Text note style={styles.orderId}>
              {localeDate(order.created_at)}
            </Text>
            <View style={{ flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center' }}
            >
              <View style={styles.viewText}>
                {status ? (
                  <View style={{ flexDirection: 'row', marginTop: 8 }}>
                    {this.ticketStatus()}
                    {this.ticketTypes()}
                  </View>
                ) : (
                  <View />
                )}
              </View>
              <Text />
            </View>
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
