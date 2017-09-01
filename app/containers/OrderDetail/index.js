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


  componentWillReceiveProps(nextProps) {
    if (this.props.order && this.props.order.length > 0) {
      const { payment } = this.props.order[0];

      const stat = transactionStatus(payment);
      this.setState({
        status: stat.message,
        color: stat.color
      });
    }
  }


  getTotal = () => {
    const order = this.props.order;
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
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => { this.props.submitUpdateOrder(this.props.order); } }
      ],
      { cancelable: false }
    );
  }

  handleConfirm = () => {
    Alert.alert(
      'Payment Confirmation',
      'Confirm payment Order : '.concat(this.props.orderId),
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Confirm', onPress: () => { this.props.confirmPayment(this.props.order[0].payment.id); } }
      ],
      { cancelable: false }
    );
  }

  render() {
    const { status } = this.state;
    const {isConfirming, isUpdating} = this.props;
    if (isUpdating || isConfirming || this.props.order.length === 0) {
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
              onRefresh={() => { this.props.getOrderDetail(this.props.orderId); }}
            />
          }
        >
          <Card>
            <CardItem>
              <Grid style={{ flex: 3 }}>
                <Row>
                  <Col><Text>Order number:</Text></Col>
                  <Col><Text>{this.props.orderId}</Text></Col>
                </Row>
                <Row>
                  <Col><Text>Order date:</Text></Col>
                  <Col><Text>{formatDate(this.props.order[0].created_at)}</Text></Col>
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
                dataArray={this.props.order}
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
          <Card>
            <CardItem>
              <Body>
                <Text>Total</Text>
              </Body>
              <Right><Text>Rp {Intl.NumberFormat('id').format(this.getTotal())}</Text></Right>
            </CardItem>
          </Card>
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

const mapStateToProps = createStructuredSelector({
  ticketTypes: selectors.getTicketTypes(),
  order: selectors.getOrder(),
  isUpdating: selectors.getIsUpdatingOrder(),
  updateStatus: selectors.getUpdateOrderStatus(),
  isConfirming: selectors.getIsConfirmingPayment()
});

export default connect(mapStateToProps, actions)(OrderDetail);
