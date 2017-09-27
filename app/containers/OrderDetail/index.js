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
import { RefreshControl, Alert, View, WebView, TouchableOpacity, Modal } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import strings from '../../localization';
import { PRIMARYCOLOR, MERCHANT_CODE } from '../../constants';
import * as actions from './actions';
import * as selectors from './selectors';
import TicketType from '../../components/TicketType';
import TicketDetail from '../../components/TicketDetail';
import { formatDate, transactionStatus } from '../../helpers';

let total = 0;
class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.state = {
      status: '',
      color: '',
      modalVisible: false,
      scalesPageToFit: true
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

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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
      strings.order.confirmUpdate,
      'Order number '.concat(this.props.orderId),
      [
        { text: strings.global.cancel },
        { text: strings.global.ok, onPress: () => { this.props.submitUpdateOrder(this.props.order.data); } }
      ],
      { cancelable: false }
    );
  }

  handleConfirm = () => {
    Alert.alert(
      strings.order.confirmPayment,
      'Confirm payment Order : '.concat(this.props.orderId),
      [
        { text: strings.global.cancel },
        { text: strings.global.confirm, onPress: () => { this.props.confirmPayment(this.props.order.included.payment.id); } }
      ],
      { cancelable: false }
    );
  }

  checkPaymentType = () => {
    if (this.props.order.included.payment !== null && this.props.order.included.payment.payment_type === 'bca_klikbca' && this.props.order.included.payment.payment_type !== null && this.props.order.included.payment.va_number !== null) {
      return (
        <View>
          <TouchableOpacity onPress={() => this.setModalVisible(true)} >
            <Text style={{ alignSelf: 'center', margin: 4, fontWeight: 'bold', fontSize: 16 }}>
              {this.props.order.included.payment.va_number}
            </Text>
          </TouchableOpacity>
          <Text style={{ alignSelf: 'center', margin: 4, fontWeight: 'bold', fontSize: 16 }}>
            {strings.order.includeCode} {MERCHANT_CODE}
          </Text>
        </View>
      );
    } else if (this.props.order.included.payment !== null && this.props.order.included.payment.payment_type !== null && this.props.order.included.payment.va_number !== null) {
      return (
        <TouchableOpacity onPress={() => this.setModalVisible(true)} >
          <Text style={{ alignSelf: 'center', margin: 4, fontWeight: 'bold', fontSize: 16 }}>
            {this.props.order.included.payment.va_number}
          </Text>
        </TouchableOpacity>
      );
    }
    return (<View />)
  }

  capitalizeEachWord = (str) => {
    const lower = str.toLowerCase();
    return lower.replace(/(^| )(\w)/g, (words) => {
      return words.toUpperCase();
    });
  }

  render() {
    const { order, orderId } = this.props;
    const { included } = order || {};
    const { payment} = included || {};
    const { status } = this.state;
    const { isConfirming, isUpdating } = this.props;
    const WEBVIEW_REF = 'webview';
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
                  <Col><Text>{strings.order.orderNumber}</Text></Col>
                  <Col><Text>{orderId}</Text></Col>
                </Row>
                <Row>
                  <Col><Text>{strings.order.orderDate}</Text></Col>
                  <Col><Text>{formatDate(order.data[0].created_at)}</Text></Col>
                </Row>
                {order.included.payment ?
                  <Row>
                    <Col><Text>{strings.order.expiredDate}</Text></Col>
                    <Col><Text>{formatDate(order.included.payment.expired_at)}</Text></Col>
                  </Row> : <View />
                }
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
          {order.included.payment && order.included.payment.payment_type === 'cstore' && order.included.payment.fraud_status ?
            <Card>
              <CardItem>
                <Body>
                  <Text>{strings.order.paymentCode}</Text>
                </Body>
                <Right><Text>{order.included.payment.fraud_status}</Text></Right>
              </CardItem>
            </Card> : <View />
          }

          <Card>
            <CardItem>
              <Body>
                <Text>{strings.order.total}</Text>
              </Body>
              <Right><Text>Rp {Intl.NumberFormat('id').format(this.getTotal())}</Text></Right>
            </CardItem>
          </Card>

          {order.included.payment && order.included.payment.payment_type !== 'cstore' && this.state.status !== 'paid' ?
            <Card>
              <CardItem>
                <Body>
                  <Text>{strings.order.instruction1} Rp {Intl.NumberFormat('id').format(this.getTotal())} {strings.order.instruction2} { this.capitalizeEachWord(order.included.payment.payment_type.split('_').join(' ')) } {strings.order.instruction3} </Text>

                  {this.checkPaymentType()}

                  <Text>{strings.order.attention}</Text>
                </Body>
              </CardItem>
            </Card> : <View />
          }
          {order.included.referal && order.included.referal.owner ?
            <View>
              <Card>
                <CardItem>
                  <View>
                    <Text style={{ fontWeight: 'bold' }}>{strings.referalInfo}</Text>
                    <Text>{strings.order.referalCode}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{order.included.referal.referal_code}</Text>
                    <Text>{strings.order.owner}</Text>
                    <Text style={{ fontWeight: 'bold' }}>{order.included.referal.owner}</Text>
                    <Text>{strings.order.totalDiscount}</Text>
                    <Text style={{ fontWeight: 'bold' }}>Rp {Intl.NumberFormat('id').format(order.included.referal.discount_amount * this.getTotal())}</Text>
                  </View>
                </CardItem>
              </Card>
              <Card>
                <CardItem style={{ flex: 1 }}>
                  <Text style={{ flex: 1 }}>{strings.order.totalAfterDiscount}</Text>
                  <Text style={{ textAlign: 'right', flex: 1 }}>
                    Rp {Intl.NumberFormat('id').format(this.getTotal() - (order.included.referal.discount_amount * this.getTotal()))}
                  </Text>
                </CardItem>
              </Card>
            </View> : <View />
          }
          {(this.state.status && this.state.status === 'need authorization') ?
            <View /> : <View />
          }
          {(this.state.status && this.state.status === 'pending') ?
            <Button onPress={() => this.handleConfirm()} style={[ styles.btnCheckOut, { backgroundColor: 'green' } ]}>
              <Icon name="md-checkmark-circle-outline" color="white" style={styles.icon} />
              <Text style={styles.buttonText}>{strings.global.confirm}</Text>
            </Button> : <View />
          }
          <Modal
            animationType={'slide'}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
          >
            <View style={{ flex: 1 }}>
              <View style={{ width: '100%', height: 'auto', backgroundColor: 'whitesmoke' }}>
                <TouchableOpacity onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                >
                  <Icon name={'ios-arrow-dropleft'} size={24} color={'black'} style={{ padding: 10 }} />
                </TouchableOpacity>
              </View>
              <WebView
                automaticallyAdjustContentInsets={false}
                source={{ uri: payment ? payment.va_number : '' }}
                style={{ marginTop: 20 }}
                scalesPageToFit={this.state.scalesPageToFit}
                ref={WEBVIEW_REF}
                decelerationRate="normal"
                javaScriptEnabled
                domStorageEnabled
                startInLoadingState
              />
            </View>
          </Modal>
        </Content>
      </Container >
    );
  }
}

OrderDetail.propTypes = {
  getOrderDetail: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
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
