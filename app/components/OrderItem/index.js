import 'intl';
import 'intl/locale-data/jsonp/id';
import React, { Component } from 'react';
import { Text, Grid, Col, Button, Card, CardItem } from 'native-base';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import CountDownTimer from 'react_native_countdowntimer';
import Moment from 'moment';
import styles from './styles';
import ListItem from '../ListItem';
import { formatDate, transactionStatus, localeDate, localeDateAddOneHour, checkLocaleDateAddOneHour} from '../../helpers';
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
      status: this.props.order.status,
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
            { (this.props.order.status === 'pending' && !checkLocaleDateAddOneHour(order.created_at)) ? (
              <View style={{ marginVertical: 5 }}>
                <CountDownTimer
                  // date={new Date(parseInt(endTime))}
                  date={localeDateAddOneHour(order.created_at)}
                  days={{ plural: 'Days ', singular: 'day ' }}
                  hours=":"
                  mins=":"
                  segs=""

                  daysStyle={styles.time}
                  hoursStyle={styles.time}
                  minsStyle={styles.time}
                  secsStyle={styles.time}
                  firstColonStyle={styles.colon}
                  secondColonStyle={styles.colon}
                />
              </View>
            ) : (<View />)
            }

            <View style={{ flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center' }}
            >
              <View style={styles.viewText}>

                {
                  (checkLocaleDateAddOneHour(order.created_at)) && (this.props.order.status === 'pending')
                    ?
                    (
                      <Text note style={[ styles.statusText, { backgroundColor: 'green', color: 'white' } ]}>
                      VERIFIED
                      </Text>
                    )
                    :
                    (
                      <Text note style={[ styles.statusText, { backgroundColor: color, color: 'white' } ]}>
                        {this.props.order.status.toUpperCase()}
                      </Text>
                    )
                }

                {/* {status ? (
                  <Text note style={[ styles.statusText, { backgroundColor: color, color: 'white' } ]}>
                    {this.state.status.toUpperCase()}
                  </Text>
                ) : (
                  <View />
                )} */}
              </View>
              <Text />
              <View style={styles.viewText}>
                {status ? (
                  <Text note style={[ styles.statusText, { backgroundColor: 'green', color: 'white' } ]}>
                    {order.type.toUpperCase()}
                  </Text>
                ) : (
                  <View />
                )}
              </View>
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
