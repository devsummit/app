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
  Left,
  Right,
  Button,
  Grid,
  Row,
  Col,
  List,
  Spinner
} from 'native-base';
import Moment from 'moment';
import PropTypes from 'prop-types';
import {
  RefreshControl,
  ActivityIndicator,
  Alert,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Actions } from 'react-native-router-flux';
import HeaderPoint from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';
import strings from '../../localization';
import { PRIMARYCOLOR, MERCHANT_CODE } from '../../constants';
import * as actions from './actions';
import * as selectors from './selectors';
import TicketType from '../../components/TicketType';
import TicketDetail from '../../components/TicketDetail';
import { localeDateWithoutHour, transactionStatus, getProfileData } from '../../helpers';

const Back = require('../../../assets/images/back.png');
const logo = require('../../../assets/images/bankmandiri.png');

const { width, height } = Dimensions.get('window');
const noImage = require('./../../../assets/images/noimage.png');

const url = 'https://api.devsummit.io/static/Ref_Bank.PDF';

let total = 0;
class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.state = {
      status: '',
      orderStatus: '',
      color: '',
      modalVisible: false,
      scalesPageToFit: true,
      userId: ''
    };
  }

  componentWillMount() {
    getProfileData().then((profileData) => {
      this.setState({ userId: profileData.id });
    });
    this.getOrderDetail();
  }

  componentWillReceiveProps() {
    if (this.props.order && this.props.order.included) {
      const { order } = this.props;
      const { payment } = order.included;

      const createdAt = Moment(order.data[0].created_at).local();
      const expiryAt = Moment(order.data[0].created_at)
        .add(1, 'hours')
        .local();

      const status = expiryAt.diff(createdAt, 'hours') >= 1 ? 'expired' : 'not expired';

      const stat = transactionStatus(payment);
      this.setState({
        status: stat.message,
        color: stat.color,
        orderStatus: status
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
    total = arraySub.reduce((a, b) => {
      return a + b;
    }, 0);
    return total;
  };

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
        {
          text: strings.global.ok,
          onPress: () => {
            this.props.submitUpdateOrder(this.props.order.data);
          }
        }
      ],
      { cancelable: false }
    );
  };

  handleConfirm = () => {
    Alert.alert(
      strings.order.confirmPayment,
      'Confirm payment Order : '.concat(this.props.orderId),
      [
        { text: strings.global.cancel },
        {
          text: strings.global.confirm,
          onPress: () => {
            this.props.confirmPayment(this.props.order.included.payment.id);
          }
        }
      ],
      { cancelable: false }
    );
  };

  checkPaymentType = () => {
    if (
      this.props.order.included.payment !== null &&
      this.props.order.included.payment.payment_type === 'bca_klikbca' &&
      this.props.order.included.payment.payment_type !== null &&
      this.props.order.included.payment.va_number !== null
    ) {
      return (
        <View>
          <TouchableOpacity onPress={() => this.setModalVisible(true)}>
            <Text style={{ alignSelf: 'center', margin: 4, fontWeight: 'bold', fontSize: 16 }}>
              {this.props.order.included.payment.va_number}
            </Text>
          </TouchableOpacity>
          <Text style={{ alignSelf: 'center', margin: 4, fontWeight: 'bold', fontSize: 16 }}>
            {strings.order.includeCode} {MERCHANT_CODE}
          </Text>
        </View>
      );
    } else if (
      this.props.order.included.payment !== null &&
      this.props.order.included.payment.payment_type !== null &&
      this.props.order.included.payment.va_number !== null
    ) {
      return (
        <TouchableOpacity onPress={() => this.setModalVisible(true)}>
          <Text style={{ alignSelf: 'center', margin: 4, fontWeight: 'bold', fontSize: 16 }}>
            {this.props.order.included.payment.va_number}
          </Text>
        </TouchableOpacity>
      );
    }
    return <View />;
  };

  capitalizeEachWord = (str) => {
    const lower = str.toLowerCase();
    return lower.replace(/(^| )(\w)/g, (words) => {
      return words.toUpperCase();
    });
  };

  uploadImage = () => {
    ImagePicker.openPicker({
      height: 1000,
      width: 700,
      cropping: true,
      includeBase64: true
    })
      .then((image) => {
        this.props.orderVerification(this.props.id, image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getOrderDetail() {
    this.props.getOrderDetail(this.props.id || this.props.navigation.state.params.id);
  }

  getAccountReferal = () => {
    Linking.openURL(url);
  };

  render() {
    const { order, orderId } = this.props;
    const { included } = order || {};
    const { payment, verification } = included || {};
    const { status } = this.state;
    const { isConfirming, isUpdating, uploadProgress } = this.props;
    if (Object.keys(order).length === 0) {
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
              onRefresh={() => {
                this.getOrderDetail();
              }}
            />
          }
        >
          <Card>
            <CardItem>
              <Grid>
                {status === 'not paid' ? (
                  <Button style={styles.roundButton} onPress={() => this.saveOrder()}>
                    <Icon name="ios-checkmark-circle" color={PRIMARYCOLOR} />
                    <Text style={styles.textButton}>save</Text>
                  </Button>
                ) : this.state.status === 'captured' ? (
                  <Text style={[ styles.statusText, { backgroundColor: '#0D47A1' } ]}>VERIFIED</Text>
                ) : (
                  <Text
                    style={[
                      styles.statusText,
                      { backgroundColor: this.state.color || PRIMARYCOLOR }
                    ]}
                  >
                    {this.state.status.toUpperCase()}
                  </Text>
                )}
                <Row>
                  <Col style={{ flex: 2 }}>
                    <Text style={{ fontWeight: 'bold' }}>{strings.order.orderNumber}</Text>
                  </Col>
                  <Col style={{ flex: 3 }}>
                    <Text>{this.props.id || this.props.order.data[0].order_id}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ flex: 2 }}>
                    <Text style={{ fontWeight: 'bold' }}>{strings.order.orderDate}</Text>
                  </Col>
                  <Col style={{ flex: 3 }}>
                    <Text>{localeDateWithoutHour(order.data[0].created_at)}</Text>
                  </Col>
                </Row>
              </Grid>
            </CardItem>
          </Card>
          {
            <Content>
              <List
                dataArray={order.data}
                renderRow={item => (
                  <View>
                    {this.state.status === 'not paid' ? (
                      <View>
                        <TicketType
                          key={item.id}
                          count={item.count}
                          ticket={item.ticket}
                          onAdd={() => this.increase(item.id)}
                          onReduce={() => this.decrease(item.id)}
                        />
                      </View>
                    ) : (
                      <TicketDetail key={item.id} count={item.count} ticket={item.ticket} />
                    )}
                  </View>
                )}
              />
            </Content>
          }
          <Card>
            <CardItem>
              <Content>
                <Grid>
                  <Col style={{ flex: 2 }}>
                    <Text style={{ fontWeight: 'bold' }}>{strings.order.total.toUpperCase()}</Text>
                  </Col>
                  <Col style={{ flex: 3 }}>
                    <Text style={{ color: PRIMARYCOLOR }}>
                      Rp {order.included.payment.gross_amount}
                    </Text>
                  </Col>
                </Grid>
              </Content>
            </CardItem>
          </Card>
          {this.state.status === 'captured' ? (
            <View />
          ) : (
            <View>
              {payment.payment_type === 'offline' && (
                <Card>
                  <CardItem>
                    <View style={styles.card} resizeMode={'cover'}>
                      <Text style={styles.textTitle}>PT. Bank Mandiri</Text>
                      <Text style={styles.textTitle}>Cabang Bandung Siliwangi</Text>
                      <Text style={{ fontSize: 18, color: '#000000', marginTop: 16 }}>
                        Atas Nama :
                      </Text>
                      <Text style={styles.textTitleBold}>Taufan Aditya</Text>
                      <Text style={styles.textTitle}>OR</Text>
                      <Text style={styles.textTitleBold}>Krisna Galuh Herlangga</Text>
                      <View
                        style={{
                          flex: 8,
                          alignItems: 'center'
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#000000',
                            marginBottom: 8,
                            marginTop: 16
                          }}
                        >
                          Nomer Rekening:
                        </Text>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#000000',
                            marginBottom: 8,
                            fontWeight: 'bold'
                          }}
                        >
                          130-0016066782
                        </Text>
                      </View>
                    </View>
                  </CardItem>
                </Card>
              )}
              {payment.payment_type === 'offline' ? (
                this.props.paymentProof !== '' ? (
                  <View
                    style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around' }}
                  >
                    <Button style={styles.buttonSubmit} onPress={() => this.getAccountReferal()}>
                      <Text style={{ flex: 1, textAlign: 'center' }}>
                        {strings.order.downloadAcc}
                      </Text>
                    </Button>
                    <Image
                      style={{
                        flex: 1,
                        height: 200,
                        marginTop: 0,
                        margin: 10
                      }}
                      resizeMode={'cover'}
                      source={{ uri: this.props.paymentProof }}
                    />
                    {(isUpdating || isConfirming) && (
                      <View
                        style={{
                          width: `${uploadProgress}%`,
                          backgroundColor: '#157EFC',
                          height: 10
                        }}
                      />
                    )}
                    <Button
                      disabled={isUpdating || isConfirming}
                      style={styles.buttonSubmit}
                      onPress={() => this.uploadImage()}
                    >
                      {(isUpdating || isConfirming) && <ActivityIndicator color="black" />}
                      <Text style={{ flex: 1, textAlign: 'center' }}>
                        {isUpdating || isConfirming
                          ? strings.order.uploading
                          : strings.order.reuploadProof}
                      </Text>
                    </Button>
                  </View>
                ) : (
                  <View>
                    <Button style={styles.buttonSubmit} onPress={() => this.getAccountReferal()}>
                      <Text style={{ flex: 1, textAlign: 'center' }}>
                        {strings.order.downloadAcc}
                      </Text>
                    </Button>
                    <Image
                      style={{
                        flex: 1,
                        marginTop: -10,
                        alignSelf: 'center'
                      }}
                      resizeMode={'cover'}
                      source={noImage}
                    />
                    <Text style={styles.noImageText}>{strings.order.noProof}</Text>
                    {(isUpdating || isConfirming) && (
                      <View
                        style={{
                          width: `${uploadProgress}%`,
                          backgroundColor: '#157EFC',
                          height: 10
                        }}
                      />
                    )}
                    <Button
                      disabled={isConfirming || isUpdating}
                      style={styles.buttonSubmit}
                      onPress={() => this.uploadImage()}
                    >
                      {(isUpdating || isConfirming) && <ActivityIndicator color="black" />}
                      <Text style={{ flex: 1, textAlign: 'center' }}>
                        {isUpdating || isConfirming
                          ? `${strings.order.uploading} (${uploadProgress}%)`
                          : strings.order.reuploadProof}
                      </Text>
                    </Button>
                  </View>
                )
              ) : (
                <View />
              )}
            </View>
          )}
        </Content>
      </Container>
    );
  }
}

OrderDetail.propTypes = {
  getOrderDetail: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  uploadProgress: PropTypes.number,
  updateOrder: PropTypes.func.isRequired,
  submitUpdateOrder: PropTypes.func.isRequired,
  confirmPayment: PropTypes.func.isRequired,
  isConfirming: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
  orderId: selectors.getOrderId(),
  ticketTypes: selectors.getTicketTypes(),
  order: selectors.getOrder(),
  uploadProgress: selectors.getUploadProgress(),
  isUpdating: selectors.getIsUpdatingOrder(),
  updateStatus: selectors.getUpdateOrderStatus(),
  isConfirming: selectors.getIsConfirmingPayment(),
  paymentProof: selectors.getPaymentProof()
});

OrderDetail.defaultProps = {
  uploadProgress: 0
};

export default connect(mapStateToProps, actions)(OrderDetail);
