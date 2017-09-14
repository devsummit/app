import 'intl';
import 'intl/locale-data/jsonp/en';
import React, { Component } from 'react';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Body,
  Right,
  Button,
  Grid,
  Row,
  Col,
  List,
  ListItem,
  Spinner
} from 'native-base';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { RefreshControl, Alert, View } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { PRIMARYCOLOR } from '../../constants';
import * as actions from './actions';
import * as selectors from './selectors';
import TicketType from '../../components/TicketType';
import TicketDetail from '../../components/TicketDetail';
import { formatDate, transactionStatus } from '../../helpers';

let total = 0;
class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      color: ''
    };
  }

  componentWillMount = () => {
    this.props.getOrderDetail(this.props.orderId);
  }


  componentWillReceiveProps() {
    if (this.props.order && this.props.order.included) {
      const { payment } = this.props.order.included;

      const stat = transactionStatus(payment);
      this.setState({
        status: stat.message,
        color: stat.color
      });
    }
  }


  getTotal = () => {
    const order = this.props.order.data;
    const arraySub = order.map((item) => {
      return item.count * item.ticket.price;
    });
    total = arraySub.reduce((a, b) => { return a + b; }, 0);
    return total;
  }

  increase = (typeId) => {
    this.props.updateOrder('increase', typeId);
  };

  decrease = (typeId) => {
    this.props.updateOrder('decrease', typeId);
  };

  saveOrder = () => {
    Alert.alert(
      'Are you sure want to update this order?',
      'Order number '.concat(this.props.orderId),
      [
        { text: 'Cancel' },
        { text: 'OK', onPress: () => { this.props.submitUpdateOrder(this.props.order.data); } }
      ],
      { cancelable: false }
    );
  }

  handleConfirm = () => {
    Alert.alert(
      'Payment Confirmation',
      'Confirm payment Order : '.concat(this.props.orderId),
      [
        { text: 'Cancel' },
        { text: 'Confirm', onPress: () => { this.props.confirmPayment(this.props.order.included.payment.id); } }
      ],
      { cancelable: false }
    );
  }

  render() {
    const { order, orderId } = this.props;
    const { status } = this.state;
    const { isConfirming, isUpdating } = this.props;
    if (isUpdating || isConfirming ||
      (Object.keys(order).length === 0 && order.constructor === Object)) {
      return (
        <Container>
          <Content>
            <Spinner color={PRIMARYCOLOR} />
          </Content>
        </Container>
      );
    }
    return (
      <Container style={styles.container}>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.props.isUpdating}
              onRefresh={() => { this.props.getOrderDetail(orderId); }}
            />
          }
        >
          <Card>
            <CardItem>
              <Grid style={{ flex: 3 }}>
                <Row>
                  <Col><Text>Order number:</Text></Col>
                  <Col><Text>{orderId}</Text></Col>
                </Row>
                <Row>
                  <Col><Text>Order date:</Text></Col>
                  <Col><Text>{formatDate(order.data[0].created_at)}</Text></Col>
                </Row>
              </Grid>
              {status === 'not paid' ?
                <Button style={styles.roundButton} onPress={() => this.saveOrder()} >
                  <Icon name="ios-checkmark-circle" color={PRIMARYCOLOR} />
                  <Text style={styles.textButton}>save</Text>
                </Button> :
                <Text style={[ styles.statusText,
                  { backgroundColor: this.state.color || PRIMARYCOLOR } ]}
                >
                  {this.state.status.toUpperCase()}</Text>
              }
            </CardItem>
          </Card>
          {
            <Content>
              <List
                dataArray={order.data}
                renderRow={item =>
                  (<ListItem>
                    {this.state.status === 'not paid' ?
                      <TicketType
                        key={item.id}
                        count={item.count}
                        ticket={item.ticket}
                        onAdd={() => this.increase(item.id)}
                        onReduce={() => this.decrease(item.id)}
                      /> :
                      <TicketDetail
                        key={item.id}
                        count={item.count}
                        ticket={item.ticket}
                      />}

                  </ListItem>)
                }
              />
            </Content>
          }
          { order.included.payment && order.included.payment.payment_type === 'cstore' && order.included.payment.fraud_status ?
            <Card>
              <CardItem>
                <Body>
                  <Text>Payment Code</Text>
                </Body>
                <Right><Text>{order.included.payment.fraud_status}</Text></Right>
              </CardItem>
            </Card> : <View />
          }
          <Card>
            <CardItem>
              <Body>
                <Text>Total</Text>
              </Body>
              <Right><Text>Rp {Intl.NumberFormat('id').format(this.getTotal())}</Text></Right>
            </CardItem>
          </Card>
          {order.included.referal && order.included.referal.owner ?
            <View>
              <Card>
                <CardItem>
                  <View>
                    <Text style={{ fontWeight: 'bold' }}>REFERAL INFO</Text>
                    <Text>Referal Code :</Text>
                    <Text style={{ fontWeight: 'bold' }}>{order.included.referal.referal_code}</Text>
                    <Text>Owner :</Text>
                    <Text style={{ fontWeight: 'bold' }}>{order.included.referal.owner}</Text>
                    <Text>Total Discount :</Text>
                    <Text style={{ fontWeight: 'bold' }}>Rp {Intl.NumberFormat('id').format(order.included.referal.discount_amount * this.getTotal())}</Text>
                  </View>
                </CardItem>
              </Card>
              <Card>
                <CardItem style={{ flex: 1 }}>
                  <Text style={{ flex: 1 }}>Total price after discount: </Text>
                  <Text style={{ textAlign: 'right', flex: 1 }}>
                    Rp {Intl.NumberFormat('id').format(this.getTotal() - (order.included.referal.discount_amount * this.getTotal()))}
                  </Text>
                </CardItem>
              </Card>
            </View> : <View />
          }
          {(this.state.status && this.state.status === 'need authorization') ?
            <Button onPress={() => Actions.payment()} style={[ styles.btnCheckOut, { backgroundColor: 'blue' } ]}>
              <Icon name="ios-key" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>AUTHORIZE</Text>
            </Button> : <View />
          }
          {(this.state.status && this.state.status === 'pending') ?
            <Button onPress={() => this.handleConfirm()} style={[ styles.btnCheckOut, { backgroundColor: 'green' } ]}>
              <Icon name="md-checkmark-circle-outline" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>CONFIRM</Text>
            </Button> : <View />
          }
        </Content>
      </Container >
    );
  }
}

OrderDetail.propTypes = {
  getOrderDetail: PropTypes.func.isRequired,
  orderId: PropTypes.number.isRequired,
  order: PropTypes.object.isRequired,
  updateOrder: PropTypes.func.isRequired,
  submitUpdateOrder: PropTypes.func.isRequired,
  confirmPayment: PropTypes.func.isRequired,
  isConfirming: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  ticketTypes: selectors.getTicketTypes(),
  order: selectors.getOrder(),
  isUpdating: selectors.getIsUpdatingOrder(),
  updateStatus: selectors.getUpdateOrderStatus(),
  isConfirming: selectors.getIsConfirmingPayment()
});

export default connect(mapStateToProps, actions)(OrderDetail);
